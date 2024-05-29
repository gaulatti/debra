import { Stack } from 'aws-cdk-lib';
import {
  CfnUserPoolIdentityProvider,
  CfnUserPoolResourceServer,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  UserPoolDomain,
} from 'aws-cdk-lib/aws-cognito';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates a Cognito Pool with user pool, user pool domain, Okta identity provider,
 * user pool client, and user pool resource server.
 *
 * @param stack - The AWS CloudFormation stack.
 * @param oktaMetadataSecret - The Okta metadata secret.
 */
const createCognitoAuth = (stack: Stack, oktaMetadataSecret: Secret) => {
  /**
   * Create User Pool
   */
  const userPool = new UserPool(stack, `${stack.stackName}UserPool`, {
    userPoolName: `${stack.stackName}UserPool`,
    selfSignUpEnabled: true,
    signInAliases: { email: false, username: false },
  });

  /**
   * Create User Pool Domain
   */
  const userPoolDomain = new UserPoolDomain(stack, `${stack.stackName}Domain`, {
    userPool,
    cognitoDomain: {
      domainPrefix: `${stack.stackName.toLowerCase()}`,
    },
  });

  /**
   * Create Okta Identity Provider
   * following: https://repost.aws/knowledge-center/cognito-okta-saml-identity-provider
   */
  const samlProvider = new CfnUserPoolIdentityProvider(stack, `${stack.stackName}OktaProvider`, {
    providerName: 'Okta',
    providerType: 'SAML',
    userPoolId: userPool.userPoolId,
    providerDetails: {
      MetadataURL: oktaMetadataSecret.secretValue.unsafeUnwrap(),
      IDPSignout: 'true',
    },
    attributeMapping: {
      email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    },
  });

  /**
   * Create User Pool Client
   */
  const userPoolClient = new UserPoolClient(stack, `${stack.stackName}UserPoolClient`, {
    userPoolClientName: `${stack.stackName}UserPoolClient`,
    userPool,
    supportedIdentityProviders: [UserPoolClientIdentityProvider.custom('Okta')],
    generateSecret: false,
    oAuth: {
      callbackUrls: [
        'http://localhost:5173',
        'https://nena.gaulatti.com',
      ],
      logoutUrls: ['http://localhost:5173/logout', 'https://nena.gaulatti.com/logout'],
    },
  });

  /**
   * Add dependency to Google Provider
   */
  userPoolClient.node.addDependency(samlProvider);

  /**
   * Create User Pool Resource Server
   */
  new CfnUserPoolResourceServer(stack, `${stack.stackName}SamlAttributeMapping`, {
    name: 'Okta',
    identifier: 'saml',
    userPoolId: userPool.userPoolId,
    scopes: [
      {
        scopeName: 'email',
        scopeDescription: 'email',
      },
    ],
  });
};

export { createCognitoAuth };

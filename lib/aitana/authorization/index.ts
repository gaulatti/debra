import { Stack } from 'aws-cdk-lib';
import { UserPool, UserPoolClient, UserPoolClientIdentityProvider, UserPoolIdentityProviderGoogle } from 'aws-cdk-lib/aws-cognito';

const createCognitoPool = (stack: Stack) => {
  const userPool = new UserPool(stack, `${stack.stackName}UserPool`, {
    userPoolName: `${stack.stackName}UserPool`,
    selfSignUpEnabled: true,
    signInAliases: { email: false, username: false },
  });

  /**
   * Create Google Identity Provider
   */
  const googleProvider = new UserPoolIdentityProviderGoogle(stack, `${stack.stackName}GoogleProvider`, {
    clientId: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    userPool,
    scopes: ['profile', 'email', 'openid'],
    attributeMapping: {
      email: { attributeName: 'email' },
      givenName: { attributeName: 'given_name' },
      familyName: { attributeName: 'family_name' },
    },
  });

  /**
   * Create User Pool Client
   */
  const userPoolClient = new UserPoolClient(stack, `${stack.stackName}UserPoolClient`, {
    userPool,
    supportedIdentityProviders: [UserPoolClientIdentityProvider.GOOGLE],
    generateSecret: false,
  });

  /**
   * Add dependency to Google Provider
   */
  userPoolClient.node.addDependency(googleProvider);
};

export { createCognitoPool };

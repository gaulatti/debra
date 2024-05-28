import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createCognitoAuth } from './authorization';
import { createSecrets } from './secrets';

class AitanaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * Create Secrets
     */
    const { oktaMetadataSecret } = createSecrets(this);

    /**
     * Create Cognito Auth
     */
    createCognitoAuth(this, oktaMetadataSecret);
  }
}

export { AitanaStack };
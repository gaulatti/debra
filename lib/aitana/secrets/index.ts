import { Stack } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates secrets for the specified stack.
 * @param stack - The stack for which to create secrets.
 * @returns An object containing the created secrets.
 */
const createSecrets = (stack: Stack) => {
  /**
   * Create Okta Metadata Secret
   */
  const oktaMetadataSecret = new Secret(stack, `${stack.stackName}OktaMetadataSecret`, { secretName: `${stack.stackName}OktaMetadataSecret` });

  return { oktaMetadataSecret };
};

export { createSecrets };

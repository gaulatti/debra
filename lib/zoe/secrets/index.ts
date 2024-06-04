import { Stack } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates secrets for the specified stack.
 * @param stack - The stack for which to create secrets.
 * @returns An object containing the created secrets.
 */
const createSecrets = (stack: Stack) => {
  const urlSecret = new Secret(stack, `${stack.stackName}UrlSecret`, { secretName: `${stack.stackName}UrlSecret` });
  const apiKeySecret = new Secret(stack, `${stack.stackName}ApiKeySecret`, { secretName: `${stack.stackName}ApiKeySecret` });
  const targetSecret = new Secret(stack, `${stack.stackName}TargetSecret`, { secretName: `${stack.stackName}TargetSecret` });

  return { urlSecret, apiKeySecret, targetSecret };
};

export { createSecrets };

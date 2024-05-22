import { Stack } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates secrets for the specified stack.
 * @param stack - The stack to create secrets for.
 * @returns An object containing the created secrets.
 */
const createSecrets = (stack: Stack) => {
  const sourceToken = new Secret(stack, `${stack.stackName}SourceToken`, { secretName: `${stack.stackName}SourceToken` });

  return { sourceToken };
};

export { createSecrets };

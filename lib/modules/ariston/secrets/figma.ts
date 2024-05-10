import { Stack } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates Figma secrets.
 * @param stack - The stack object.
 * @returns An object containing the Figma token and Figma file secrets.
 */
const createFigmaSecrets = (stack: Stack) => {
  const figmaToken = new Secret(stack, `${stack.stackName}-figma-token`);
  const figmaFile = new Secret(stack, `${stack.stackName}-figma-fileId`);
  return { figmaToken, figmaFile };
};

export { createFigmaSecrets };

import { Stack } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates Figma secrets.
 * @param stack - The stack object.
 * @returns An object containing the Figma token and Figma file secrets.
 */
const createSecrets = (stack: Stack) => {
  const figmaToken = new Secret(stack, `${stack.stackName}FigmaToken`, { secretName: `${stack.stackName}FigmaToken`});

  return { figmaToken };
};

export { createSecrets };

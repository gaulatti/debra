import { Stack } from 'aws-cdk-lib';
import { buildAristonTriggerLambda } from './functions/trigger';
import { buildAristonApi } from './network/api';
import { createFigmaSecrets } from './secrets/figma';

/**
 * Builds the Ariston resources.
 *
 * @param stack - The AWS CloudFormation stack.
 * @returns An object containing the triggerLambda function.
 */
const buildAristonResources = (stack: Stack) => {
  const { figmaToken, figmaFile } = createFigmaSecrets(stack);
  const { triggerLambda, lambdaIntegration } = buildAristonTriggerLambda(stack, figmaToken, figmaFile);

  /**
   * Grant the Lambda function read access to the Figma secrets.
   */
  figmaToken.grantRead(triggerLambda);
  figmaFile.grantRead(triggerLambda);

  /**
   * Build the API Gateway.
   */
  const { endpoint } = buildAristonApi(stack);

  /**
   * Integrate the Lambda with the API Gateway
   */
  const triggerResource = endpoint.root.addResource('trigger');
  triggerResource.addMethod('POST', lambdaIntegration);

  return { triggerLambda };
};

export { buildAristonResources };

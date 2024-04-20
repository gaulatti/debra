import { Stack } from 'aws-cdk-lib';
import { buildAristonTriggerLambda } from './functions/trigger';
import { buildAristonApi } from './network/api';

/**
 * Builds the Ariston resources.
 *
 * @param stack - The AWS CloudFormation stack.
 * @returns An object containing the triggerLambda function.
 */
const buildAristonResources = (stack: Stack) => {
  const { triggerLambda, lambdaIntegration } = buildAristonTriggerLambda(stack);
  const { endpoint } = buildAristonApi(stack);

  /**
   * Integrate the Lambda with the API Gateway
   */
  const triggerResource = endpoint.root.addResource('trigger');
  triggerResource.addMethod('POST', lambdaIntegration);
  
  return { triggerLambda };
};

export { buildAristonResources };

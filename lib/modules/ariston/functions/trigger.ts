import { Duration, Stack } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { STACK_NAME } from '../../../consts';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

const buildAristonTriggerLambda = (stack: Stack) => {
  const triggerLambdaSpec = {
    functionName: `${STACK_NAME}AristonTrigger`,
    entry: './src/functions/workflows/ariston/trigger.ts',
    handler: 'main',
    runtime: Runtime.NODEJS_LATEST,
    timeout: Duration.minutes(1),
    environment: {
      API_KEY: process.env.API_KEY || ''
    }
  };
  const triggerLambda = new NodejsFunction(stack, `${triggerLambdaSpec.functionName}Lambda`, triggerLambdaSpec);

  /**
   * Make the function able to be executed.
   */
  const lambdaIntegration = new LambdaIntegration(triggerLambda, {
    requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    allowTestInvoke: false,
  });

  return { triggerLambda, lambdaIntegration };
};

export { buildAristonTriggerLambda };

import { Duration, Stack } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

const buildAristonTriggerLambda = (stack: Stack, figmaToken: Secret, figmaFile: Secret) => {
  const triggerLambdaSpec = {
    functionName: `${stack.stackName}AristonTrigger`,
    entry: './src/functions/workflows/ariston/trigger.ts',
    handler: 'main',
    runtime: Runtime.NODEJS_20_X,
    timeout: Duration.minutes(1),
    environment: {
      FIGMA_TOKEN: figmaToken.secretArn,
      FIGMA_FILE: figmaFile.secretArn,
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

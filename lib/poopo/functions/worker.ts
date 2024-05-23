import { Duration, Stack } from 'aws-cdk-lib';
import { LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

const createWorkerLambda = (stack: Stack) => {
  const chromeLambdaLayer = LayerVersion.fromLayerVersionArn(stack, 'ChromeLambdaLayer', 'arn:aws:lambda:us-east-1:764866452798:layer:chrome-aws-lambda:45');

  const workerLambdaSpec = {
    functionName: `${stack.stackName}Worker`,
    entry: './lib/poopo/functions/worker.src.ts',
    handler: 'main',
    runtime: Runtime.NODEJS_20_X,
    timeout: Duration.minutes(5),
    layers: [chromeLambdaLayer],
  };

  const workerLambda = new NodejsFunction(stack, `${workerLambdaSpec.functionName}Lambda`, workerLambdaSpec);

  return { workerLambda };
};

export { createWorkerLambda };

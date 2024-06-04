import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createWorkerLambda } from './functions/worker';

class PoopoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const { workerLambda } = createWorkerLambda(this);
  }
}

export { PoopoStack };

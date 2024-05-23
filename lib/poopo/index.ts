import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createTriggerLambda } from './functions/trigger';
import { createWorkerLambda } from './functions/worker';

class PoopoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const triggerLambda = createTriggerLambda(this);

    const workerLambda = createWorkerLambda(this);

    /**
     * TODO: Attach Chrome as Lambda Layer
     * TODO: Install Lighthouse Module
     * TODO: Create Worker Lambda
     */
  }
}

export { PoopoStack };

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createFargateTask } from './fargate';
import { createSecrets } from './secrets';

class ZoeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * Create Secrets
     */
    const { urlSecret, apiKeySecret, targetSecret } = createSecrets(this);

    /**
     * Create Fargate Task
     */
    const { fargateTaskDefinition } = createFargateTask(this, { urlSecret, apiKeySecret, targetSecret });
  }
}

export { ZoeStack };

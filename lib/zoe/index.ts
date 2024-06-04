import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createFargateTask } from './fargate';
import { createSecrets } from './secrets';
import { createVpc } from './network';
import { createCluster } from './compute';

class ZoeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * Create Secrets
     */
    const { urlSecret, apiKeySecret, targetSecret } = createSecrets(this);

    /**
     * Create VPC
     */
    const { vpc } = createVpc(this);

    /**
     * Create Cluster
     */
    const { cluster } = createCluster(this, vpc);

    /**
     * Create Fargate Service
     */
    const { fargateTaskDefinition } = createFargateTask(this, { urlSecret, apiKeySecret, targetSecret });
  }
}

export { ZoeStack };

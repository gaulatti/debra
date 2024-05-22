import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createBucket } from './storage';
import { createDistribution } from './network';
import { createBuildProject } from './build';
import { createSecrets } from './secrets';

class NenaStack extends Stack {
  constructor(scope: Construct, uuid: string, props?: StackProps) {
    super(scope, uuid, props);

    const { sourceToken } = createSecrets(this);

    /**
     * Represents the S3 bucket to store the React Assets
     */
    const bucket = createBucket(this);

    /**
     * Represents the CloudFront distribution to serve the React Assets
     */
    const distribution = createDistribution(this, bucket);

    /**
     * Represents the CodeBuild project to build the React Assets
     */
    const build = createBuildProject(this, bucket, distribution, sourceToken);
  }
}

export { NenaStack };

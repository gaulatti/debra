import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createBucket } from './storage';
import { createDistribution } from './network';

class NenaStack extends Stack {
  constructor(scope: Construct, uuid: string, props?: StackProps) {
    super(scope, uuid, props);

    /**
     * Represents the S3 bucket to store the React Assets
     */
    const bucket = createBucket(this);

    /**
     * Represents the CloudFront distribution to serve the React Assets
     */
    const distribution = createDistribution(this, bucket);
  }
}

export { NenaStack };

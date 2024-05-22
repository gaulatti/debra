import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';

/**
 * Creates a new S3 bucket with the specified configuration.
 * @param stack - The AWS CloudFormation stack to associate the bucket with.
 * @returns The created S3 bucket.
 */
const createBucket = (stack: Stack) => {
  /**
   * Represents the S3 bucket to store the React Assets.
   */
  const bucket = new Bucket(stack, `${stack.stackName}Bucket`, {
    versioned: true,
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
  });

  return bucket;
};

export { createBucket };

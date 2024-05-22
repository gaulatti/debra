import { Stack } from 'aws-cdk-lib';
import { CloudFrontWebDistribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { Bucket } from 'aws-cdk-lib/aws-s3';

/**
 * Creates a CloudFront distribution for the specified stack and S3 bucket.
 *
 * @param stack - The AWS CloudFormation stack.
 * @param bucket - The S3 bucket to be used as the origin source.
 * @returns The created CloudFront distribution.
 */
const createDistribution = (stack: Stack, s3BucketSource: Bucket) => {
   /**
    * Represents the CloudFront Origin Access Identity (OAI).
    */
   const originAccessIdentity = new OriginAccessIdentity(stack, `${stack.stackName}DistributionOAI`);

   /**
    * Grants read permissions to the CloudFront Origin Access Identity (OAI).
    */
   s3BucketSource.grantRead(originAccessIdentity);

   /**
   * Represents the CloudFront distribution to serve the React Assets.
   */
  const distribution = new CloudFrontWebDistribution(stack, `${stack.stackName}Distribution`, {
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource,
          originAccessIdentity,
        },
        behaviors: [{ isDefaultBehavior: true }],
      },
    ],
  });

  return distribution;
};

export { createDistribution };

import { Stack } from 'aws-cdk-lib';
import { CloudFrontWebDistribution } from 'aws-cdk-lib/aws-cloudfront';
import { Bucket } from 'aws-cdk-lib/aws-s3';

const createDistribution = (stack: Stack, bucket: Bucket) => {
  const distribution = new CloudFrontWebDistribution(stack, `${stack.stackName}Distribution`, {
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: bucket,
        },
        behaviors: [{ isDefaultBehavior: true }],
      },
    ],
  });

  return distribution;
};

export { createDistribution };

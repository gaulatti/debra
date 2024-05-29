import { Stack } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { CloudFrontWebDistribution, OriginAccessIdentity, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';
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
   * The domain name to be used for the CloudFront distribution.
   */
  const certificate = Certificate.fromCertificateArn(
    stack,
    `${stack.stackName}Certificate`,
    'arn:aws:acm:us-east-1:792025092931:certificate/12332379-56cf-4e0a-9ad4-3aba595cc5e8'
  );

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
    viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
      aliases: ['nena.gaulatti.com'],
    }),
    errorConfigurations: [
      {
        errorCode: 404,
        responsePagePath: '/index.html',
        responseCode: 200,
        errorCachingMinTtl: 0,
      },
    ],
  });

  return distribution;
};

export { createDistribution };

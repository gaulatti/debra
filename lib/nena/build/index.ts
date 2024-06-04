import { Stack } from 'aws-cdk-lib';
import { CloudFrontWebDistribution } from 'aws-cdk-lib/aws-cloudfront';
import { Artifacts, BuildSpec, EventAction, FilterGroup, GitHubSourceCredentials, LinuxBuildImage, Project, Source } from 'aws-cdk-lib/aws-codebuild';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates a CodeBuild project to build React assets and deploy them to S3 and CloudFront.
 * @param stack - The AWS CloudFormation stack.
 * @param bucket - The S3 bucket to deploy the assets to.
 * @param distribution - The CloudFront distribution to invalidate after deployment.
 * @param sourceToken - The secret containing the GitHub access token.
 */
const createBuildProject = (stack: Stack, bucket: Bucket, distribution: CloudFrontWebDistribution, sourceToken: Secret) => {
  /**
   * Represents the build specification to build the React Assets.
   */
  const buildSpec = {
    version: '0.2',
    phases: {
      install: {
        'runtime-versions': {
          nodejs: '20',
        },
        commands: ['npm install'],
      },
      build: {
        commands: ['npm run build'],
      },
      post_build: {
        commands: [
          `aws s3 rm s3://${bucket.bucketName} --recursive`,
          `aws s3 sync dist/ s3://${bucket.bucketName}`,
          `aws cloudfront create-invalidation --distribution-id ${distribution.distributionId} --paths "/index.html"`,
        ],
      },
    },
  };

  /**
   * Represents the GitHub source credentials to access the repository.
   */
  const credentials = new GitHubSourceCredentials(stack, `${stack.stackName}GitHubCreds`, {
    accessToken: sourceToken.secretValue,
  });

  /**
   * Represents the CodeBuild project to build the React Assets.
   */
  const project = new Project(stack, `${stack.stackName}BuildProject`, {
    projectName: `${stack.stackName}BuildProject`,
    source: Source.gitHub({
      owner: 'gaulatti',
      repo: 'nena',
      webhook: true,
      webhookFilters: [FilterGroup.inEventOf(EventAction.PUSH).andBranchIs('main')],
      reportBuildStatus: true,
      cloneDepth: 1,
    }),
    environment: {
      buildImage: LinuxBuildImage.STANDARD_5_0,
    },
    artifacts: Artifacts.s3({
      bucket: bucket,
      includeBuildId: false,
      packageZip: false,
      path: 'dist',
    }),
    buildSpec: BuildSpec.fromObject(buildSpec),
  });

  /**
   * Grants the CodeBuild project permission to create invalidations on the CloudFront distribution.
   */
  distribution.grantCreateInvalidation(project);
};

export { createBuildProject };

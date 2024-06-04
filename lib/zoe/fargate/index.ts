import { Stack } from 'aws-cdk-lib';
import { AwsLogDriver, ContainerImage, CpuArchitecture, FargateTaskDefinition, OperatingSystemFamily, Secret } from 'aws-cdk-lib/aws-ecs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Secret as SSMSecret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates a Fargate task definition with the specified stack and secrets.
 * @param stack - The CloudFormation stack.
 * @returns The Fargate task definition.
 */
const createFargateTask = (stack: Stack) => {

  /**
   * Represents the CloudWatch log group.
   */
  const logGroup = new LogGroup(stack, `${stack.stackName}LighthouseLogGroup`, {
    retention: RetentionDays.ONE_WEEK,
  });

  /**
   * Represents the log driver used by the Fargate service.
   */
  const logDriver = new AwsLogDriver({
    logGroup,
    streamPrefix: 'Lighthouse',
  });

  /**
   * Represents the Fargate task definition.
   */
  const fargateTaskDefinition = new FargateTaskDefinition(stack, `${stack.stackName}LighthouseFargateTask`, {
    cpu: 4096,
    memoryLimitMiB: 8192,
    runtimePlatform: { cpuArchitecture: CpuArchitecture.X86_64, operatingSystemFamily: OperatingSystemFamily.LINUX },
  });

  /**
   * Adds a container to the Fargate task definition.
   */
  fargateTaskDefinition.addContainer(`${stack.stackName}LighthouseFargateContainer`, {
    containerName: `${stack.stackName}LighthouseFargateContainer`,
    image: ContainerImage.fromAsset('./lib/zoe/assets'),
    logging: logDriver,
  });

  return { fargateTaskDefinition };
};

export { createFargateTask };

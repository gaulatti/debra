import { Stack } from 'aws-cdk-lib';
import { ContainerImage, CpuArchitecture, FargateTaskDefinition, OperatingSystemFamily, Secret } from 'aws-cdk-lib/aws-ecs';
import { Secret as SSMSecret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates a Fargate task definition for the specified stack.
 * @param stack - The stack to create the Fargate task definition for.
 * @returns An object containing the created Fargate task definition.
 */
const createFargateTask = (stack: Stack, { urlSecret, apiKeySecret, targetSecret }: Record<string, SSMSecret>) => {
  /**
   * Represents the Fargate task definition.
   */
  const fargateTaskDefinition = new FargateTaskDefinition(stack, `${stack.stackName}LighthouseFargateTask`, {
    cpu: 4096,
    memoryLimitMiB: 8192,
    runtimePlatform: { cpuArchitecture: CpuArchitecture.X86_64, operatingSystemFamily: OperatingSystemFamily.LINUX },
    executionRole: undefined,
    taskRole: undefined,
  });

  /**
   * Adds a container to the Fargate task definition.
   */
  fargateTaskDefinition.addContainer(`${stack.stackName}LighthouseFargateContainer`, {
    image: ContainerImage.fromAsset('./lib/zoe/assets'),
    secrets: {
      URL_SECRET: Secret.fromSecretsManager(urlSecret),
      API_KEY_SECRET: Secret.fromSecretsManager(apiKeySecret),
      TARGET_SECRET: Secret.fromSecretsManager(targetSecret),
    },
  });

  return { fargateTaskDefinition };
};

export { createFargateTask };

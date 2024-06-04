import { Stack } from 'aws-cdk-lib';
import { Cluster, ContainerImage, CpuArchitecture, FargateService, FargateTaskDefinition, OperatingSystemFamily, Secret } from 'aws-cdk-lib/aws-ecs';
import { Secret as SSMSecret } from 'aws-cdk-lib/aws-secretsmanager';

const createFargateService = (stack: Stack, secrets: Record<string, SSMSecret>, cluster: Cluster) => {
  /**
   * Represents the secrets used by the Fargate service.
   */
  const { urlSecret, apiKeySecret, targetSecret } = secrets;

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
    containerName: `${stack.stackName}LighthouseFargateContainer`,
    image: ContainerImage.fromAsset('./lib/zoe/assets'),
    secrets: {
      URL_SECRET: Secret.fromSecretsManager(urlSecret),
      API_KEY_SECRET: Secret.fromSecretsManager(apiKeySecret),
      TARGET_SECRET: Secret.fromSecretsManager(targetSecret),
    },
  });

  /**
   * Represents the Fargate service.
   */
  const fargateService = new FargateService(stack, `${stack.stackName}LighthouseFargateService`, {
    serviceName: `${stack.stackName}LighthouseFargateService`,
    cluster,
    taskDefinition: fargateTaskDefinition,
  });

  return { fargateService };
};

export { createFargateService };

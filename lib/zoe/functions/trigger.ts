import { Duration, Stack } from 'aws-cdk-lib';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { Cluster, FargateTaskDefinition } from 'aws-cdk-lib/aws-ecs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Creates a trigger Lambda function for the specified stack.
 * @param stack - The stack where the trigger Lambda function will be created.
 * @param secrets - The secrets used by the Fargate service.
 * @param fargateTaskDefinition - The Fargate task definition.
 * @param cluster - The cluster where the Fargate service is running.
 * @param securityGroup - The security group associated with the Fargate service.
 * @returns An object containing the created trigger Lambda function.
 */
const createTriggerLambda = (stack: Stack, secrets: Record<string, Secret>, fargateTaskDefinition: FargateTaskDefinition, cluster: Cluster, securityGroup: SecurityGroup) => {
  /**
   * Represents the secrets used by the Fargate service.
   */
  const { urlSecret, apiKeySecret, targetSecret } = secrets;

  /**
   * Represents the trigger Lambda function specification.
   */
  const triggerLambdaSpec = {
    functionName: `${stack.stackName}Trigger`,
    entry: './lib/zoe/functions/trigger.src.ts',
    handler: 'main',
    runtime: Runtime.NODEJS_20_X,
    timeout: Duration.minutes(1),
    environment: {
      URL_SECRET: urlSecret.secretValue.unsafeUnwrap(),
      API_KEY_SECRET: apiKeySecret.secretValue.unsafeUnwrap(),
      SUBNETS: cluster.vpc.privateSubnets.map(subnet => subnet.subnetId).join(','),
      SECURITY_GROUP: securityGroup.securityGroupId,
      TARGET_SECRET: targetSecret.secretValue.unsafeUnwrap(),
      CLUSTER: cluster.clusterArn,
      TASK_DEFINITION: fargateTaskDefinition.taskDefinitionArn,
      CONTAINER_NAME: fargateTaskDefinition.defaultContainer!.containerName,
    },
  };

  /**
   * Represents the trigger Lambda function.
   */
  const triggerLambda = new NodejsFunction(stack, `${triggerLambdaSpec.functionName}Lambda`, triggerLambdaSpec);
  fargateTaskDefinition.grantRun(triggerLambda);

  return { triggerLambda };
};

export { createTriggerLambda };

import { Stack } from 'aws-cdk-lib';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';

/**
 * Creates a VPC (Virtual Private Cloud) for the given stack.
 * @param stack - The stack in which the VPC will be created.
 * @returns An object containing the created VPC.
 */
const createVpc = (stack: Stack) => {
  const vpc = new Vpc(stack, `${stack.stackName}VPC`, {
    vpcName: `${stack.stackName}VPC`,
    maxAzs: 2,
  });

  return { vpc };
};

const createSecurityGroup = (stack: Stack, vpc: Vpc) => {
  const securityGroup = new SecurityGroup(stack, `${stack.stackName}SecurityGroup`, {
    vpc,
    securityGroupName: `${stack.stackName}SecurityGroup`,
  });

  return { securityGroup };
}

export { createVpc, createSecurityGroup };

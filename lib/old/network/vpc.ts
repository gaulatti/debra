import { Stack } from 'aws-cdk-lib';
import {
  InterfaceVpcEndpoint,
  InterfaceVpcEndpointAwsService,
  IpAddresses,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';

/**
 * Creates a VPC with the specified configuration.
 *
 * @param stack - The CloudFormation stack.
 * @returns The created VPC.
 */
const createVpc = (stack: Stack) => {
  const vpc = new Vpc(stack, `${stack.stackName}Vpc`, {
    ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
    natGateways: 0,
    maxAzs: 2,
    subnetConfiguration: [
      {
        name: `private-${stack.stackName}`,
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        cidrMask: 24,
      },
      {
        name: `public-${stack.stackName}`,
        subnetType: SubnetType.PUBLIC,
        cidrMask: 24,
      },
    ],
  });

  new InterfaceVpcEndpoint(
    stack,
    `${stack.stackName}ApoquindoVpcSecretsManagerEndpoint`,
    {
      service: InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
      vpc,
    }
  );

  return vpc;
};

export { createVpc };

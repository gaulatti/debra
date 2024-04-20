import { Stack } from 'aws-cdk-lib';
import { Cors, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { STACK_NAME } from '../../../consts';

/**
 * Builds the Ariston API.
 * @param stack - The AWS CloudFormation stack.
 * @returns An object containing the API endpoint.
 */
const buildAristonApi = (stack: Stack) => {
  const endpoint = new RestApi(stack, `${STACK_NAME}AristonEndpoints`, {
    restApiName: 'AristonApi',
    description: 'This Endpoint contains management and retrieval APIs for Ariston.',
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
    },
  });

  return { endpoint };
};

export { buildAristonApi };

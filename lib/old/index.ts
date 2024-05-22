import { Stack } from 'aws-cdk-lib';
import {
  AuthorizationType,
  CfnResolver,
  Definition,
  FieldLogLevel,
  GraphqlApi,
} from 'aws-cdk-lib/aws-appsync';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { buildLambdaResolverRole } from './roles/lambdaResolverRole';
import { createVpc } from './network/vpc';
import { createPipelineResolverBuilder } from './builders/pipelineResolverBuilder';

/**
 * Builds and configures an AppSync API.
 *
 * @param stack - The AWS CloudFormation stack.
 * @param getLambda - The Node.js function used for retrieving data.
 * @returns The configured AppSync API.
 */
const buildAppsyncApi = (stack: Stack, getLambda: NodejsFunction) => {
  const api = new GraphqlApi(stack, `${stack.stackName}Api`, {
    name: `${stack.stackName}Api`,
    definition: Definition.fromFile(path.join(__dirname, 'eleni.graphql')),
    authorizationConfig: {
      defaultAuthorization: {
        authorizationType: AuthorizationType.API_KEY,
        apiKeyConfig: {
          name: 'dummyApiKey',
        },
      },
    },
    logConfig: {
      fieldLogLevel: FieldLogLevel.ALL,
    },
    xrayEnabled: true,
  });

  const lambdaRole = buildLambdaResolverRole(stack);
  const vpc = createVpc(stack);
  const pipelineResolverBuilder = createPipelineResolverBuilder(
    stack,
    lambdaRole,
    api,
    vpc
  );

  const { configuration: getAudioContentFunction } = pipelineResolverBuilder(
    'getContentAudio',
    getLambda
  );

  new CfnResolver(stack, `${stack.stackName}GetAudioContentResolver`, {
    apiId: api.apiId,
    typeName: 'Query',
    fieldName: 'getContentAudio',
    kind: 'PIPELINE',
    pipelineConfig: {
      functions: [getAudioContentFunction.attrFunctionId],
    },
    requestMappingTemplate: `
        {
          "version": "2017-02-28",
          "operation" : "Invoke",
          "payload": {}
        }
        `,
    responseMappingTemplate: `$util.toJson($context.prev.result)`,
  });
  return api;
};

export { buildAppsyncApi };

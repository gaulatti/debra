import { AssignPublicIp, ECSClient, LaunchType, RunTaskCommand, RunTaskCommandInput } from '@aws-sdk/client-ecs';

const main = async (event: any) => {
  const { URL_SECRET, API_KEY_SECRET, TARGET_SECRET, CLUSTER, TASK_DEFINITION, CONTAINER_NAME, SUBNETS, SECURITY_GROUP } = process.env;
  console.log({ URL_SECRET, API_KEY_SECRET, TARGET_SECRET, CLUSTER, TASK_DEFINITION, CONTAINER_NAME, SUBNETS, SECURITY_GROUP });
  const subnets = SUBNETS!.split(',');

  // Create an instance of the ECS client
  const ecsClient = new ECSClient();

  // Define the parameters for the RunTaskCommand
  const params: RunTaskCommandInput = {
    cluster: CLUSTER,
    taskDefinition: TASK_DEFINITION,
    launchType: LaunchType.FARGATE,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets,
        securityGroups: [SECURITY_GROUP!],
        assignPublicIp: AssignPublicIp.ENABLED,
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: CONTAINER_NAME,
          environment: [
            { name: 'URL_SECRET', value: URL_SECRET },
            { name: 'API_KEY_SECRET', value: API_KEY_SECRET },
            { name: 'TARGET_SECRET', value: TARGET_SECRET },
          ],
        },
      ],
    },
  };

  try {
    // Run the Fargate task
    const command = new RunTaskCommand(params);
    const response = await ecsClient.send(command);
    console.log('Fargate task started:', response);
  } catch (error) {
    console.error('Error triggering Fargate task:', error);
  }
};

export { main };

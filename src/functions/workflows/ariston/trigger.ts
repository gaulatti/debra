const main = async (event: any, _context: any, callback: any) => {
  /**
   * We won't catch all the events and it's enough to determine
   * that LIBRARY_PUBLISH is the one we need to trigger the workflow.
   */
  const body = JSON.parse(event.body);
  if (body.event_type == 'LIBRARY_PUBLISH') {
    const fileKey = body.file_key;
    const triggeredBy = body.triggered_by;
    const timestamp = body.timestamp;
    console.log({ fileKey, triggeredBy, timestamp });

    // TODO: store changes
    // GET/v1/files/:key
    // TODO: get file contents
    // TODO: Parse the file
    // TODO: Serialize the file
    // TODO: Send it to S3
    // TODO: Export the output
  }

  callback(null, {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: null,
  });

  return;
};

export { main };

import * as LambdaProxy from "../../interfaces/lambda-proxy";

export default async function handler(event: LambdaProxy.Event) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "OPTIONS, GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
}




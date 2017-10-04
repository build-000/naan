import * as LambdaProxy from "../../interfaces/lambda-proxy";
import { Context, Callback } from 'aws-lambda';

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
export var helloconst = function(event: any) {
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

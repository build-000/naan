import { Context, Callback } from 'aws-lambda';
import { helloconst } from "./src/handlers/hello";
import { mock_api } from "./src/handlers/mock_api";
import { suggest_tracks } from "./src/handlers/suggest";
import { Event } from "./src/interfaces/lambda-proxy";

exports.handleIt = (event: any, context: any, callback: any) => callback(null,
  { message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!', event }
);
exports.hello = (event: any, context: any, callback: any) => callback(null,
  { message: 'Hellow fucking lambda serverless!', event }
);
exports.hello2 = (event: any, context: any, callback: any) => callback(null,
  {
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
  }
);
exports.hello3 = (event: any, context: any, callback: any) => callback(null, helloconst(event));
exports.mockapi = (event: any, context: any, callback: any) => callback(null, mock_api());
exports.suggest = async (event: Event, context: any, callback: any) => callback(null, 
		await suggest_tracks(event)
	);

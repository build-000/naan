import * as LambdaProxy from "../../interfaces/lambda-proxy";

const MOCK_RELATED_TRACKS = require("./mock_data.json"); // tslint:disable-line

export default async function handler(event: LambdaProxy.Event) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "OPTIONS, GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(MOCK_RELATED_TRACKS.filter((v: any) => v.kind === "track").slice(0, 20)),
  };
}

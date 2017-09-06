import { Event } from "../../interfaces/lambda-proxy";
import { MOOD, Suggester, WEATHER } from "../../services/suggest";

const ACCEPTABLE_MOODS = {
  [MOOD.RELAXED]: true,
  [MOOD.HAPPY]: true,
  [MOOD.ANGRY]: true,
  [MOOD.SAD]: true,
};

const ACCEPTABLE_WEATHERS = {
  [WEATHER.WARM]: true,
  [WEATHER.COOL]: true,
  [WEATHER.RAINY]: true,
  [WEATHER.SNOWY]: true,
};

export default async function(event: Event) {
  const query = event.queryStringParameters || {};

  const { mood, weather, debug } = query;
  const count = +query.count || 20;

  if (!ACCEPTABLE_MOODS[mood]) {
    return renderError(`mood ${mood} is not allowed value`, 400);
  }

  if (!ACCEPTABLE_WEATHERS[weather]) {
    return renderError(`weather ${weather} is not allowed value`, 400);
  }

  const suggester = new Suggester(mood as MOOD, weather as WEATHER, process.env.SOUNDCLOUD_CLIENT_ID);

  const candidates = await suggester.suggest(count);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(debug ? candidates.map((v) => v.track) : candidates),
  };
}

function renderError(message: string, statusCode: number = 500) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      error: {
        message,
      },
    }),
  };
}

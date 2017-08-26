import json
import logging
from weather import WeatherInfo

log = logging.getLogger()
log.setLevel(logging.DEBUG)


def handler(event, context):
    log.info('got event{}'.format(event))
    latitude = event["queryStringParameters"]['lat']
    longitude = event["queryStringParameters"]['lng']

    try:
        data = WeatherInfo.get_weather(latitude, longitude)
        result = WeatherInfo.parse_weather(data)
        response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": 'OPTIONS, GET',
            },
            "body": json.dumps(result, ensure_ascii=False, indent='\t')
        }
    except KeyError:
        response = {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": 'OPTIONS, GET',
            },
            "body": "400 Bad request"
        }

    return response






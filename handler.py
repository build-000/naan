import json
import logging
from weather import WeatherInfo

log = logging.getLogger()
log.setLevel(logging.DEBUG)

API_KEY = 'f68bb0f0512ac1c6aa506b31bfd66474'


def handler(event, context):
    log.info('got event{}'.format(event))
    latitude = event["queryStringParameters"]['lat']
    longitude = event["queryStringParameters"]['lng']

    try:
        data = WeatherInfo.get_weather(latitude, longitude)
        result = WeatherInfo.parse_weather(data)
        response = {
            "statusCode": 200,
            "body": json.dumps(result, ensure_ascii=False, indent='\t')
        }
    except KeyError:
        response = {
            "statusCode": 400,
            "body": "Bad request"
        }
    finally:
        return response



    # find appropriate music and send to tracklist





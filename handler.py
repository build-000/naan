import json
import logging
from weather import WeatherInfo

log = logging.getLogger()
log.setLevel(logging.DEBUG)

API_KEY = 'f68bb0f0512ac1c6aa506b31bfd66474'


def handler(event, context):
    # test
    # latitude and longitude will come thru request
    parsed = event

    # sample data
    # sample_data = '{"latitude":37.5371163,"longitude":127.0078127}'
    # parsed = json.loads(sample_data)

    latitude = parsed['latitude']
    longitude = parsed['longitude']

    data = WeatherInfo.get_weather(latitude, longitude)
    # to append to final json string
    result = WeatherInfo.parse_weather(data)

    # find appropriate music and send to tracklist

    response = {
        "statusCode": 200,
        "body": json.dumps(result, ensure_ascii=False, indent='\t')
    }

    return response

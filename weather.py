import requests
import logging as log

API_KEY = 'f68bb0f0512ac1c6aa506b31bfd66474'


def get_weather(lat, long):
    url = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&APPID=%s' % (lat, long, API_KEY)
    log.debug('calling %s...' % (url))
    result = requests.get(url)

    response = {
        "statusCode": result.status_code,
        "body": result.text
    }

    return response

# response 를 http.response 로 넘겨서 redirect

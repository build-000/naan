import json
import requests
import logging as log

# might not needed?
API_KEY = 'f68bb0f0512ac1c6aa506b31bfd66474'


def print_result(func):
    def inner_function(*args, **kwargs):
        result = func(*args, **kwargs)
        print(result)
        return result
    return inner_function


class Weather:
    @staticmethod
    @print_result
    def get_weather(lat, long):
        url = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&APPID=%s' % (lat, long, API_KEY)
        log.debug('calling %s...' % url)
        result = requests.get(url).text
        return result

    @staticmethod
    def parse_weather(weather):
        json_format = json.loads(weather)
        weather_main = json_format['weather'][0]['main']
        # additional logic
        temperature = json_format['main']['temp'] - 273.15
        # additional logic

        parsed = {
            'location': json_format['name'],
            'coord': json_format['coord'],
            'weather_description': weather_main,
            'temp_description': temperature
        }
        return parsed

    @staticmethod
    def repack(weather):
        with open('weather.json', 'w', encoding='utf-8') as makefile:
            json.dump(weather, makefile, ensure_ascii=False, indent='\t')

# response 를 http.response 로 넘겨서 redirect

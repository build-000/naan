import json
import requests
import logging

API_KEY = 'f68bb0f0512ac1c6aa506b31bfd66474'
log = logging.getLogger()
log.setLevel(logging.INFO)


class WeatherInfo:
    @staticmethod
    def get_weather(lat, long):
        url = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&APPID=%s' % (lat, long, API_KEY)
        result = requests.get(url).text
        return result

    @staticmethod
    def parse_weather(weather):
        json_format = json.loads(weather)
        log.info('got result{}'.format(weather))
        weather_main = json_format['weather'][0]['main']
        if weather_main == 'Drizzle':
            weather_main = 'Rain'
        elif weather_main == 'Mist':
            weather_main = 'Snow'

        temperature = json_format['main']['temp'] - 273.15
        if temperature > 20:
            temp_description = 'warm'
        else:
            temp_description = 'cool'

        parsed = {
            'location': json_format['name'],
            'coord': json_format['coord'],
            'weather_description': weather_main,
            'temperature': temperature,
            'temp_description': temp_description
        }
        return parsed

    @staticmethod
    def repack(weather):
        with open('weather.json', 'w', encoding='utf-8') as makefile:
            json.dump(weather, makefile, ensure_ascii=False, indent='\t')


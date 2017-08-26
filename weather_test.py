from weather import WeatherInfo
import json

sample_data = '{"latitude":-37.814,"longitude":144.96332}'
parsed = json.loads(sample_data)

latitude = parsed['latitude']
longitude = parsed['longitude']

res = WeatherInfo.parse_weather(WeatherInfo.get_weather(latitude, longitude))
WeatherInfo.repack(res)


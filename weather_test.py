from weather import WeatherInfo
import json

sample_data = '{"latitude":-37.814,"longitude":144.96332}'
parsed = json.loads(sample_data)

latitude = parsed['latitude']
longitude = parsed['longitude']

tmp = WeatherInfo.get_weather(latitude, longitude)
print(tmp)
res = WeatherInfo.parse_weather(tmp)
WeatherInfo.repack(res)
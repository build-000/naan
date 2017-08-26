from weather import Weather

res = Weather.parse_weather(Weather.get_weather(-34.6083, -58.3712))
Weather.repack(res)


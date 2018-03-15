import { Injectable }    from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Weather } from './weather';

@Injectable()
export class WeatherService {
  weather : Weather;
  constructor(private http: HttpClient){}

  getWeatherData():Promise<Weather>{
    return new Promise((resolve,reject)=>{
      this.getLocation().then(url=>{
        this.http.get(url).subscribe(
          data => {
            this.weather  = {
              temperature : parseFloat(data['temperature']).toFixed(0),
              keyword : data['temp_description'],
              israin : data['weather_description'],
              location : data['location']
            }
            resolve(this.weather);
          },
          err => {
            console.log('Error : ' + err)
            reject(err);
          }
        );
      })
    })
  }

  getLocation():Promise<string> {
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(position => {
        let url = `https://ylmflbtrfk.execute-api.ap-northeast-2.amazonaws.com/dev/weather?lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
        resolve(url);
      });
    })
  }

}

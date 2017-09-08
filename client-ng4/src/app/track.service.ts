import { Injectable }    from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Track } from './track';
import 'soundcloud';
declare var SC : any;


import 'rxjs/add/operator/toPromise';


@Injectable()
export class TrackService {
  tracks : Track[] = [];
  track : Track
  /*stream_url = list[i].track.stream_url + '?client_id=' + client_id;*/
  private headers = new Headers({'Content-Type': 'application/json'});
  private trackUrl = 'https://91igu4dgel.execute-api.ap-northeast-2.amazonaws.com/prod/tracks/suggestions';
  private cliend_id = '761LMfrpB07DQlPhf7rbKo5fLsBuMaKH';
  private player : any;
  private firstExcution = false;

  constructor(private http: HttpClient){}


  soundcloudInit():any{
    this.firstExcution = true;
    SC.initialize({client_id : this.cliend_id})
  }
  getTrackInfo():Track{
    return this.track;
  }

  playTrack(trackIndex:number):Promise<Track>{
    return new Promise((resolve, reject)=>{
      SC.stream(`/tracks/${this.tracks[trackIndex].id}`).then((player:any)=>{
        player.play();
        this.track = this.tracks[trackIndex]
        this.player = player;
        resolve(this.track);
      })
    }).catch(err=>{
      console.log('Error : ' + err)
    })
  }
  nextTrack(trackIndex:number):void{
    this.pauseTrack(); 
    this.playTrack(trackIndex)
  }

  pauseTrack():void{
    this.player.pause();
  }
  rePlayTrack():void{
    this.player.play();
  }


  getTracks(mood: string, weather : string): Promise<Track[]> {
    let url = `${this.trackUrl}?mood=${mood}&weather=${weather}`;
      return new Promise((resolve,reject)=>{
          this.http.get(url).subscribe(
            list => {
              this.tracks = [];
              for (var i in list) {
                let track = {
                  id : list[i].id,
                  title : list[i].track.title,
                  duration : list[i].track.duration,
                  artwork_url : list[i].track.artwork_url,
                  author : list[i].track.user.username
                }
                this.tracks.push(track);
              }
              if (this.firstExcution == false){
                this.soundcloudInit();
              }else{
                this.pauseTrack();
              }

              resolve(this.tracks);
            },
            err => {
              console.log('Error : ' + err);
              reject(err);
            }
          );
      }
    )
  }
}

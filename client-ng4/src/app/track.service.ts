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
  private trackUrl = 'https://91igu4dgel.execute-api.ap-northeast-2.amazonaws.com/prod/tracks/suggestions';
  private cliend_id = '761LMfrpB07DQlPhf7rbKo5fLsBuMaKH';
  private player : any;
  private firstExcution = false;
  private playFlag = false;

  constructor(private http: HttpClient){}


  soundcloudInit():any{
    this.firstExcution = true;
    SC.initialize({client_id : this.cliend_id});
  }
  playEvent():void{
    this.player.on('play',()=>{
      console.log('playing...');
    });
    this.player.on('finish', ()=>{
    });
  }
  nextTrack(trackIndex:number):Promise<Track>{
    this.pauseTrack();
    return new Promise((resolve,reject)=>{
      resolve(this.getTrack(trackIndex))
    })
  }
  getTrack(trackIndex:number):Promise<Track>{
    this.playFlag = false;
    return new Promise((resolve, reject)=>{
      SC.stream(`/tracks/${this.tracks[trackIndex].id}`).then((player:any)=>{
        this.track = this.tracks[trackIndex]
        this.player = player;
        this.playTrack(trackIndex)
        resolve(this.track);
      })
    }).catch(err=>{
      console.log('Error : ' + err)
    })
  }
  pauseTrack():void{
    this.player.pause();
  }
  playTrack(trackIndex:number):void{
    if (this.playFlag == false){
      this.playFlag = true;
      this.playEvent();
    }
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
                  artwork_url : this.changeArtworkUrl(list[i].track.artwork_url),
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
  changeArtworkUrl(url : string) {
    var res;
    if (url != null) res = url.replace("-large.jpg", "-t500x500.jpg");
    else res = '/src/images/no-artwork.png';
    return res;
  }
}

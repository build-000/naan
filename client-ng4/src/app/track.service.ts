import { Injectable }    from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Track } from './track';
import 'soundcloud';
declare var SC : any;


import 'rxjs/add/operator/toPromise';


@Injectable()
export class TrackService {
  tracks : Track[] = [];
  track : Track;
  track_now: Track;
  trackIndex: number;
  private trackUrl = 'https://udw2i8bm5b.execute-api.ap-northeast-2.amazonaws.com/prod/tracks/suggestions';
  private cliend_id = '761LMfrpB07DQlPhf7rbKo5fLsBuMaKH';
  private player : any;
  private firstExcution = false;
  playFlag_now = false;

  constructor(private http: HttpClient){
    this.trackIndex = 0;
  }

  soundcloudInit():any{
    this.firstExcution = true;
    SC.initialize({client_id : this.cliend_id});
  }
  playEvent():void{
    this.player.on('play',()=>{
      console.log('playing...');
    });
    this.player.on('finish', ()=>{
      console.log('finishing...');
      // this.reloadTrack(this.get_current_trackIndex() + 1);
      this.playNextTrack();
    });
  }
  pauseTrack():void{
    this.player.pause();
  }
  playTrack(trackIndex:number):void{
    if (this.playFlag_now == false){
      this.playFlag_now = true;
      this.playEvent();
    }
    this.player.play();
  }
  async playNextTrack() {
    if (this.tracks.length > 0){
      if (this.trackIndex == this.tracks.length-1){
        this.trackIndex = 0;
      } else {
        this.trackIndex++;
      }
      await this.reloadTrack(this.trackIndex).then(
        data => {
          this.track_now = data.track;
          this.playFlag_now = true;
        }
      );
    }
  }
  async playPrevTrack() {
    if (this.tracks.length > 0){
      if (this.trackIndex == 0){
        this.trackIndex = this.tracks.length-1;
      }else{
        this.trackIndex--
      }
      await this.reloadTrack(this.trackIndex).then(
        data => {
          this.track_now = data.track;
          this.playFlag_now = true;
        }
      )
    }
  }
  reloadTrack(trackIndex:number):Promise<any>{
    this.pauseTrack();
    return new Promise((resolve,reject)=>{
      resolve(this.getTrack(trackIndex))
    })
  }
  getTrack(trackIndex:number):Promise<any>{
    this.playFlag_now = false;
    return new Promise((resolve, reject)=>{
      SC.stream(`/tracks/${this.tracks[trackIndex].id}`).then((player:any)=>{
        this.track = this.tracks[trackIndex]
        this.player = player;
        this.playTrack(trackIndex)
        resolve({ track: this.track, player: this.player });
      })
    }).catch(err=>{
      console.log('Error : ' + err)
    })
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
  get_current_trackIndex(): number {
    return this.trackIndex;
  }
}

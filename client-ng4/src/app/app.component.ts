import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { OnInit } from '@angular/core';
import { Router }  from '@angular/router';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

import { Emoji } from './emoji';
import { EmojiService } from './emoji.service';

import { Track } from './track';
import { TrackService } from './track.service';

import * as $ from 'jquery';

@Component({
	styleUrls: ['../assets/sass/main.scss'],
	encapsulation: ViewEncapsulation.None,
	selector: 'my-app',
	templateUrl: './app.component.html'
})
export class AppComponent {
	weather: Weather;
	emojis: Emoji[] = [];
	tracks : Track[] = [];
	track : Track;

	public selectedEmoji : string;
	public trackIndex:number;
	public playFlag = false;
	public firstExcution = false;

	constructor(
		private emojiService : EmojiService,
		private weatherService : WeatherService,
		private trackService : TrackService
	){}

	getTrack():void{
		this.track = this.trackService.getTrackInfo();
	}

	onClickNextbtn():void{
		if (this.tracks.length>0){
			if (this.trackIndex == this.tracks.length-1){
				this.trackIndex = 0;
			}else{
				this.trackIndex++;
			}
			this.trackService.nextTrack(this.trackIndex);
			this.getTrack();
			this.playFlag = true;
		}
	}

	onClickPrevBtn():void{
		if (this.tracks.length>0){
			if (this.trackIndex == 0){
				this.trackIndex = this.tracks.length-1;
			}else{
				this.trackIndex--
			}
			this.trackService.nextTrack(this.trackIndex);
			this.getTrack();
			this.playFlag = true;
		}
	}

	onClickPauseBtn():void{
		if (this.tracks.length>0){
			this.playFlag = false;
			this.trackService.pauseTrack();
		}
	}

	onClickPlayBtn():void{
		if (this.tracks.length>0){
			this.trackService.rePlayTrack();
			this.playFlag = true;
		}
	}

	onClickEmoji(mood : string): void {
		if (!mood){
			return;
		}
		this.variableDataClear();
		console.log(mood);
		console.log(this.weather.keyword);
		this.close_emoji_mobile();
		this.track.title = 'loading...';
		this.trackService.getTracks(mood, this.weather.keyword)
		.then(
			data => {
				this.selectedEmoji = mood;
				this.tracks = data;
				if (this.playFlag == false){
					this.trackService.playTrack(0).then(player =>{
						this.trackIndex = 0;
						this.playFlag = true;
						this.firstExcution = true;
						this.track = this.trackService.getTrackInfo();
					});
				}
			},
			err => {
				console.log(err);
			}
		)
	}
	variableDataClear(): void{
		this.firstExcution = false;
		this.playFlag = false;
		this.tracks =[];
		this.track = new Track;
		this.selectedEmoji = '';
	}

	ngOnInit() {
		this.weatherService.getWeatherData()
		.then(weather => {
			this.weather = weather;
			this.emojiService.getEmojis()
				.then(emojis => { 
					this.emojis = emojis.slice(0,9);
					this.set_mobile_pop(); })

		}).catch(err => {
			console.log(err.message);
		})
	}
	set_mobile_pop() {
		// Emoji Moblie Popup
			$('#emoji-mobile-popup').click(function (e) { 
				show_emoji_mobile(e);
			});

			$(document).mouseup(function(e) {
				var container = $(".naan-emoji");
				if (!container.is(e.target) && container.has(e.target).length === 0) 
					close_emoji_mobile();
			});
			function show_emoji_mobile(e) {
				console.log('show!');
				$('.naan-emoji').addClass('loaded');
				$('.overlay').removeClass('blur-out');
				$('.overlay').addClass('blur-in');
				e.preventDefault();
			}
			function close_emoji_mobile() {
				$('.naan-emoji').removeClass('loaded');
				$('.overlay').removeClass('blur-in');
				$('.overlay').addClass('blur-out');
			}
	}
	close_emoji_mobile() {
		$('.naan-emoji').removeClass('loaded');
		$('.overlay').removeClass('blur-in');
		$('.overlay').addClass('blur-out');
	}
}

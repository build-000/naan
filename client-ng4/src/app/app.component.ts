import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
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
export class AppComponent implements OnInit {
	weather: Weather;
	emojis: Emoji[] = [];
	tracks : Track[] = [];
	track: Track;
	public selectedEmoji : string;
	public trackIndex:number;
	public playFlag = false;
	public firstExcution = false;

	constructor(
		private emojiService : EmojiService,
		private weatherService : WeatherService,
		private trackService : TrackService
	){}
	ngOnInit() {
		this.track = new Track;
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
	async onClickNextbtn() {
		await this.trackService.playNextTrack();
		this.updateTracknNow();
	}
	async onClickPrevBtn() {
		await this.trackService.playPrevTrack();
		this.updateTracknNow();
	}
	onClickPauseBtn():void{
		if (this.tracks.length>0){
			this.trackService.playFlag_now = false;
			this.trackService.pauseTrack();
			this.updateTracknNow();
		}
	}
	onClickPlayBtn():void{
		if (this.tracks.length>0){
			this.trackService.playTrack(this.trackService.trackIndex);
			this.trackService.playFlag_now = true;
			this.updateTracknNow();
		}
	}
	onClickEmoji(mood : string, cover_color : string): void {
		if (!mood){
			return;
		}
		this.changePlayerColor(cover_color);
		this.variableDataClear();
		this.close_emoji_mobile();
		this.track.title = 'loading...';
		this.trackService.getTracks(mood, this.weather.keyword)
		.then(
			data => {
				this.selectedEmoji = mood;
				this.tracks = data;
				if (this.trackService.playFlag_now == false){
					this.trackService.getTrack(0).then(track =>{
						this.trackService.trackIndex = 0;
						this.trackService.playFlag_now = true;
						this.firstExcution = true;
						this.trackService.track_now = track;
						this.updateTracknNow();
					});
				}
			},
			err => {
				console.log(err);
			}
		)
	}
	changePlayerColor(cover_color : string): void{
		$(".player-cover").css("background", "linear-gradient(to right, rgba(63, 193, 255, 0), " + cover_color + " 36%, " + cover_color + " 56%, rgba(63, 193, 255, 0))");
	}
	variableDataClear(): void{
		this.firstExcution = false;
		if (this.trackService.playFlag_now == true){
			this.trackService.pauseTrack();
			this.trackService.playFlag_now = false;
		}
		this.tracks =[];
		this.trackService.track_now = new Track;
		this.selectedEmoji = '';
	}
	set_mobile_pop() {
		// Emoji Moblie Popup
			$('#emoji-mobile-popup').click(function (e: any) {
				show_emoji_mobile(e);
			});
			$(document).bind( "mouseup touchend", function(e: any) {
				var container = $(".emoji-wrapper");
				if (!container.is(e.target) && container.has(e.target).length === 0)
					close_emoji_mobile();
			});
			function show_emoji_mobile(e: any) {
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
		// Track List Mobile Popup
			$('#tracklist-mobile-popup').click(function (e: any) {
				show_tacklist_mobile(e);
			});
			$(document).bind( "mouseup touchend", function(e: any) {
				var container = $(".track-list");
				if (!container.is(e.target) && container.has(e.target).length === 0)
					close_tacklist_mobile();
			});
			function show_tacklist_mobile(e: any) {
				$('.track-list').addClass('loaded');
				$('.overlay').removeClass('blur-out');
				$('.overlay').addClass('blur-in');
				e.preventDefault();
			}
			function close_tacklist_mobile() {
				$('.track-list').removeClass('loaded');
				$('.overlay').removeClass('blur-in');
				$('.overlay').addClass('blur-out');
			}
	}
	close_emoji_mobile() {
		$('.naan-emoji').removeClass('loaded');
		$('.overlay').removeClass('blur-in');
		$('.overlay').addClass('blur-out');
	}
	open_naan_playlist() {
		$('.panel-playing-list').addClass('loaded');
		$('.panel-emoji').removeClass('loaded');
	}
	open_naan_emoji_pan() {
		$('.panel-emoji').addClass('loaded');
		$('.panel-playing-list').removeClass('loaded');
	}
	updateTracknNow() {
		this.track = this.trackService.track_now;
		this.playFlag = this.trackService.playFlag_now;
	}
}

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

	onClickNextbtn():void{
		if (this.tracks.length>0){
			if (this.trackIndex == this.tracks.length-1){
				this.trackIndex = 0;
			}else{
				this.trackIndex++;
			}
			this.trackService.nextTrack(this.trackIndex).then(
				track => {
					this.track = track;
					this.playFlag = true;
				}
			);

		}
	}

	onClickPrevBtn():void{
		if (this.tracks.length>0){
			if (this.trackIndex == 0){
				this.trackIndex = this.tracks.length-1;
			}else{
				this.trackIndex--
			}
			this.trackService.nextTrack(this.trackIndex).then(
				track => {
					//this.getTrack();
					this.track = track;
					this.playFlag = true;
				}
			)

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
			this.trackService.playTrack(this.trackIndex);
			this.playFlag = true;
		}
	}

	onClickEmoji(mood : string, cover_color : string): void {
		if (!mood){
			return;
		}
		console.log('mood : ' + mood);
		this.changePlayerColor(cover_color);
		this.variableDataClear();
		this.close_emoji_mobile();
		this.track.title = 'loading...';
		this.trackService.getTracks(mood, this.weather.keyword)
		.then(
			data => {
				this.selectedEmoji = mood;
				this.tracks = data;
				console.log(this.tracks);
				if (this.playFlag == false){
					this.trackService.getTrack(0).then(track =>{
						this.trackIndex = 0;
						this.playFlag = true;
						this.firstExcution = true;
						this.track = track;
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
		if (this.playFlag == true){
			this.trackService.pauseTrack();
			this.playFlag = false;
		}
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
}

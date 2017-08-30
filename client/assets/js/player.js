var prevTrack = 0;
var currentTrack = 0;

function playAudio(myaudio) {
	/*
	 // play button change
	 document.getElementById("btnPlay").innerHTML = "Pause";
	 */
	
	setTimeout(function(){ myaudio.play(); }, 3000);

	nextPlag = false;
};
function pauseAudio(myaudio) {
	/*
	// pause button change
	 document.getElementById("btnPlay").innerHTML = "Play";

	 */
	myaudio.pause();
};
function selectTrack(track_num){
	if (myaudio.childNodes[track_num]){
		myaudio.src = myaudio.childNodes[track_num].src;
	}
	changeMusciTitle(g_list, track_num)
};
function getTrackNum(){
	var track_num = Math.floor((Math.random() * myaudio.children.length));
	if (track_num == currentTrack){
		getTrackNum();
	}else{
		currentTrack = track_num;
		return track_num;
	}
}
function nextPlay(){
	prevTrack = currentTrack;
	selectTrack(getTrackNum());
	$('.btnPlay').click();
};
function prevPlay(){
	selectTrack(prevTrack);
	$('.btnPlay').click();
};

function changeCoverPic(mood, weather) {
	$(".myImage").attr("src", window.location + '/images/weather/'+ weather + '-' + mood + '.jpg');
}

var firstExcution = false;
var g_list;

function changeMusciTitle(list, index) {
	document.getElementById("music-title").innerHTML = list[index].track.title;
	document.getElementById("music-author").innerHTML = list[index].track.user.username;
}

var getTracksDone = function(list){
	g_list = list;
	var myaudio = document.getElementById("myaudio");
	var client_id = '761LMfrpB07DQlPhf7rbKo5fLsBuMaKH';
	for (var i=0;i<list.length;i++){
			var stream_url = list[i].track.stream_url + '?client_id=' + client_id;
			var source = document.createElement('source');
			source.setAttribute('src',stream_url);
			myaudio.appendChild(source);
	}
	changeMusciTitle(list, 0);
	$('.btnPlay').click();
};

var weather;
var getTracks = function(mood){
	var url = 'https://91igu4dgel.execute-api.ap-northeast-2.amazonaws.com/prod/tracks/suggestions?mood=' + mood + '&weather=' + weather + '&count=40';
	$.ajax({
		 url: url
	}).success(
		 getTracksDone.bind(this)
	).fail(function (e) {
		 // handle erorr
		 console.error("unexpected error: ", e);
	});
	changeCoverPic(mood, weather);

};

var getCurrentWeatherDone = function(data){
	$('#naan-w-info').addClass('naan-iconicn_' + data['temp_description']);
	weather = data.temp_description;
}
function playByEmoji(mood) {
	getTracks(mood);
}
var getCurrentWeather = function(){
	 navigator.geolocation.getCurrentPosition(function(position){
			var url = 'https://7uiw9d5ck3.execute-api.ap-northeast-2.amazonaws.com/dev/weather?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude;
			$.ajax({
				 url: url
			}).success(
				 getCurrentWeatherDone.bind(this)
			).fail(function (e) {
				 // handle erorr
				 console.error("unexpected error: ", e);
			});
 });
};

(function($) {

	getCurrentWeather();
	var isplaying = false;

	$('.angry').bind('click',function(){
		playByEmoji('angry');
		changePlayButtontoPause();
	});
	$('.happy').bind('click',function(){
		playByEmoji('happy');
		changePlayButtontoPause();
	});
	$('.relaxed').bind('click',function(){
		playByEmoji('relaxed');
		changePlayButtontoPause();
	});

	 $('.btnPrev').bind('click',function(){
			prevPlay();
	 });

	 $('.btnPlay').bind('click',function(){
			var myaudio = document.getElementById("myaudio");
			changePlayButton();
	 });

	var nextPlag = false;
	$('.btnNext').bind('click',function(){
			nextPlay();
	});
	$('#myaudio').bind('playing',function(){
			console.log('playing');
	});
	$('#myaudio').bind('ended',function(){
			nextPlay();
	});


	function changePlayButton() {
		var myaudio = document.getElementById("myaudio");
		if (!isplaying) {
			$('.btnPlay').removeClass('naan-iconbtn_play');
			$('.btnPlay').addClass('naan-iconbtn_pause');
			playAudio(myaudio);
			isplaying = true;
		} else {
			$('.btnPlay').removeClass('naan-iconbtn_pause');
			$('.btnPlay').addClass('naan-iconbtn_play');
			pauseAudio(myaudio);
			isplaying = false;
		}
	}
	function changePlayButtontoPause() {
		$('.btnPlay').removeClass('naan-iconbtn_play');
		$('.btnPlay').addClass('naan-iconbtn_pause');
		isplaying = true;
	}
})(jQuery);

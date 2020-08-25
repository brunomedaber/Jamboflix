const filmAlt = sessionStorage.getItem("filmAlt")
const filmName = filmAlt.replace(/:/g, " ")

const video = document.querySelector('.container-wrap .container-video video')
const videoContainer = document.querySelector('.container-wrap')

const playButton = $('.container-wrap .controls button#play')
const rewindButton = document.querySelector('.container-wrap .controls button.rewind')
const forwardButton = document.querySelector('.container-wrap .controls button.forward')
const volumeButton = $('.container-wrap .controls button#volume')
const volumeContainer = $('.container-wrap .controls .volume-container')
const volumeWrapper = $('.container-wrap .controls .volume-container .volume-wrapper')
const captionsButton = $('.container-wrap .controls button#captions')
const captionsContainer = $('.container-wrap .controls .captions-container')
const captionsWrapper = $('.container-wrap .controls .captions-container .captions-wrapper')
const captionsList = $('.container-wrap .controls .captions-container .captions-wrapper .captions ul')
const selectedCaption = $('.container-wrap .controls .captions-container .captions-wrapper .captions ul li')
const fullScreenButton = $('.container-wrap .controls button#full-screen')
const containerControls = document.querySelector('.container-wrap .container-controls')
const containerBack = document.querySelector('.container-wrap .container-back')
const filmTitle = $('.container-wrap .container-controls .controls .title')


const containerProgress = $('.container-wrap .container-progress')
const progressBar = document.querySelector('.container-wrap .container-progress .progress-bar')
const watchedBar = document.querySelector('.container-wrap .container-progress .progress-bar .watched-bar')
const timeRemaining = document.querySelector('.container-wrap .container-progress .time-remaining')


$('video').attr('src', `./video/${filmName}/${filmName}.mp4`);
filmTitle.prepend(filmName);

let controlsTimeout;
watchedBar.style.width = '0px';
containerControls.style.opacity = '0';
containerBack.style.opacity = '0';
document.documentElement.style.cursor = 'none';
$('video').addClass('offControl');
volumeWrapper.css('opacity', '0')
volumeWrapper.css('visibility', "hidden")
captionsWrapper.css('opacity', '0')
captionsWrapper.css('visibility', "hidden")

const displayControls = () => {
  containerControls.style.opacity = '1';
  containerBack.style.opacity = '1';
  document.documentElement.style.cursor = 'auto';
  $('video').removeClass('offControl');
  $('video').addClass('onControl');
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
  }
  controlsTimeout = setTimeout( () => {
    containerControls.style.opacity = '0'
    containerBack.style.opacity = '0';
    document.documentElement.style.cursor = 'none';
    $('video').removeClass('onControl');
    $('video').addClass('offControl');
  }, 3000)
}

video.play();

const screenIcon = () => {
  fullScreenButton.toggleClass("fa-expand fa-compress");
}

const volumeIcon = () => {
  volumeButton.toggleClass("fa-volume-up fa-volume-mute");
}

const pauseIcon = () => {
  playButton.toggleClass("fa-pause fa-play");
}

const togglePlayPause = () => {
  if (video.paused) {
      video.play()
      pauseIcon();
  } else if (video.played) {
      video.pause()
      pauseIcon();
  }
};

const toggleMute = () => {
  video.muted = !video.muted;
  volumeIcon();
}

const toggleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    screenIcon();
  } else {
    videoContainer.requestFullscreen();
    screenIcon();
  }
}

const hideVolControl = () => {
  volumeWrapper.css('opacity', '0');
  volumeWrapper.css('visibility', "hidden")
  containerProgress.css('visibility', "visible") 
  containerProgress.css('opacity', '1');
}

const showVolControl = () => {
  volumeWrapper.css('visibility', "visible") 
  volumeWrapper.css('opacity', '1');
  containerProgress.css('opacity', '0');
  containerProgress.css('visibility', "hidden") 
}

const showCaptionsSelector = () => {
  captionsWrapper.css('visibility', "visible")
  captionsWrapper.css('opacity', '1');
  containerProgress.css('opacity', '0');
  containerProgress.css('visibility', "hidden")
}

const hideCaptionsSelector = () => {
  captionsWrapper.css('opacity', '0');
  captionsWrapper.css('visibility', "hidden")
  containerProgress.css('visibility', "visible") 
  containerProgress.css('opacity', '1');
}

document.onkeyup = function (event) {
    if (event.code == "Space") {
      togglePlayPause();
    }
    if (event.code == "KeyM") {
      toggleMute();
    }
    if (event.code == "KeyF") {
      toggleFullScreen();
    }
    
    displayControls();
}

document.addEventListener('mousemove', () => {
  displayControls()
})

volumeButton.click(toggleMute);

volumeButton.hover(showVolControl, hideVolControl);

volumeWrapper.hover(showVolControl, hideVolControl);

playButton.click(togglePlayPause);

fullScreenButton.click(toggleFullScreen);

captionsButton.hover(showCaptionsSelector, hideCaptionsSelector);

captionsWrapper.hover(showCaptionsSelector, hideCaptionsSelector);

captionsList.children('li').first().on("click", function() {
  let selected = $(this).css('selected')
    if (!selected) {
      $(this).addClass('selected')
      $(this).find('i').addClass('fas fa-check')
      captionsList.children('li').last().removeClass('selected')
      $('track').attr('src', `./video/${filmName}/${filmName}.vtt`)
    }
})

captionsList.children('li').last().on("click", function() {
  let selected = $(this).css('selected')
    if (!selected) {
      $(this).addClass('selected')
      captionsList.children('li').first().removeClass('selected')
      captionsList.children('li').first().find('i').removeClass('fas fa-check')
      $('track').attr('src', '')
    }
})

rewindButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

forwardButton.addEventListener('click', () => {
  video.currentTime += 10;
});

video.addEventListener('timeupdate', () => {
  watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';
  const totalSecondsRemaining = video.duration - video.currentTime;
  time.setSeconds(totalSecondsRemaining);
  let hours = null;

  if(totalSecondsRemaining >= 3600) {
    hours = (time.getHours().toString()).padStart('2', '0');
    }

    let minutes = (time.getMinutes().toString()).padStart('2', '0');
    let seconds = (time.getSeconds().toString()).padStart('2', '0');

    timeRemaining.textContent = `${hours ? hours : '00'}:${minutes}:${seconds}`;
});

progressBar.addEventListener('click', (event) => {
  const pos = (event.pageX  - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

window.SetVolume = function(val)
{
    var player = document.getElementById('video');
    player.volume = val / 100;
}

$(".container-back button.return").click(function(){
  window.open("index.html", "_self", "", false)
})


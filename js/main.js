$(document).ready(function(){

  const slider = $('.slider');
  const forward = $('.forward .fa-chevron-right');
  const backward = $('.backward .fa-chevron-left');
  const carousel = $('.carousel');
  const filmList = $('.slider-film-list');
  const filmCover = $('.film-cover');
  const playMovieButton = $(".film-cover .film-data .film-data-buttons .divPlay .btn-play")
  const unmuteButton = $(".film-cover .film-data .film-data-buttons .divMute .btn-mute")
  let direction = -1;

  forward.click(function() {
      if (direction === 1) {
          direction = -1;
          $(this).closest(carousel).find(slider).prepend($(this).closest(carousel).find(slider).children().last());
      }
      $(this).closest(carousel).css('justify-content', 'flex-start');
      $(this).closest(carousel).find(slider).css('transform', 'translate(-8.33%)');
  });

  backward.click(function() {
      if (direction === -1) {
          direction = 1;
          $(this).closest(carousel).find(slider).append($(this).closest(carousel).find(slider).children().first());
      }
      $(this).closest(carousel).css('justify-content', 'flex-end');
      $(this).closest(carousel).find(slider).css('transform', 'translate(8.33%)');
  });

  slider.on("transitionend", function() {
      if (direction === 1) {
          $(this).prepend($(this).children().last());
      } else {
          $(this).append($(this).children().first());
      }
      $(this).css('transition', 'none');
      $(this).css('transform', 'translate(0)');
      setTimeout(function() {
          slider.css('transition', 'all 0.5s');
      })
  });

  filmList.mouseover(function() {
      if ($(this).children(filmCover).last().is(':hover') === true) {
          $(this).closest(carousel).find('.forward').css('width', '6.8vw')
      } 
      if ($(this).children(filmCover).first().is(':hover') === true) {
         $(this).closest(carousel).find('.backward').css('width', '6.8vw')
      }
  })
  
  filmList.mouseout(function() {
      
      if ($(this).children(filmCover).last().is(':hover') === false) {
          $(this).closest(carousel).find('.forward').css('width', '12vw')
      }
      if ($(this).children(filmCover).first().is(':hover') === false) {
          $(this).closest(carousel).find('.backward').css('width', '12vw')
      }
  })

  $(".coverImg").each(function(i, obj) {
       var coverimg = $(this);
       var cover = $(this).attr("alt");
       var url2 = "http://www.omdbapi.com/?apikey=11f1c376&t=" + cover;
      $.getJSON(url2, function (json) {
          coverimg.attr("src", json.Poster); 
      });
  });

  filmCover.hover(function() {
      var alt = $(this).find('img').attr("alt");
      var url = "http://www.omdbapi.com/?apikey=11f1c376&t=" + alt;
      var cover = $(this);
      $(this).addClass("img-gradient");
      $.getJSON(url, function (json) {
         cover.find($(".imdb-score")).empty();
         cover.find($(".imdb-score")).append(json.Ratings[0].Value);
         cover.find($(".rotten-score")).empty();
         cover.find($(".rotten-score")).append(json.Ratings[1].Value);
         cover.find($(".film-time")).empty();
         cover.find($(".film-time")).append(json.Runtime);
         cover.find($(".film-age")).empty();
         cover.find($(".film-age")).append(json.Rated);
         cover.find($(".film-year")).empty();
         cover.find($(".film-year")).append(json.Year);
      });
  }, function() {
      $(this).removeClass("img-gradient");
      $(this).find($(".imdb-score")).empty();
      $(this).find($(".rotten-score")).empty();
      $(this).find($(".film-time")).empty();
      $(this).find($(".film-age")).empty();
      $(this).find($(".film-year")).empty();
  });

  filmCover.each(function(i, obj) {
      var video = $(this).find('video')
      var alt = $(this).find('img').attr('alt')
      var filmName = alt.replace(/:/g, ' ');
      $(this).find('source').attr('src', `./video/${filmName}/${filmName}-trailer.mp4`)
      video.get(0).load()
  });

  playMovieButton.mouseenter(function() {
      var alt = $(this).closest(filmCover).find('img').attr("alt");
          sessionStorage.setItem("filmAlt", alt);
  });


  playMovieButton.click(function(){
      window.open("video.html", "_self", "", false)
  })

  filmCover.mouseenter(function() {
      $(this).find("video").get(0).play();
  })

  filmCover.mouseleave(function() {
      $(this).find("video").get(0).pause();
  })

  unmuteButton.click(function(){
      var stats = $(this).closest(filmCover).find("video").get(0).muted;
      if ($(this).closest(filmCover).find("video").get(0).muted === true) {
          $(this).children("i").attr("class", "fa fa-volume-up")
          $(this).closest(filmCover).find("video").get(0).muted = false;
          console.log(stats)
      } else if ($(this).closest(filmCover).find("video").get(0).muted === false) {
          $(this).children("i").attr("class", "fa fa-volume-mute")
          $(this).closest(filmCover).find("video").get(0).muted = true;
          console.log(stats)
      }
  })
});
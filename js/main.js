var myNav = document.getElementById('nav')
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
        myNav.classList.add("header-color")
        myNav.classList.remove("header-transparent")
    } 
    else {
        myNav.classList.remove("header-color")
        myNav.classList.add("header-transparent")
    }
};


function menuDropdown(param) {
  if (param.matches) {
   document.getElementById("ulPill").style.display = "none"
   document.getElementById("ulDrop").classList.remove("invisible")
   document.getElementById("ulDrop").classList.add("visible")
  } else {
    document.getElementById("ulPill").style.display = "flex"
    document.getElementById("ulDrop").classList.remove("visible")
    document.getElementById("ulDrop").classList.add("invisible")
  }
}


var param = window.matchMedia("(max-width: 1500px)")
menuDropdown(param) // Call listener function at run time
param.addListener(menuDropdown) // Attach listener function on state changes


$(document).ready(function() {

  const filmCover = $(".film-cover .playMovieButton")

  filmCover.mouseenter(function() {
   var alt = $(this).closest("ul li").find('img').attr("alt");
    sessionStorage.setItem("filmAlt", alt);
  });

  
  $("#todosFilmes ul li").hover(function() {
    $(this).addClass("img-gradient");
  }, function() {
    $(this).removeClass("img-gradient");
  });


  $(".unmuteButton").click(function(){
    var stats = $(this).closest("ul li").find(".trailer").get(0).muted;
    if ($(this).closest("ul li").find(".trailer").get(0).muted === true) {
      $(this).children("i").attr("class", "fa fa-volume-up")
      $(this).closest("ul li").find(".trailer").get(0).muted = false;
      console.log(stats)
    } else if ($(this).closest("ul li").find(".trailer").get(0).muted === false) {
      $(this).children("i").attr("class", "fa fa-volume-mute")
      $(this).closest("ul li").find(".trailer").get(0).muted = true;
      console.log(stats)
    }
  })


  $('.film-cover').each(function(i, obj) {
    var video = $(this).find("video")
    var alt = $(this).find('img').attr('alt')
    var filmName = alt.replace(/:/g, ' ');
    $(this).find('source').attr('src', `./video/${filmName}/${filmName}-trailer.mp4`)
    video.get(0).load()
  });


  $(".film-cover").hover(function(e) {
    var alt = $(this).find('img').attr("alt");
    var url = "http://www.omdbapi.com/?apikey=11f1c376&t=" + alt;
    // $(".trailer").get(0).play();
    $.getJSON(url, function (json) {
      $(".imdb-score").append(json.Ratings[0].Value);
      $(".rotten-score").append(json.Ratings[1].Value);
      $(".film-time").append(json.Runtime);
      $(".film-age").append(json.Rated);
      $(".film-year").append(json.Year);
    });

  }, function() {
    // $(".trailer").get(0).pause();
    $(".imdb-score").empty();
    $(".rotten-score").empty();
    $(".film-time").empty();
    $(".film-age").empty();
    $(".film-year").empty();
  });

  $(".coverImg").each(function(i, obj) {
    var coverimg = $(this);
    var cover = $(this).attr("alt");
    var url2 = "http://www.omdbapi.com/?apikey=11f1c376&t=" + cover;
      $.getJSON(url2, function (json) {
          coverimg.attr("src", json.Poster); 
      })
  });

  $(".playMovieButton").click(function(){
    window.open("video.html", "_self", "", false)
  })
  
  $(".return").click(function(){
    window.open("index.html", "_self", "", false)
  })

});

$(window).on('load', function() {

  $(".film-cover").mouseenter(function() {
    $(this).find("video").get(0).play();
  })
  
  $(".film-cover").mouseleave(function() {
    $(this).find("video").get(0).pause();
  })    

})


  










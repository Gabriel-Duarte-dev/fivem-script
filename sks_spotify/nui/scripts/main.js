const BACKEND_URL = "https://sks_spotify/action";
const YOUTUBE_API_SEARCH =
  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBJC5Z63AFrohspF4MDfWcKALk5yVB_oLc&part=snippet&maxResults=10&q=";
const YOUTUBE_API_PLAYLIST =
  "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyBJC5Z63AFrohspF4MDfWcKALk5yVB_oLc&part=id,snippet&playlistId=";
const DEFAULT_PLAYLIST_ID = [
  "PLDRZlcOmNR1abj5la5tvIX_-dw0lbhodP",
  "PLiSzxQJ4pCKzj_rCvdJ5xRIzq02ROG5bh",
];
const DEFAULT_MUSIC_URL = "https://www.youtube.com/watch?v=";

document.addEventListener("DOMContentLoaded", function () {
  $("#main").hide();

  $(function () {
    $("#camera_clock").load("partials/cameraAndClock.html");
  });

  $("#pause").hide();
  $("#miniplayer_play").hide();
  document.onkeyup = function (data) {
    if (data.which == 27) {
      $.post(
        BACKEND_URL,
        JSON.stringify({
          action: "exit",
        })
      );
    }
  };

  const fixedRoute = "/sks_spotify/nui/";
  const { pathname } = window.location;

  if (pathname === fixedRoute + "index.html") {
    revokePlaylistCache();

    $(".slider").slick({
      infinite: false,
      slidesToShow: 1.5,
      prevArrow: $(".prev"),
      nextArrow: $(".next"),
    });

    $(".slider2").slick({
      infinite: false,
      slidesToShow: 1.5,
      prevArrow: $(".prev2"),
      nextArrow: $(".next2"),
    });
  } else if (pathname === fixedRoute + "searchPage.html") {
    const { search } = window.location;
    const query = new URLSearchParams(search).get("query");
    if (query) getSearchResult(query);
    else {
      const playlistId = new URLSearchParams(search).get("playlist");
      if (playlistId) getPlaylistById(playlistId);
    }
  }
});

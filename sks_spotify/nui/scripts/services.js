$("#shutdownbutton").click(function () {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "exit",
    })
  );
});

$("#volumedown").click(function () {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "volumedown",
    })
  );
});

$("#volumeup").click(function () {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "volumeup",
    })
  );
});

$("#play").click(function () {
  if (selectedMusic == playingNow) {
    playMusic();
  } else {
    initMusic(DEFAULT_MUSIC_URL + selectedMusic);
    playingNow = selectedMusic;
  }

  $(this).hide();
  $("#pause").show();
  $("#playButton--" + selectedMusic).hide();
  $("#pauseButton--" + selectedMusic).show();
});

$("#miniplayer_play").click(function (e) {
  e.stopPropagation();
  playMusic();

  $(this).hide();
  $("#miniplayer_pause").show();
});

$("#pause").click(function () {
  pauseMusic();

  $(this).hide();
  $("#play").show();
  $("#playButton--" + selectedMusic).show();
  $("#pauseButton--" + selectedMusic).hide();
});

$("#miniplayer_pause").click(function (e) {
  e.stopPropagation();
  pauseMusic();

  $(this).hide();
  $("#miniplayer_play").show();
});

$("#loop").click(function () {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "loop",
    })
  );
});

$("#back").click(function () {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "back",
    })
  );
});

$("#forward").click(function () {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "forward",
    })
  );
});

function getPlaylist(id, sliderClass) {
  $.get(YOUTUBE_API_PLAYLIST + id)
    .fail((error) => console.log(error))
    .done(({ items }) => {
      addSlides(items, sliderClass, id);
      const cacheName = sliderClass.endsWith("2")
        ? "default_playlist2"
        : "default_playlist1";
      localStorage.setItem(cacheName, JSON.stringify(items));
    });
}

function getPlaylistById(id) {
  $.get(YOUTUBE_API_PLAYLIST + id + "&maxResults=10")
    .fail((error) => console.log(error))
    .done(({ items }) => {
      $("#list_content").html("");
      items.map(({ snippet }) => {
        const videoId = snippet.resourceId.videoId;
        const title = snippet.title;
        const thumbnail = snippet.thumbnails.high.url;
        const author = snippet.videoOwnerChannelTitle;
        $("#list_content").append(ListItem(videoId, title, thumbnail, author));
      });
    });
}

// $("#inputok").click(function () {
//   let url = $("#linkinput").val();
//   $.post(
//     BACKEND_URL,
//     JSON.stringify({
//       action: "seturl",
//       link: url,
//     })
//   );
//   getNameFile(url);
//   $("#linkinput").val("");
// });

function initMusic(url) {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "seturl",
      link: url,
    })
  );

  playingNow - url.split("v=")[1];
}

function getSearchResult(search) {
  $.get(YOUTUBE_API_SEARCH + search)
    .fail((error) => console.log(error))
    .done(({ items }) => {
      $("#list_content").html("");
      items.map(({ id, snippet }) => {
        const videoId = id.videoId;
        const title = snippet.title;
        const thumbnail = snippet.thumbnails.high.url;
        const author = snippet.channelTitle;
        $("#list_content").append(ListItem(videoId, title, thumbnail, author));
      });
    });
}

function playMusic() {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "play",
    })
  );
}

function pauseMusic() {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "pause",
    })
  );
}

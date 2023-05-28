let vidname = "Name not Found";
let playingNow = null;
let selectedMusic = null;

window.addEventListener("message", function (event) {
  switch (event.data.action) {
    case "showRadio":
      $("#main").show();
      getPlayLists();
      showTime();
      break;
    case "hideRadio":
      $("#main").hide();
      break;
    case "changetextv":
      $("#volume_value").html(event.data.text);
      $("#volume_toast").animate({ right: "57px" });
      let timer = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        $("#volume_toast").animate({ right: "-57px" });
      }, 4000);
      break;
    case "changetextl":
      const status = event.data.text;
      $("loop").css(
        "background-color",
        status == "True" ? "#00b161a9" : "none"
      );
      break;
    case "changevidname":
      getNameFile(event.data.text);
      break;
    case "TimeVid":
      getTime(event.data.total, event.data.played);
      break;
  }
});

function getTime(totaltime, timeplayed) {
  if (totaltime != undefined && timeplayed != undefined) {
    if (secondsToHms(timeplayed) > secondsToHms(totaltime)) {
      timeplayed = timeplayed - 1;
    }
    $("#currentTime").html(secondsToHms(timeplayed));
    $("#totalTime").html(secondsToHms(totaltime));
    $("input[type=range]").attr("max", totaltime);
    $("input[type=range]").val(timeplayed);
  } else {
    $("#currentTime").html("0:00");
    $("#totalTime").html("0:00");
  }
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + ":" : "";
  var mDisplay = m > 0 ? m + ":" : "0:";
  var sDisplay = "00";
  if (s > 0) {
    sDisplay = s;
    if (s < 10) {
      sDisplay = "0" + s;
    }
  }
  return hDisplay + mDisplay + sDisplay;
}

function getNameFile(url) {
  if (url == undefined) {
    vidname = "NENHUMA MÚSICA ESTÁ TOCANDO";
    $("#testrec").html(
      "<marquee direction = 'left'> " + vidname + "</marquee>"
    );
  } else {
    $.getJSON(
      "https://noembed.com/embed?url=",
      { format: "json", url: url },
      function (data) {
        vidname = data.title;
        whenDone(url);
      }
    );
  }
}

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function whenDone(url) {
  if (vidname == undefined) {
    vidname = capitalize(GetFilename(url));
    if (vidname == "") {
      vidname = "MÚSICA NÃO SUPORTADA, TENTE OUTRA";
    }
  }
  $("#testrec").html("<marquee direction = 'left'> " + vidname + "</marquee>");
}

function GetFilename(url) {
  if (url) {
    var m = url.toString().match(/.*\/(.+?)\./);
    if (m && m.length > 1) {
      return m[1];
    }
  }
  return "";
}

var doispontos = false;

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var session = " AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = " PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  var time = h + ":" + m + session;
  if (!doispontos) {
    doispontos = true;
    time = h + " " + m + session;
  } else {
    doispontos = false;
  }
  $("#MyClockDisplay").text(time);
  if ($("#main").is(":visible")) {
    setTimeout(showTime, 1000);
  }
}

const slideHtml = (id, title, thumbnail, author) => {
  return `<li key="${id}" class="" title="${title}" onclick="showListeningMusic('${thumbnail}', ' ${title}', '${author}', '${id}')">
            <img src="${thumbnail}" alt="" draggable="false" />
            <span>${title}</span>
          </li>`;
};

function addSlides(items, sliderClass, playlistId) {
  setTimeout(() => {
    const addMoreButton = `<li class="">
                            <button onclick="redirectToCompletePlaylist('${playlistId}')">
                              <ion-icon name="add-circle-outline"></ion-icon>
                            </button>
                          <li>
                          `;

    items.map(({ id, snippet }) => {
      $("." + sliderClass).slick(
        "slickAdd",
        slideHtml(
          id,
          snippet.title,
          snippet.thumbnails.high.url,
          snippet.videoOwnerChannelTitle
        )
      );
    });
    $("." + sliderClass).slick("slickAdd", addMoreButton);
  }, 0);
}

function revokePlaylistCache() {
  const playlist1 = localStorage.getItem("default_playlist1");
  const playlist2 = localStorage.getItem("default_playlist2");

  if (playlist1) {
    const items = JSON.parse(playlist1);
    addSlides(items, "slider", DEFAULT_PLAYLIST_ID[0]);
  } else {
    getPlaylist(DEFAULT_PLAYLIST_ID[0], "slider");
  }

  if (playlist2) {
    const items = JSON.parse(playlist2);
    addSlides(items, "slider2", DEFAULT_PLAYLIST_ID[1]);
  } else {
    getPlaylist(DEFAULT_PLAYLIST_ID[1], "slider2");
  }
}

function showListeningMusic(thumbnail, title, author, id) {
  const url = DEFAULT_MUSIC_URL + id;
  $("#listening_music_container").css("display", "flex");
  $("#cover_img-music").attr("src", thumbnail);
  $("#listening_music_title").text(title);
  $("#listening_music_author").text(author);
  $("#miniplayer_play").hide();
  $("#miniplayer_pause").show();
  initMusic(url);
}

$("#listening_music_container").click(() => {
  const musicTitle = $("#listening_music_title").text();
  const musicAuthor = $("#listening_music_author").text();
  const musicBanner = $("#cover_img-music").attr("src");

  $("#wrapperContainer").css("overflow", "hidden");
  showMusicDetails(musicTitle, musicAuthor, musicBanner, "home_page");
});

function hideMusicDetails(pageToShow) {
  $("#music_page").animate({ top: "650px" });
  $("#" + pageToShow).css("visibility", "visible");
  $("#wrapperContainer").css("overflow-y", "auto");
  $("#header").show();
  $("#buttonBackToHome").show();
}

function showMusicDetails(
  musicTitle,
  musicAuthor,
  musicBanner,
  pageToHide,
  musicId
) {
  $("#" + pageToHide).css("visibility", "hidden");
  $("#testrec").html(
    "<marquee direction = 'left'> " + musicTitle + "</marquee>"
  );
  $("#playingBy").html(`Tocando música de <br/>${musicAuthor}`);
  $("#musicBanner").attr("src", musicBanner);
  $("#header").hide();
  $("#buttonBackToHome").hide();

  selectedMusic = musicId;
  if (
    $("#miniplayer_play").is(":visible") ||
    $("#playButton--" + musicId).is(":visible")
  ) {
    $("#play").show();
    $("#pause").hide();
  } else {
    $("#play").hide();
    $("#pause").show();
  }

  $("#music_page").animate({ top: "0" });
}

$("#inputok").click(function () {
  const search = $("#linkinput").val();
  if (search) {
    const param = encodeURIComponent(search);
    window.location.href = "searchPage.html?query=" + param;
  }
});

function redirectToCompletePlaylist(playlistId) {
  if (playlistId) {
    const param = encodeURIComponent(playlistId);
    window.location.href = "searchPage.html?playlist=" + param;
  }
}

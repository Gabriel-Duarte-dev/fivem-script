const ListItem = (id, title, thumbnail, author) => {
  return `<div
            id="musicItem-${id}"
            key="${id}"
            class="list_item"
            onclick="showMusicDetails('${title}', '${author}', '${thumbnail}', 'list_container', '${id}')"
          >
            <div class="item_infos">
              <img id="coverImgItem-${id}" src="${thumbnail}" alt="capa da música" class="cover_img_item" />
              <div class="item_titles">
                <span id="itemTitle-${id}" class="item_title">${title}</span>
                <span id="itemAuthor-${id}" class="item_author">${author}</span>
              </div>
            </div>
            <img
              id="playButton--${id}"
              src="assets/play.png"
              class="controll_button"
              alt=""
              onclick="onPlayAndPauseMusic(event, 'playButton--${id}', 'pauseButton--${id}')"
            />
            <img
              id="pauseButton--${id}"
              src="assets/pause.png"
              class="controll_button pause-button"
              alt=""
              onclick="onPlayAndPauseMusic(event, 'pauseButton--${id}', 'playButton--${id}')"
            />
          </div>`;
};

function onPlayAndPauseMusic(e, idToHide, idToShow) {
  e.stopPropagation();
  const musicId = idToHide.split("--")[1];
  if (idToHide.includes("pause")) {
    pauseMusic();
  } else if (playingNow == musicId) {
    playMusic();
  } else {
    playingNow = musicId;
    const url = DEFAULT_MUSIC_URL + musicId;
    initMusic(url);
  }

  $("#" + idToHide).hide();
  $("#" + idToShow).show();

  $(".pause-button").each((index, element) => {
    const id = $(element).attr("id");
    if ($(element).is(":visible") && id != idToShow) {
      $(element).hide();
      $("#playButton--" + id.split("--")[1]).show();
    }
  });
}

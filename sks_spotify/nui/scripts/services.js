const BACKEND_URL = "https://sks_spotify/action";

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
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "play",
    })
  );

  $(this).hide();
  $("#pause").show();
});

$("#pause").click(function () {
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "pause",
    })
  );

  $(this).hide();
  $("#play").show();
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

$("#inputok").click(function () {
  let url = $("#linkinput").val();
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "seturl",
      link: url,
    })
  );
  getNameFile(url);
  $("#linkinput").val("");
});

$(document).ready(() => {
  $.get(
    "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyBJC5Z63AFrohspF4MDfWcKALk5yVB_oLc&part=id,snippet&playlistId=PLDRZlcOmNR1abj5la5tvIX_-dw0lbhodP"
  )
    .fail(() => alert("Erro na req"))
    .done((data) => {
      data.items.forEach(({ snippet }) => {
        $(".slider").slick(
          "slickAdd",
          `<li class="" title="${snippet.title}">
            <img src="${snippet.thumbnails.medium.url}" alt="" draggable="false" />
            <span>${snippet.title}</span>
          </li>`
        );
      });
      $(".slider").slick(
        "slickAdd",
        `<li class="">
          <button>
            <ion-icon name="add-circle-outline"></ion-icon>
          </button>
         <li>
        `
      );
    });
});

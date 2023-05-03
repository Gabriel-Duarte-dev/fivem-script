const BACKEND_URL = "https://sks_spotify/action";
let showingToast = false;

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

var vidname = "Name not Found";

$("#inputok").click(function () {
  var url = document.getElementById("linkinput").value;
  $.post(
    BACKEND_URL,
    JSON.stringify({
      action: "seturl",
      link: url,
    })
  );
  getNameFile(url);
  document.getElementById("linkinput").value = "";
});

window.addEventListener("message", function (event) {
  switch (event.data.action) {
    case "showRadio":
      $("#main").show();
      showTime();
      break;
    case "hideRadio":
      $("#main").hide();
      break;
    case "changetextv":
      // document.getElementById("testrecv").innerHTML = event.data.text;
      $("#volue_value").html(event.data.text);
      $("#volume_toast").animate({ right: "57px" });
      const timer = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        $("#volume_toast").animate({ right: "-57px" });
        showingToast = false;
      }, 4000);
      break;
    case "changetextl":
      const status = event.data.text;
      $("testrecl").css(
        "background-color",
        status == "ATIVADO" ? "#00b161a9" : "none"
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
    document.getElementById("testtime").innerHTML = "0:00 / 0:00";
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
    document.getElementById("testrec").innerHTML =
      "<b>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</b><marquee direction = 'left'> " +
      vidname +
      "</marquee>";
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
  document.getElementById("testrec").innerHTML =
    "<b>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</b><marquee direction = 'left'> " +
    vidname +
    "</marquee>";
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
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  if ($("#main").is(":visible")) {
    setTimeout(showTime, 1000);
  }
}

$(document).ready(function () {
  $("#main").hide();
  $("#pause").hide();
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
});

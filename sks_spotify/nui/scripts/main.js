$(document).ready(function () {
  // $("#main").hide();

  $(function () {
    $("#camera_clock").load("partials/cameraAndClock.html");
  });

  $(".slider").slick({
    infinite: false,
    slidesToShow: 1.5,
  });

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

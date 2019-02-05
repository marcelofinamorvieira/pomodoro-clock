$(document).ready(function(){
  let currentValue;
  let timeLoop = false;
  let minutes;
  let seconds;
  let minStr;
  let secStr;
  $("#break-increment").click(function(){
    if (timeLoop == false) {
      currentValue = parseInt($("#break-length").text());
      if (currentValue < 60) {
        currentValue++
        $("#break-length").text(currentValue);
      }
    }
  });
  $("#break-decrement").click(function(){
    if (timeLoop == false) {
      currentValue = parseInt($("#break-length").text());
      if (currentValue > 1) {
        currentValue--;
        $("#break-length").text(currentValue);
      };
    };
  });
  $("#session-increment").click(function(){
    if (timeLoop == false) {
      currentValue = parseInt($("#session-length").text());
      if (currentValue < 60) {
        currentValue++;
        $("#session-length").text(currentValue);
        updateSessionLength();
      };
    };
  });
  $("#session-decrement").click(function(){
    if (timeLoop == false) {
      currentValue = parseInt($("#session-length").text());
      if (currentValue > 1) {
        currentValue--;
        $("#session-length").text(currentValue);
        updateSessionLength();
      };
    };
  });
  $("#start_stop").click(function(){
    if (timeLoop == false) {
      startTimer();
    } else {
      clearInterval(timeLoop);
      timeLoop = false;
      $("#pause").addClass("hidden");
      $("#start_stop").removeClass("hidden");
    }
    
  });
  $("#reset").click(function(){
    resetAll();
  });
  function updateSessionLength() {
    if ($("#session-length").text().length < 2) {
      $("#time-left").text("0" + $("#session-length").text() + ":00");
    } else {
      $("#time-left").text($("#session-length").text() + ":00");
    }
  };
  function updateBreakLength() {
    if ($("#break-length").text().length < 2) {
      $("#time-left").text("0" + $("#break-length").text() + ":00");
    } else {
      $("#time-left").text($("#break-length").text() + ":00");
    }
  };
  function startTimer() {
    minutes = parseInt($("#time-left").text().split(":")[0]);
    seconds = parseInt($("#time-left").text().split(":")[1]);
    timeLoop = setInterval(function(){
      if (minutes == 0 && seconds == 0) {
        if ($("#timer-label").text() == "Session") {
          $("#beep")[0].play();
          $("#timer-label").text("Break");
          updateBreakLength();
          minutes = parseInt($("#break-length").text());
        } else {
          $("#beep")[0].play();
          $("#timer-label").text("Session");
          updateSessionLength();
          minutes = parseInt($("#session-length").text());
        }
      } else if (seconds == 0 && minutes > 0) {
          minutes--;
          seconds = 59;
          displayOnClock();
      } else {
        seconds--;
        displayOnClock();
      };
    }, 1000);
  };
  function displayOnClock() {
    if (minutes.toString().length < 2) {
      minStr = "0" + minutes;
    } else {
      minStr = minutes;
    }
    if (seconds.toString().length < 2) {
      secStr = "0" + seconds;
    } else {
      secStr = seconds;
    }
    $("#time-left").text(minStr + ":" + secStr);
  };
  function resetAll() {
    $("#beep")[0].pause();
    $("#beep")[0].currentTime = 0;
    clearInterval(timeLoop);
    timeLoop = false;
    $("#break-length").text("5");
    $("#session-length").text("25");
    $("#timer-label").text("Session");
    updateSessionLength();
  };
});
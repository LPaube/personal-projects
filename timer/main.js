
// Stopwatch
function toolStopWatch() {
    // Variables
    var milliseconds = 0;
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var millisecondsDisplayed = milliseconds;
    var secondsDisplayed = seconds;
    var minutesDisplayed = minutes;
    var hoursDisplayed = hours;

    var startButton = document.getElementById("start-stopwatch");
    var timeDisplay = document.getElementById("num-stopwatch");

    var status = "stopped";
    var timeDisplayed = "00:00:00:00";
    var timerInterval;

    timeDisplay.innerHTML = timeDisplayed;

    // Starting/stopping the stopwatch
    function stopWatch() {
        milliseconds++;
        if (milliseconds >= 100) {
            seconds++;
            milliseconds = 0;
        }
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes >= 60) {
            hours++;
            minutes = 0;
        }
        displayTime();
    }
    // Displaying time
    function displayTime() {
        if (milliseconds < 10) {
            millisecondsDisplayed = "0" + milliseconds.toString();
        } else {
            millisecondsDisplayed = milliseconds.toString();
        }
        if (seconds < 10) {
            secondsDisplayed = "0" + seconds.toString();
        } else {
            secondsDisplayed = seconds.toString();
        }
        if (minutes < 10) {
            minutesDisplayed = "0" + minutes.toString();
        } else {
            minutesDisplayed = minutes.toString();
        }
        if (hours < 10) {
            hoursDisplayed = "0" + hours.toString();
        } else {
            hoursDisplayed = hours.toString();
        }
        timeDisplayed = hoursDisplayed + ":" + minutesDisplayed + ":" + secondsDisplayed + ":" + millisecondsDisplayed;
        timeDisplay.innerHTML = timeDisplayed;
    }
    // Start/Stop button
    function startStop() {
        if (status === "stopped") {
            startButton.innerHTML = "STOP";
            startButton.classList.add("stop-stopwatch");
            timerInterval = setInterval(stopWatch, 10);
            status = "started";
        } else if (status === "started") {
            startButton.innerHTML = "START";
            startButton.classList.remove("stop-stopwatch");
            clearInterval(timerInterval);
            displayTime();
            status = "stopped";
        }
    }
    // Reset button
    function reset() {
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        console.log("reseting");
        displayTime();
    }

    // Event listeners
    startButton.addEventListener("click", startStop);
    document.getElementById("reset-stopwatch").addEventListener("click", reset);
}

// Timer
function toolTimer() {
    // Variables
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;

    var hoursDisplayed = 0;
    var minutesDisplayed = 0;
    var secondsDisplayed = 0;
    var millisecondsDisplayed = 0;

    var status = "stopped";
    var timerInterval;

    var startButton = document.getElementById("start-timer");
    var resetButton = document.getElementById("reset-timer");
    var hoursNum = document.getElementById("hours-input"); 
    var minutesNum = document.getElementById("minutes-input"); 
    var secondsNum = document.getElementById("seconds-input"); 
    var numTimer = document.getElementById("num-timer");

    function startStop() {
        if (status === "stopped") {
            startButton.innerHTML = "STOP";
            timerInterval = setInterval(timer, 10);
            status = "started";
        } else if (status === "started") {
            startButton.innerHTML = "START";
            clearInterval(timerInterval);
            displayTime();
            status = "stopped";
        }
    }

    function timerSet() {
        hours = hoursNum.value;
        minutes = minutesNum.value;
        seconds = secondsNum.value;
        milliseconds = 0;

        if (hours == "") {
            hours = 0;
        }
        if (minutes == "") {
            minutes = 0;
        }
        if (seconds == "") {
            seconds = 0;
        }
        displayTime();
    }

    function timer() {
        if (milliseconds > 0 || seconds > 0 || minutes > 0 || hours > 0) {
            if (seconds > -1 && milliseconds <= -1) {
                milliseconds = 99;
                seconds--;
            }
            if (minutes > -1 && seconds <= -1) {
                seconds = 59;
                minutes--;
            }
            if (hours > -1 && minutes <= -1) {
                minutes = 59;
                hours--;
            }
            
            milliseconds--;
            displayTime();
        }
    }

    function displayTime() {
        if (milliseconds < 10) {
            millisecondsDisplayed = "0" + milliseconds.toString();
        } else {
            millisecondsDisplayed = milliseconds.toString();
        }
        if (seconds < 10) {
            secondsDisplayed = "0" + seconds.toString();
        } else {
            secondsDisplayed = seconds.toString();
        }
        if (minutes < 10) {
            minutesDisplayed = "0" + minutes.toString();
        } else {
            minutesDisplayed = minutes.toString();
        }
        if (hours < 10) {
            hoursDisplayed = "0" + hours.toString();
        } else {
            hoursDisplayed = hours.toString();
        }
        timeDisplayed = hoursDisplayed + ":" + minutesDisplayed + ":" + secondsDisplayed // + ":" + millisecondsDisplayed;
        numTimer.innerHTML = timeDisplayed;
    }

    // Event listeners
    startButton.addEventListener("click", function() {
        startStop();
        console.log("hours:", hoursNum.value, " minutes:", minutesNum.value, " seconds:", secondsNum.value);
    });
    resetButton.addEventListener("click", timerSet);
}

// Clock function
function toolClock() {
    var timeDisplayed;
    var milState = "regular";

    setInterval(clock, 10);

    function clock() {
        var date = new Date();
        timeDisplayed = date.toLocaleTimeString();
        
        // Setting military time
        function militaryClock() {
            const splitTime = timeDisplayed.split(":");
            var militaryDisplay = "";
            if (splitTime[splitTime.length - 1].split(" ")[1] == "AM") {
                if (parseInt(splitTime[0]) < 10) {
                    militaryDisplay = "0" + splitTime[0] + ":" + splitTime[1] + ":" + splitTime[2].split(" ")[0];
                } else if (parseInt(splitTime[0]) <= 10) {
                    militaryDisplay = splitTime[0] + ":" + splitTime[1] + ":" + splitTime[2].split(" ")[0];
                }
            } else {
                militaryDisplay = (parseInt(splitTime[0]) + 12) + ":" + splitTime[1] + ":" + splitTime[2].split(" ")[0];
            }
            document.getElementById("num-clock").innerHTML = militaryDisplay;
        }

        if (milState === "regular") {
            document.getElementById("num-clock").innerHTML = timeDisplayed;
        } else if (milState === "military") {
           militaryClock();
        }
    }
    clock();

    // Clock - event listeners
    document.getElementById("12-hour").addEventListener("click", function() {
        milState = "regular";
    });
    document.getElementById("24-hour").addEventListener("click", function() {
        milState = "military";
    });
}

// Functions performed when nav clicked (show/hide)
function clickStopWatch() {
    document.getElementById("controls-stopwatch").style.display = "flex";
    document.getElementById("time-stopwatch").style.display = "flex";
    document.getElementById("controls-timer").style.display = "none";
    document.getElementById("time-timer").style.display = "none";
    document.getElementById("time-clock").style.display = "none";
    document.getElementById("controls-clock").style.display = "none";

}

function clickTimer() {
    document.getElementById("controls-stopwatch").style.display = "none";
    document.getElementById("time-stopwatch").style.display = "none";
    document.getElementById("controls-timer").style.display = "flex";
    document.getElementById("time-timer").style.display = "flex";
    document.getElementById("time-clock").style.display = "none";
    document.getElementById("controls-clock").style.display = "none";

}

function clickClock() {
    document.getElementById("controls-stopwatch").style.display = "none";
    document.getElementById("time-stopwatch").style.display = "none";
    document.getElementById("controls-timer").style.display = "none";
    document.getElementById("time-timer").style.display = "none";
    document.getElementById("time-clock").style.display = "flex";
    document.getElementById("controls-clock").style.display = "flex";
}

function startingState() {
    clickStopWatch();
    toolStopWatch();
    toolTimer();
    toolClock();
}

// Function calls
startingState();

document.getElementById("nav-stopwatch").addEventListener("click", clickStopWatch);
document.getElementById("nav-timer").addEventListener("click", clickTimer);
document.getElementById("nav-clock").addEventListener("click", clickClock);
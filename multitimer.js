const updateRate = 1000; // in ms
let timers = [];
let timerCounter = 0;
let alertDuration = 7000;
const alertAudio = new Audio("alert.wav");
const pastelColorPalette = ["#ffb3ba", "#ffdfba" ,"#ffffba" ,"#baffc9" ,"#bae1ff"]

// str_pad_left used for minutes and seconds display
function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function formatTimeLeft(timeLeftRaw) {
    let timeLeftMinutes = Math.floor(timeLeftRaw / 60);
    let timeLeftSeconds = timeLeftRaw - (timeLeftMinutes * 60);
    return str_pad_left(timeLeftMinutes, "0", 2)+':'+str_pad_left(timeLeftSeconds, "0", 2);
}

function addTimer(seconds) {
    timerCounter++;
    pastelColorIndex = (timerCounter % pastelColorPalette.length + pastelColorPalette.length) % pastelColorPalette.length;
    console.log(`Adding timer number ${timerCounter}, assigning color number ${pastelColorIndex} which is ${pastelColorPalette[pastelColorIndex]}.`);
    let newTimer = {
        timeTotal: seconds,
        timeLeft: seconds,
        color: pastelColorPalette[pastelColorIndex],
        name: `timer${timerCounter}`
    };
    timers.push(newTimer);
    let timerDiv = document.createElement("div");
    timerDiv.className = "timer";
    timerDiv.id = newTimer.name;
    timerDiv.innerHTML = formatTimeLeft(newTimer.timeLeft);
    timerDiv.style.backgroundColor = newTimer.color;
    document.getElementById("timers").appendChild(timerDiv);
}

function update() {
    timers.forEach(function (timer, index) {
        console.log(index, timer);
        // Counting down
        if (timer.timeLeft > 0) {
            // Only subtract time if there is any left - necessary because it is displayed for a while longer during the alerting phase.
            timer.timeLeft--;
            document.getElementById(timer.name).innerHTML = formatTimeLeft(timer.timeLeft);
        // Reaching 0
        }else if (timer.timeLeft == 0) {
            alertTimer(timer);
            timer.timeLeft--; // Last time we subtract to set it to -1 and "disable" it.
        // Alerting
        } else if (timer.timeLeft == -1) {
            console.log(`Alerting ongoing for ${timer.name}.`)
        }
    });
}

function alertTimer(timer) {
    console.log(`Timer ${timer.name} is done. Alerting.`);
    alertAudio.play();
    setTimeout(function() { removeTimer(timer) }, alertDuration);
    $(`#${timer.name}`).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).delay(400).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).delay(400).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).delay(400).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).delay(400);
}

function removeTimer(timer) {
    console.log(`Removing timer ${timer.name}.`);
    timers = timers.filter(timerItem => timerItem.name != timer.name);
    // We could remove the timer div here, but we can leave it at 0 too.
    $(`#${timer.name}`).css("background-color", "#999999")
}

function start() {
    setInterval(update, updateRate);
}
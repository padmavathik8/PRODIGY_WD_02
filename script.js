let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const displayElement = document.getElementById('display');
const lapsElement = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function timeToString(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function print(text) {
    displayElement.innerHTML = text;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton('PAUSE');
}

function pause() {
    clearInterval(timerInterval);
    showButton('START');
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    lapsElement.innerHTML = '';
    showButton('START');
}

function lap() {
    let lapTime = timeToString(elapsedTime);
    let lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsElement.appendChild(lapItem);
}

function showButton(buttonKey) {
    if (buttonKey === 'START') {
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    } else {
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
pauseButton.style.display = 'none';


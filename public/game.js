console.log('Js is running!');

const startBtn = document.getElementById('start');
const gameArea = document.getElementById('gameArea');
const sprites = document.querySelectorAll('.sprite');
const startingMinutes=0.5;
let time = startingMinutes*60;
let timerInterval;
const countDown = document.getElementById("countDown");

//start button (load game area and sprites)
startBtn.addEventListener('click', () => {
    gameArea.style.display = "block";
    countDown.style.display = "block";

    if (!timerInterval){
        timerInterval = setInterval(updateCountDown,1000);
    }
});

function updateCountDown() {
    let seconds = time % 60;

    if (time<0){
        time=0;
        clearInterval;
    } else if (time>0){
        time--;
    }

    seconds = seconds < 10 ? `0${seconds}`:seconds;

    countDown.innerHTML = `00:${seconds}`;
}
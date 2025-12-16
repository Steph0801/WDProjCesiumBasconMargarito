//test
const startingMinutes=0.5;
let time = startingMinutes*60;

const countDown = document.getElementById("countDown");

setInterval(updateCountDown,1000);

function updateCountDown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    if (time<0){
        time=0;
    } else if (time>0){
        time--;
    }

    seconds = seconds < 10 ? `0${seconds}`:seconds;

    countDown.innerHTML = `00:${seconds}`;
}
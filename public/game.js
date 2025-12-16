console.log('Js is running!');

const orders = [
  {name: "Cheese Pizza", toppings: ["cheese"]},
  {name: "Pepperoni Pizza", toppings: ["cheese","pepperoni"]},
  {name: "Hawaiian Pizza", toppings: ["cheese","ham","pineapple"]},
  {name: "Vegan Pizza", toppings: ["cheese","mushrooms","olives","onions","pepper"]},
]

let order = null;
let topping = [];

const startBtn = document.getElementById('start');
const gameArea = document.getElementById('gameArea');
const orderShow = document.getElementById('order');
const serveBtn = document.getElementById('serve');
const scoreShow = document.getElementById('score');
const lbBtn = document.getElementById('leaderboard');

const startingMinutes=0.5;

let time = startingMinutes*60;
let timerInterval;

const countDown = document.getElementById('countDown');

//start (load game area and sprites)
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none"; //hide start button
    gameArea.style.display = "block";
    countDown.style.display = "block";
    serveBtn.style.display = "block";
    
    const i = Math.floor(Math.random() * orders.length);
    order = orders[i]; //shows the first order

    orderShow.textContent = "Order: " + order.name;

    if (!timerInterval){
        timerInterval = setInterval(updateCountDown,1000);
    }
});

//timer
function updateCountDown() {
    let seconds = time % 60;

    if (time<0){
        time=0;
        clearInterval(timerInterval);
        timerInterval = null;

        countDown.innerHTML = "00:00";

        gameRunning = false; // stop dragging
        serveBtn.disabled = true; //stop serving
        gameArea.style.display = "none"; //stop displaying game interface
        alert("Time's up!");
        return;
    } else if (time>0){
        time--;
    }

    seconds = seconds < 10 ? `0${seconds}`:seconds;

    countDown.innerHTML = `00:${seconds}`;
}

const sprites = document.querySelectorAll('.sprite');
let current = null;
let offsetX = 0;
let offsetY = 0;

sprites.forEach(sprite => {
    sprite.addEventListener('mousedown', e => {
        current = sprite;
        offsetX = e.offsetX;
        offsetY = e.offsetY;

        current.style.zIndex = 1000; //put on top of everything (aesthetics)
    });
});

document.addEventListener('mousemove', e => {
    if (!current) return;
    //sprite don't jump TT
    current.style.left = (e.pageX - gameArea.offsetLeft - offsetX) + "px";
    current.style.top = (e.pageY - gameArea.offsetTop - offsetY) + "px";
});

document.addEventListener('mouseup', () => {
    if (!current) return;

    current.style.left = "2vw"; //snap in place x-value
    current.style.top = "25vw"; //snap in place y-value

    // add to topping if not already added
    if (!topping.includes(current.id)) {
        topping.push(current.id);
        console.log("Added topping:", current.id);
    }

    current.style.zIndex = ""; //reset layer

    current = null;
});

let totalScore=0;

async function saveScore() {
  const nameInput = document.getElementById("nameId");
  const playerName = nameInput.value || "Anonymous";

  try {
    await addDoc(collection(database, "leaderboard"), {
      name: playerName,
      score: totalScore,
      createdAt: Date.now()
    });
    console.log("Score saved");
  } catch (e) {
    console.error("Error saving score", e);
  }
}

//serve button trigger when clicked
serveBtn.addEventListener('click', () => {
  if (!order) return;

  //scoring
  let score = 0;
  const added = new Set(topping);

  order.toppings.forEach(t => {
  if (added.has(t)) score++;
  });

  added.forEach(t => {
    if (!order.toppings.includes(t)) score--;
  });

  //accumulating score
  totalScore+=score;
  scoreShow.textContent = `Score: ${totalScore}`;

 //reset
  topping = [];
  order = null;
  orderShow.textContent = "";

  sprites.forEach(sprite => {
    sprite.style.left = "";
    sprite.style.top = "";
  });

  //continues to show order until time's up
  if (time > 0) {
    const i = Math.floor(Math.random() * orders.length);
    order = orders[i];
    orderShow.textContent = "Order: " + order.name;
  } else {
    //end game time's up
    order = null;
    orderShow.textContent = "";
    gameArea.style.display = "none";
    serveBtn.disabled = true;
    serveBtn.style.display = "none";
    lbBtn.style.display = "block";
    countDown.style.display = "none";
    
    alert("Time's up!");
    saveScore();
    }
});
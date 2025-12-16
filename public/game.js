console.log('Js is running!'); //debugging

//set toppings to corresponding orders
const orders = [
  {name: "Cheese Pizza", toppings: ["cheese"]},
  {name: "Pepperoni Pizza", toppings: ["cheese","pepperoni"]},
  {name: "Hawaiian Pizza", toppings: ["cheese","ham","pineapple"]},
  {name: "Vegan Pizza", toppings: ["cheese","mushrooms","olives","onions","pepper"]},
]

//set order/s and toppings to 'nothing' so it won't bug
let order = null;
let topping = [];

//get necessary buttons or displays
const startBtn = document.getElementById('start');
const gameArea = document.getElementById('gameArea');
const orderShow = document.getElementById('order');
const serveBtn = document.getElementById('serve');
const scoreShow = document.getElementById('score');
const lbBtn = document.getElementById('leaderboard');

//for the timer
const startingMinutes=0.5; //1 minute divided by 2

let time = startingMinutes*60; //converts into seconds
let timerInterval;

const countDown = document.getElementById('countDown');

//start (load game area and sprites)
startBtn.addEventListener('click', () => {
    //hide or show after starting
    startBtn.style.display = "none";
    gameArea.style.display = "block";
    countDown.style.display = "block";
    serveBtn.style.display = "block";
    
    const i = Math.floor(Math.random() * orders.length); //randomizes the orders
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

        //when timer runs out
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

//cursor
let offsetX = 0;
let offsetY = 0;

sprites.forEach(sprite => {
    sprite.addEventListener('mousedown', e => {

        //set current dragged sprite
        //update cursor
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

    //snap topping on the pizza base
    current.style.left = "2vw";
    current.style.top = "25vw";

    //add to topping if not yet added => needed to cross-check w/array 'orders'
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
  const playerName = nameInput.value || "Anonymous"; //stores either inputted value or 'Anonymous' if none

  try {
    await addDoc(collection(database, "leaderboard"), {
      name: playerName,
      score: totalScore,
      createdAt: Date.now()
    });
    console.log("Score saved"); //debugging
  } catch (e) {
    console.error("Error saving score", e); //debugging
  }
}

//serve button trigger when clicked
serveBtn.addEventListener('click', () => {
  if (!order) return;

  //scoring
  let score = 0;
  const added = new Set(topping); //avoid duplicates

  //adds point/s if correct topping
  order.toppings.forEach(t => {
  if (added.has(t)) score++;
  });

  //subtracts point/s if wrong topping
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

  //reset topping position
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
    
    //hide or show after time's up
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
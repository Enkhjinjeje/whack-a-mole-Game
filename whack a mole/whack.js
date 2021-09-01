// makeing var called squares with class square
let squares = document.querySelectorAll(".square");
// makeing var called scoreboard with id class
let scoreBoard = document.querySelector("#score");
// makeing var called timeboard with id class
let timeboard = document.querySelector("#time");
const messageBoard = document.querySelector("#message");
let finishPoint = document.querySelector("#finishScore");
// createing lastSquare with let
let lastSquare = squares;
// createing timeUp with let and calling it false
let timeUp = false;
// creating score with let and value is 0
let score = 0;
// creating timeLeft and value 30
let timeLeft = 30;
let restartButton = document.querySelector("#restartButton");
//creating a function called downloadTimer which is looping interval every 1 sec 
function downloadTimer() {
  const interval = setInterval(() => {
    // if timeleft is same or lower than 0 its clearing-interval
    if (timeLeft <= 0) {
      clearInterval(interval);
    } else {
      timeboard.innerHTML = timeLeft;
    }

    // else  its connected to time board and uses innerHTML and is -=1 with timeLeft wich is -1 every time the function runs
    timeLeft -= 1;
  }, 1000);
}
// creating function called randomNumber 
function randomNumber() {
  // inside randomNumber its getting random number with math.floor and math.random wich is giveing random number betwenn 0 to 17
  const number = Math.floor(Math.random() * 17);
  return number;
}

// creating funtion named randomTime with min and max math round is creating full number with random and is * (max - min)+ mid)
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
// window.onload is when the window loads running function startGame
window.onload = startgame();
// creating a function named randomHole with holes
function randomHoles(holes) {
  // inside randomHole its getting randomNumber = index and its makeing square = square[index]
  const index = randomNumber();
  const square = squares[index];
  // if the square = lastSquare its returning randomHole
  if (square === lastSquare) {
    return randomHoles(holes);
  }
  //  lastSquare is equale to square and returning square
  lastSquare = square;

  return square;
}
restartButton.addEventListener("click", () => {
  messageBoard.classList.remove("show");
  startgame();
});
// creating a function named startGame
function startgame() {
  // inside startGame timeUp = false and scoreboard is = 0 score=0 and running peep seting setTimeout wich is runing timeUP with 30000
  timeLeft = 30;
  timeUp = false;
  scoreBoard.textContent = 0;
  score = 0;
  downloadTimer();
  peep();
  setTimeout(() => (timeUp = true), 30000);
}
// creating function named peep with randomTime first is min and second is max and getting randomholes and adding astro
function peep() {
  const time = randomTime(3000, 2000);
  const hole = randomHoles(squares);
  // with setTimeout hole.classlist its removes astro with time
  hole.classList.add("astro");
  setTimeout(() => {
    hole.classList.remove("astro");
    // if !timeup run peep
    if (!timeUp) {
      peep();
      // else we are done
    } else {
      messageBoard.classList.add("show");
      finishPoint.textContent = score;
    }
  }, time);
}

// creating function named destroy wich is event
function destroy(event) {
  // if the event isTrusted return
  if (!event.isTrusted) {
    return;
  }

  // if the event target contains astro run event target remove astro and add score ++
  if (event.target.classList.contains("astro")) {
    event.target.classList.remove("astro");
    score++;
    scoreBoard.textContent = score;
    finishPoint.textContent = score;
    event.target.classList.add('explosion')
    setTimeout(() => {
      event.target.classList.remove('explosion')
    }, 500);
  }
}
squares.forEach((squares) => {
  // squares square clicked destroy it
  squares.addEventListener("click", destroy);
});
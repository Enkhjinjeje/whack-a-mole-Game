// this makes a var squares and selceted class square. 
const squares = document.querySelectorAll(".square");
// seting up lastSquare
let lastSquare;
// seting up timeUp
let timeUp = false;
// seting up score
let score = 0;
// this function is makeing random number less or equale than with math.floor . and with ()*17 meaning random number betwenn 0 and 17
function randomNumber() {
  const number = Math.floor(Math.random() * 17);
  return number;
}
// this function is getting 
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
// this is creating  astro and gettting the random number
function randonHole(holes) {
  const index = randomNumber();
  const square = squares[index];

// 
  if (square === lastSquare) {
    return randonHole(holes);
  }

  lastSquare = square;

  return square;
}
// this function is makeing the game start and useing timeUp to say if it passes 150000 the game will timeOut 
function startGame() {
  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), 150000);
}
// this finction is getting the random number and giveing it the astro class and showing it on the square.
// and saying if the astro is not clicked in 500 it will get new astro in a random place
function peep() {
  const time = randomTime(500, 1000);
  const hole = randonHole(squares);
  hole.classList.add("astro");
  setTimeout(() => {
    hole.classList.remove("astro");
    if (!timeUp) {
      peep();
    }
  }, time);
}
// this is gettting square var and giveing it eventlisteer if the astro is clicked use event destroy and returns
squares.forEach((square) => {
  square.addEventListener("click", destroy);
});
// this function is makeing event destroy and if the astro is targeted return the function
function destroy(event) {
  if (!event.isTrusted) return;
  event.target.classList.remove("astro");
  score++;
}
console.log(score);

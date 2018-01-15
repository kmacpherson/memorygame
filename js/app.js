// define cards here, repeated twice to get 16 elements
let cards = ["dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider", "dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider"];
// For tracking moves
let moves = 0;
// Get the list of cards in memory.
let dispCards = document.getElementsByClassName("card");
// success revelations;
let goodMatches = 0;
// Kepp track of clicked elements.
let clickedElements = [];
// Time tracking.
let timeEllapsed = 0;
// Time for game.
let gameTimer;
// Guess timer
let guessTimer;
// keep the element with the tries to be displayed.
let tries = document.getElementById("tries");
// timer delay
let timerDelay = 1000;
// for tracking of stars limit of the game.
let gameStars = document.getElementById("stars");
// for tracking of time ellapsed.
let timeElement = document.getElementById("time");
// tracking the win message.
let winBoard = document.getElementById("winArea");
// Tracking game board.
let gameBoard = document.querySelector('#gameArea');
// Tracking game board.
let infoPane = document.querySelector('#infoPane');

// Shuffle the cards to randomize them. Found on Stackoverflow
let shuffleCards = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Puts text elements in place. Makes it easy to cheat but will have to figure this out after.
let placeText = function (array) {
  for ( let i = 0; i < array.length; i++) {
    let textElement = dispCards[i].firstChild;
    textElement.textContent = array[i];
    if (!textElement.classList.contains("hidden")) {
      textElement.classList.toggle("hidden");
    }
  }
};

// Checks to see if it is a match.
let isMatch = function () {
  tries.textContent = ++moves;
  updateStars();
  let first = clickedElements.pop();
  let second = clickedElements.pop();
  if (first.textContent === second.textContent) {
    goodMatches++;
    checkWin();
    clearTimeout(guessTimer); // Makes game faster.
  } else {
    first.classList.toggle("hidden");
    second.classList.toggle("hidden");
  }
};

// Function for checking for a win.
let checkWin = function() {
  if (goodMatches === 8 ) {
    // A win.
    clearInterval(gameTimer);
    gameBoard.classList.toggle("hidden");
    winBoard.classList.toggle("hidden");
    infoPane.classList.toggle("hidden");
    let winTries = document.getElementById("winTries");
    let winTime = document.getElementById("winTime");
    let winStars = document.getElementById("winStars");
    winTries.textContent = moves;
    winTime.textContent = timeElement.textContent;
    winStars.textContent = gameStars.textContent
  }
};

// Update the stars for the game. Can be modified for increasing or decreasing difficulty.
let updateStars = function () {
  let twoStars = 12;
  let oneStar = 20;
  if ( moves === twoStars ) {
    gameStars.textContent = "* *";
  } else if ( moves === oneStar ) {
    gameStars.textContent = "*";
  }
};

// Update the time.
let updateTime = function () {
  if (timeEllapsed != 0) {
    timeElement.textContent = (new Date() - timeEllapsed) / 1000;
  }
};

// setup for the game for eventListeners.
let setupGame = function () {
  moves = 0;
  clickedElements = [];
  timeEllapsed = 0;
  goodMatches = 0;
  tries.textContent = moves;
  gameStars.textContent = "* * *";
  timeElement.textContent = "0";
  shuffleCards(cards);
  placeText(cards);
  for (let i = 0; i < dispCards.length; i++ ) {
    dispCards[i].addEventListener('click', clickCard);
  };
  gameTimer = setInterval(updateTime, 1000);
  let winButton = document.getElementsByClassName('winButton');
  for (let i = 0; i < winButton.length; i++ ) {
    winButton[i].addEventListener('click', resetGame);
  };

};

let resetGame = function () {
  if (goodMatches === 8) {
    winBoard.classList.toggle("hidden");
    gameBoard.classList.toggle("hidden");
    infoPane.classList.toggle("hidden");
  }
  moves = 0;
  clickedElements = [];
  timeEllapsed = 0;
  goodMatches = 0;
  tries.textContent = moves;
  gameStars.textContent = "* * *";
  timeElement.textContent = "0";
  shuffleCards(cards);
  placeText(cards);
  gameTimer = setInterval(updateTime, 1000);

};

// Function for click event.
let clickCard = function (evt) {
  let textElement = evt.target.firstChild;
  if (timeEllapsed === 0) {
    timeEllapsed = new Date();
  }
  if (textElement.classList.contains("hidden") && clickedElements.length < 2) {
    textElement.classList.toggle("hidden");
    clickedElements.push(textElement);
    if (clickedElements.length === 2) {
      guessTimer = setTimeout(isMatch, timerDelay);
    }
  }
};

setupGame();

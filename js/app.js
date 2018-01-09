// define cards here, repeated twice to get 16 elements
let cards = ["dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider", "dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider"];
// For tracking moves
let moves = 0;
// For tracking clicks.
let clicks = 0;
// For keeping track if the first click target.
let firstClick = null;
// keeping track of IDs
let firstId, eventId = 0;
// Get the list of cards in memory.
let dispCards = document.getElementsByClassName("card");
// success revelations;
let goodMatches = 0;
// keep the element with the tries to be displayed.
let tries = document.getElementById("tries");
// Kepp track of clicked elements.
let clickedElements = [];

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
  }
}

// Checks to see if it is a match.
let isMatch = function () {
  tries.textContent = ++moves;
  let first = clickedElements.pop();
  let second = clickedElements.pop();
  if (first.textContent === second.textContent) {
    goodMatches++;
    checkWin();
  } else {
    first.classList.toggle("hidden");
    second.classList.toggle("hidden");
  }
};

// Function for checking for a win.
let checkWin = function() {
  if (goodMatches === 8 ) {
    // A win.
    removeBoard();
    displayWin();
  }
};

//Remove the game board.
let removeBoard = function () {
  let gameBoard = document.querySelector('#gameArea');
  gameBoard.remove();
}

//Create the Win screen.
let displayWin = function () {
  let tempDisplay = document.createDocumentFragment();
  let winTitle = document.createElement('h1');
  winTitle.classList.add("tigersBlood");
  winTitle.textContent = "You've won";
  tempDisplay.append(winTitle);
  document.body.append(tempDisplay);
}

// Function for click event.
let clickCard = function (evt) {
  let textElement = evt.target.firstChild;
  if (textElement.classList.contains("hidden") && clickedElements.length < 2) {
    textElement.classList.toggle("hidden");
    clickedElements.push(textElement);
    if (clickedElements.length === 2) {
      setTimeout(isMatch, 1000);
    }
  }
};

shuffleCards(cards);
placeText(cards);
tries.textContent = moves;
for (let i = 0; i < dispCards.length; i++ ) {
  dispCards[i].addEventListener('click', clickCard);
};

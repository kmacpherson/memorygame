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
let dispCards = document.querySelectorAll(".card");
// success revelations;
let goodMatches = [];
// keep the element with the tries to be displayed.
let tries = document.querySelector("#tries");

// Shuffle the cards to randomize them. Found on Stackoverflow
let shuffleCards = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Function for checking for a win.
let checkWin = function() {
  if (goodMatches.length === 16 ) {
    // A win.
    removeBoard();
    displayWin();
  }
}

//Remove the game board.
let removeBoard = function () {
  let gameBoard = document.querySelector('#gameArea');
  gameBoard.remove();
}

//Create the Win screen.
let displayWin = function () {
  let tempDisplay = document.createDocumentFragment();
  let winTitle = document.createElement('h1');
  winTitle.textContent = "You've won";
  tempDisplay.append(winTitle);
  document.body.append(tempDisplay);
}

// Function for click event.
let clickCard = function (evt) {
  eventId = evt.target.getAttribute('id');
  if (!goodMatches.includes(eventId)) {
    if (clicks === 0 ) {
      firstClick = evt.target;
      firstId = firstClick.getAttribute('id');
      firstClick.textContent = cards[firstId];
      clicks++
    } else if ( clicks === 1 ) {
      if ( firstId != eventId ) {
        clicks++
        evt.target.textContent = cards[eventId];
        setTimeout(function() {
          if ( firstClick.textContent === evt.target.textContent) {
            goodMatches.push(firstId, eventId);
            checkWin();
          } else {
            firstClick.textContent = '';
            evt.target.textContent = '';
          }
          clicks = 0;
          moves++;
          tries.textContent = moves;
        }, 1000);
      }
    }
  }
};

shuffleCards(cards);
tries.textContent = moves;
for (let i = 0; i < dispCards.length; i++ ) {
  dispCards[i].addEventListener('click', clickCard);
};

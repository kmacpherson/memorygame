// define cards here, repeated twice to get 16 elements
let cards = ["dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider", "dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider"];
// For tracking moves
let moves = 0;
// For tracking clicks.
let clicks = 0;
// For keeping track if the first click ID.
let firstClick = null;
// Tracking all successful clicks.
let successfulClicks = [];
//Get the list of cards in memory.
let dispCards = document.querySelectorAll(".card");

// Shuffle the cards to randomize them. Found on Stackoverflow
let shuffleCards = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Function for click event.
let clickCard = function (evt) {
  let cardId = evt.target.getAttribute('id');
  if (!successfulClicks.includes(cardId)) {
    if (clicks === 0 ) {
      firstClick = cardId;
      dispCards[cardId].textContent = cards[cardId];
      clicks++;
    } else if ( clicks === 1 ) {
      clicks++;
      if (cardId != firstClick) {
        clicks = 0;
        dispCards[cardId].textContent = cards[cardId];
        setTimeout(function () {
          if (dispCards[firstClick].textContent !== dispCards[cardId].textContent) {
            dispCards[firstClick].textContent = '';
            dispCards[cardId].textContent = '';
          } else {
            successfulClicks.push(firstClick);
            successfulClicks.push(cardId);
            if (successfulClicks.length === 16) {
              console.log("you won");
            }
          }
        }, 1000);
        moves++;
        console.log(moves);
      } else if ( cardId === firstClick ) {
        click--;
      }
    }
  }
};

shuffleCards(cards);

for (let i = 0; i < dispCards.length; i++ ) {
  dispCards[i].addEventListener('click', clickCard);
};

// define cards here, repeated twice to get 16 elements
let cards = ["dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider", "dog", "cat", "mouse", "fish", "bird", "snake", "lizard", "spider"];

// Shuffle the cards to randomize them. Found on Stackoverflow
let shuffleCards = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

let placeCards = function () {
  let displayCards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++ ) {
    displayCards[i].textContent = cards[i];
  }
}


shuffleCards(cards);
placeCards();

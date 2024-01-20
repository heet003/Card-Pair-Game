var cardImages = [
  { id: 1, image: "club.png" },
  { id: 2, image: "spades.png" },
  { id: 3, image: "heart.png" },
  { id: 4, image: "diamond.png" },
];
var duplicatedImages = cardImages.concat(cardImages);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(duplicatedImages);
var cardImageContainers = document.getElementsByClassName("flip-card-back");

for (let i = 0; i < cardImageContainers.length; i++) {
  cardImageContainers[i].querySelector("img").src = duplicatedImages[i].image;
  cardImageContainers[i].querySelector("h1").textContent =
    duplicatedImages[i].id;
}

var arrayId = [];
var cards = [];
var count = 0;

let startTime;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById("time");

document.addEventListener("DOMContentLoaded", () => {});

// code for flip card on click
var flipCards = document.querySelectorAll(".flip-card");
flipCards.forEach(function (flipCard) {
  flipCard.addEventListener("click", flipHandler);
  flipCard.addEventListener("click", startTimer);
});

function flipHandler() {
  var flipCardInner = this.querySelector(".flip-card-inner");
  flipCardInner.classList.toggle("fliped");
}

// Game Logic
function clickHandler(card) {
  cards.push(card);
  selectedCardBackContent = card.getElementsByClassName("card-back-content");
  cardHTML = selectedCardBackContent[0].innerHTML;
  arrayId.push(cardHTML);
  lengthOfArray = arrayId.length;
  if (lengthOfArray >= 2) {
    if (arrayId[lengthOfArray - 1] == arrayId[lengthOfArray - 2]) {
      paired(1);
    } else {
      paired(0);
    }
  }
}

function paired(result) {
  lengthOfArray = cards.length;
  if (lengthOfArray % 2 == 0) {
    if (result) {
      setTimeout(function () {
        cards[lengthOfArray - 1].removeEventListener("click", flipHandler);
        cards[lengthOfArray - 2].removeEventListener("click", flipHandler);
      }, 600);
      count++;
    } else {
      setTimeout(function () {
        cards[lengthOfArray - 1]
          .querySelector(".flip-card-inner")
          .classList.toggle("fliped");
        cards[lengthOfArray - 2]
          .querySelector(".flip-card-inner")
          .classList.toggle("fliped");
      }, 600);
    }
  }
  gameOver();
}

//code for stopwatch
function startTimer() {
  var flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach(function (flipCard) {
    flipCard.removeEventListener("click", startTimer);
  });
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateDisplay, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const millisecondsPart = Math.floor((milliseconds % 1000) / 10); // Rounded to 2 decimal places
  return `${seconds}.${millisecondsPart.toString().padStart(2, "0")}`;
}

// game over (reload the page after 5 sec)
function gameOver() {
  if (count == 4) {
    stopTimer();
    document.getElementById("game-over-text").innerHTML =
      "You Completed the game in " + formatTime(elapsedTime) + " seconds";
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
}

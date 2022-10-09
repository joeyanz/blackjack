const startBtn = document.getElementById("start");
const hitBtn = document.getElementById("hit");
const standBtn = document.getElementById("stand");
const playerHand = document.getElementById("player-hand");
const dealerHand = document.getElementById("dealer-hand");
const playerScoreElement = document.getElementById("player-score");
const dealerScoreElement = document.getElementById("dealer-score");
const result = document.getElementById("result");

const suits = ["clubs", "diamonds", "hearts", "spades"];
let playerScore;
let playersCards;
let playerBj;
let dealerScore;
let dealersCards;
let dealerBj;
let hiddenCard;
let hiddenCardValue;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCard(randomValue) {
    const randomSuit = suits[randomNumber(0, 3)];
    let cardValue =
        randomValue === 11
            ? "jack"
            : randomValue === 12
            ? "queen"
            : randomValue === 13
            ? "king"
            : randomValue === 1
            ? "ace"
            : randomValue.toString();
    return `./cards/${cardValue}_of_${randomSuit}.png`;
}
function addCardToPlayer() {
    const randomValue = randomNumber(1, 13);
    if (randomValue >= 10) {
        playerScore += 10;
        playersCards.push(10);
    } else if (randomValue === 1) {
        playerScore += 11;
        playersCards.push(11);
    } else {
        playerScore += randomValue;
        playersCards.push(randomValue);
    }

    cardElement = document.createElement("img");
    cardElement.src = getRandomCard(randomValue);
    cardElement.classList.add("card");
    playerHand.appendChild(cardElement);
    playerScoreElement.textContent = playerScore;
}
function addCardToDealer() {
    const randomValue = randomNumber(1, 13);
    if (randomValue >= 10) {
        dealerScore += 10;
        dealersCards.push(10);
    } else if (randomValue === 1) {
        dealerScore += 11;
        dealersCards.push(11);
    } else {
        dealerScore += randomValue;
        dealersCards.push(randomValue);
    }
    cardElement = document.createElement("img");
    cardElement.src = getRandomCard(randomValue);
    cardElement.classList.add("card");
    dealerHand.appendChild(cardElement);
    dealerScoreElement.textContent = dealerScore;
}
function addHiddenCardToDealer() {
    const randomValue = randomNumber(1, 13);
    if (randomValue >= 10) {
        hiddenCardValue = 10;
    } else if (randomValue === 1) {
        hiddenCardValue = 11;
    } else hiddenCardValue = randomValue;
    hiddenCard = getRandomCard(randomValue);
    cardElement = document.createElement("img");
    cardElement.src = "./cards/cover.png";
    cardElement.classList.add("card");
    dealerHand.appendChild(cardElement);
}
function revealHiddenCard() {
    dealerScore += hiddenCardValue;
    dealersCards.push(hiddenCardValue);
    dealerHand.lastChild.src = hiddenCard;
    dealerScoreElement.textContent = dealerScore;
}

function checkPlayerBj() {
    if (playersCards.includes(11) && playersCards.includes(10)) {
        playerBj = true;
    }
}
function checkDealerBj() {
    if (dealersCards.includes(11) && dealersCards.includes(10)) {
        dealerBj = true;
    }
}
function checkPlayersHand() {
    if (playerScore > 21 && playersCards.includes(11)) {
        let aceIndex = playersCards.indexOf(11);
        playersCards[aceIndex] = 1;
        playerScore -= 10;
        playerScoreElement.textContent = playerScore;
    }
    if (playerScore > 21) {
        revealHiddenCard();
        endGame("Dealer Wins");
    }
    if (playerScore === 21) {
        stand();
    }
}
function checkDealersHand() {
    while (dealerScore < 17) {
        addCardToDealer();
    }
    if (dealerScore > 21 && dealersCards.includes(11)) {
        let aceIndex = playersCards.indexOf(11);
        playersCards[aceIndex] = 1;
        dealerScore -= 10;
        dealerScoreElement.textContent = dealerScore;
        while (dealerScore < 17) {
            addCardToDealer();
        }
    }
    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame("Player wins");
    } else if (dealerScore > playerScore) {
        endGame("Dealer wins");
    } else if (dealerScore === playerScore) {
        endGame("Tie");
    }
}

function stand() {
    revealHiddenCard();
    checkDealerBj();
    if (dealerBj) {
        endGame("Dealer wins");
    } else {
        checkDealersHand();
    }
}

function endGame(winner) {
    result.hidden = false;
    hitBtn.hidden = true;
    standBtn.hidden = true;
    hitBtn.hidden = true;
    startBtn.hidden = false;
    result.textContent = winner;
    startBtn.textContent = "Play Again?";
}

function start() {
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    result.hidden = true;
    playerScore = 0;
    playersCards = [];
    playerBj = false;
    dealerScore = 0;
    dealersCards = [];
    dealerBj = false;
    hiddenCard = "";
    hiddenCardValue = 0;
    startBtn.hidden = true;
    hitBtn.hidden = false;
    standBtn.hidden = false;
    playerScoreElement.parentElement.hidden = false;
    dealerScoreElement.parentElement.hidden = false;
    addCardToPlayer();
    addCardToDealer();
    addCardToPlayer();
    addHiddenCardToDealer();
    checkPlayerBj();
    if (playerBj) {
        revealHiddenCard();
        checkDealerBj();
        if (dealerBj) {
            endGame("Tie");
        } else {
            endGame("Player wins");
        }
    }
}

startBtn.addEventListener("click", start);
hitBtn.addEventListener("click", () => {
    addCardToPlayer();
    checkPlayersHand();
});
standBtn.addEventListener("click", stand);

// Selecting elements
const playerOneSection = document.querySelector('.player--0');
const playerTwoSection = document.querySelector('.player--1');
const playerOneScore = document.querySelector('#score--0');
const playerTwoScore = document.getElementById('score--1');
const playerOneCurrentScore = document.getElementById('current--0');
const playerTwoCurrentScore = document.getElementById('current--1');

const diceImage = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');
const winnerSound = document.getElementById('winnerSound'); 

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneCurrentScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;
  
    diceImage.classList.add('hidden');
    playerOneSection.classList.remove('player--winner');
    playerTwoSection.classList.remove('player--winner');
    playerOneSection.classList.add('player--active');
    playerTwoSection.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOneSection.classList.toggle('player--active');
    playerTwoSection.classList.toggle('player--active');
};

btnRollDice.addEventListener('click', function () {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceImage.classList.remove('hidden');
      diceImage.src = `image/dice-${dice}.png`;
  
      if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      } else {
        switchPlayer();
      }
    }
});

btnHoldScore.addEventListener('click', function () {
    if (playing) {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
      if (scores[activePlayer] >= 100) {
        playing = false;
        diceImage.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  
        winnerSound.play();
      } else {
        switchPlayer();
      }
    }
});

btnNewGame.addEventListener('click', init);
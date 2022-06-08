'use scrict';

// selection elements
const leftSide = document.querySelector('.game-left');
const rightSide = document.querySelector('.game-right');
const score1 = document.querySelector('.player-0-score');
const score2 = document.querySelector('.player-1-score');
const current1El = document.querySelector('.current-score-0');
const current2El = document.querySelector('.current-score-1');

const diceEl = document.querySelector('.dice-img');
const btnNew = document.querySelector('.btn-game');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

score1.textContent = 0;
score2.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  leftSide.classList.toggle('player-active');
  rightSide.classList.toggle('player-active');
};

//ROlling dice
btnRoll.addEventListener('click', function () {
  //Generate random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `./img/dice-${dice}.png`;

  //Check for rolled dice option
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    document.querySelector(
      `.current-score-${activePlayer}`
    ).textContent = currentScore;
  } else {
    // switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  // add current score to active player score
  scores[activePlayer] += currentScore;

  console.log(scores);

  document.querySelector(`.player-${activePlayer}-score`).textContent =
    scores[activePlayer];

  //switch player
  switchPlayer();

  // check if score is >=100
});

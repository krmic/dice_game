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

const rules = document.querySelector('.rules');
const rulesMessage = document.querySelector('.rules-message');
const closeBtn = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  diceEl.classList.add('hidden');
  diceEl.classList.remove('hidden-2');
  btnHold.classList.remove('hidden-2');
  btnRoll.classList.remove('hidden-2');
  document.querySelector('.player-0').classList.remove('player-winner');
  document.querySelector('.player-1').classList.remove('player-winner');
  document.querySelector(`.player-0`).classList.add('player-active');
  document.querySelector(`.player-1`).classList.remove('player-active');
};

init();

const switchPlayer = function () {
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  leftSide.classList.toggle('player-active');
  rightSide.classList.toggle('player-active');
};

//ROlling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
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
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player score
    scores[activePlayer] += currentScore;

    console.log(scores);

    document.querySelector(`.player-${activePlayer}-score`).textContent =
      scores[activePlayer];

    // check if score is >=100
    if (scores[activePlayer] >= 70) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');

      diceEl.classList.add('hidden-2');
      btnHold.classList.add('hidden-2');
      btnRoll.classList.add('hidden-2');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

const addHidden = function () {
  overlay.classList.add('hidden-3');
  closeBtn.classList.add('hidden-3');
  rulesMessage.classList.add('hidden-3');
};

const removeHidden = function () {
  rulesMessage.classList.remove('hidden-3');
  closeBtn.classList.remove('hidden-3');
  overlay.classList.remove('hidden-3');
};

rules.addEventListener('click', function () {
  removeHidden();
});

closeBtn.addEventListener('click', function () {
  addHidden();
});

overlay.addEventListener('click', function () {
  addHidden();
});

document.addEventListener('keydown', function (event) {
  console.log(event.key);
  if (event.key === 'Escape' && !overlay.classList.contains('hidden-3')) {
    addHidden();
  }
});

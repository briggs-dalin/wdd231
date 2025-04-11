document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('show');
  });
  
  document.getElementById('menu-toggle').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');  
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById("currentyear");
    const lastMod = document.getElementById("lastModified");
    if (year) year.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = `Last Modified: ${document.lastModified}`
  });


  const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let spawnInterval;
let combo = 0;
let bonusCooldown = 0;

function getRandomPosition() {
  const x = Math.random() * (gameArea.offsetWidth - 50);
  const y = Math.random() * (gameArea.offsetHeight - 50);
  return { x, y };
}

function flashMessage(msg) {
  const msgEl = document.createElement('div');
  msgEl.textContent = msg;
  msgEl.className = 'flash-msg';
  gameArea.appendChild(msgEl);

  setTimeout(() => {
    gameArea.removeChild(msgEl);
  }, 1000);
}

function createTarget(isBonus = false) {
  const target = document.createElement('div');
  target.classList.add('target');
  if (isBonus) target.classList.add('bonus');

  const { x, y } = getRandomPosition();
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  // Click handler
  target.addEventListener('click', () => {
    gameArea.removeChild(target);

    if (isBonus) {
      score += 10;
      flashMessage("+10 Bonus!");
    } else {
      score += 1;
      combo++;
      if (combo > 0 && combo % 3 === 0) {
        score += 5;
        flashMessage("+5 Combo Bonus!");
      }
    }

    scoreDisplay.textContent = score;
  });

  gameArea.appendChild(target);

  
  let moveInterval;
  if (isBonus) {
    moveInterval = setInterval(() => {
      const { x, y } = getRandomPosition();
      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
    }, 600); 
  }

  // Remove target after 1.5 seconds
  setTimeout(() => {
    if (gameArea.contains(target)) {
      gameArea.removeChild(target);
      if (!isBonus) combo = 0;
    }
    if (moveInterval) clearInterval(moveInterval);
  }, 1500);
}

function startGame() {
  score = 0;
  combo = 0;
  timeLeft = 30;
  bonusCooldown = 0;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  startBtn.disabled = true;

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(spawnInterval);
      startBtn.disabled = false;
      alert(`Game over! Your score is: ${score}. Now put it in the leaderboard or play again!`);
    }
  }, 1000);

  spawnInterval = setInterval(() => {
    const isBonus = bonusCooldown <= 0 && Math.random() < 0.3;
    createTarget(isBonus);
    bonusCooldown--;

    if (isBonus) {
      bonusCooldown = 4; // Delay before another bonus appears
    }
  }, 800);
}

startBtn.addEventListener('click', startGame);

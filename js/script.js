const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const timerElement = document.querySelector('.timer');


let isJumping = false;
let gameIsOver = false;
let loop;
let timer = 0;
let speed = 1;

const jump = () => {
  if (!isJumping && !gameIsOver) {
    isJumping = true;
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
      const currentSpeed = speed > 1 ? 1 : speed;
      if (jumpCount < 15) {
        mario.style.bottom = `${marioPosition + 15 * currentSpeed}px`;
      } else if (jumpCount >= 15 && jumpCount < 30) {
        mario.style.bottom = `${marioPosition - 15 * currentSpeed}px`;
      } else {
        clearInterval(jumpInterval);
        isJumping = false;
      }
      jumpCount++;
    }, 10);
  }
};

const checkCollision = () => {
  let pipePosition, marioPosition;


  if (window.matchMedia("(max-width: 768px)").matches) {
    pipePosition = pipe.getBoundingClientRect().left;
    marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  } else {
   
    pipePosition = pipe.offsetLeft;
    marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  }

  // Verifique a colisão e aja de acordo
  if (pipePosition <= 60 && pipePosition > 0 && marioPosition <= 50) {
    gameIsOver = true;
    clearInterval(loop);
    clearInterval(timerInterval);
    mario.src = './images/morte.png';
    mario.style.width = '150px';
    mario.style.marginLeft = '50px';
    setTimeout(() => {
      resetGame();
    }, 2000);
  }
};


let initialSpeed = 1;
let acceleration = 0.1;

const increaseSpeed = () => {

  speed = initialSpeed + acceleration * timer / 1000;


};




const resetGame = () => {
  gameIsOver = false;
  mario.src = './images/andar1-unscreen.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '0';
  timer = 0;
  speed = 1;
  timerInterval = setInterval(() => {
    timer++;
    if (timer % 5000 === 0) {
      speed += 1;
    }
    timerElement.innerText = `Tempo: ${timer / 100}s`;
  }, 10);
  loop = setInterval(gameLoop, 10);
};

const gameLoop = () => {
  checkCollision();
};

let timerInterval = setInterval(() => {
  timer++;
  if (timer % 5000 === 0) {
    speed += 5;
  }
  timerElement.innerText = `Tempo: ${timer / 100}s`;
}, 10);

loop = setInterval(gameLoop, 10);

document.addEventListener('click', jump);

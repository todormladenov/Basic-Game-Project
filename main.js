const gameStartElement = document.querySelector('.game-start');
const gameAreaElement = document.querySelector('.game-area');
const gameOverElement = document.querySelector('.game-over');
const gameScoreElement = document.querySelector('.game-score');
const gamePointsElement = document.querySelector('.points');

gameStartElement.addEventListener('click', startGame);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

const keys = {};
const player = {
    x: 150,
    y: 100,
    wizardHight: 100,
    wizardWight: 82,
};
const gameSettings = {
    movementSpeed: 2,
    fallingSpeed: 0.5,
};
const scene = {
    score: 0
}

function startGame(e) {
    gameStartElement.classList.add('hide');

    let wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameAreaElement.appendChild(wizard);

    let bug = document.createElement('div');
    bug.classList.add('bug');
    window.requestAnimationFrame(game);
}

function game() {
    let wizard = document.querySelector('.wizard');
    scene.score++;

    let isInAir = (player.y + player.wizardHight) <= gameAreaElement.offsetHeight;

    if (isInAir) {
        player.y += gameSettings.fallingSpeed;
    }

    if (keys.ArrowUp) {
        player.y = Math.max(player.y - gameSettings.movementSpeed, 0);
    }

    if (keys.ArrowDown) {
        player.y = Math.min(player.y + gameSettings.movementSpeed, (gameAreaElement.offsetHeight - player.wizardHight));
    }

    if (keys.ArrowLeft) {
        player.x = Math.max(player.x - gameSettings.movementSpeed, 0);
    }

    if (keys.ArrowRight) {
        player.x = Math.min(player.x + gameSettings.movementSpeed, (gameAreaElement.offsetWidth - player.wizardWight));
    }

    if (keys.Space) {
        wizard.classList.add('wizard-fire');
        shootFireBall(player);
    } else {
        wizard.classList.remove('wizard-fire');

    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    gamePointsElement.textContent = scene.score;

    window.requestAnimationFrame(game);
}

function shootFireBall(player){
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball');

    fireBall.style.top = (player.y + player.wizardHight / 3 - 5) + 'px';
    fireBall.style.left = (player.x + player.wizardWight) + 'px';

    gameAreaElement.appendChild(fireBall);
}

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}
const gameStartElement = document.querySelector('.game-start');
const gameAreaElement = document.querySelector('.game-area');
const gameOverElement = document.querySelector('.game-over');
const gameScoreElement = document.querySelector('.game-score');

gameStartElement.addEventListener('click', startGame);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

const keys = {};
const player = {
    x: 150,
    y: 100,
};
const gameSettings = {
    movementSpeed: 2,
    wizardHight: 100,
    wizardWight: 82,
};

function startGame(e) {
    gameStartElement.classList.add('hide');

    let wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameAreaElement.appendChild(wizard);
    window.requestAnimationFrame(game);
}

function game() {
    let wizard = document.querySelector('.wizard');

    if (keys.ArrowUp) {
        player.y = Math.max(player.y - gameSettings.movementSpeed, 0);
    }

    if (keys.ArrowDown) {
        player.y = Math.min(player.y + gameSettings.movementSpeed, (gameAreaElement.offsetHeight - gameSettings.wizardHight));
    }

    if (keys.ArrowLeft) {
        player.x = Math.max(player.x - gameSettings.movementSpeed, 0);
    }

    if (keys.ArrowRight) {
        player.x = Math.min(player.x + gameSettings.movementSpeed, (gameAreaElement.offsetWidth - gameSettings.wizardWight));
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    window.requestAnimationFrame(game);
}

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}
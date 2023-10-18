const gameStartElement = document.querySelector('.game-start');
const gameAreaElement = document.querySelector('.game-area');
const gameOverElement = document.querySelector('.game-over');
const gameScoreElement = document.querySelector('.game-score');

gameStartElement.addEventListener('click', startGame);

function startGame(e){
    gameStartElement.classList.add('hide');

    let wizard = document.createElement('div');
    wizard.classList.add('wizard');
    gameAreaElement.appendChild(wizard);
}
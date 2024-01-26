import { startGame, game, onKeyDown, onKeyUp } from './gameFunctions.js';
import { gameStartElement } from './gameData.js';

gameStartElement.addEventListener('click', startGame);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

window.requestAnimationFrame(game);
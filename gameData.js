export const gameStartElement = document.querySelector('.game-start');
export const gameAreaElement = document.querySelector('.game-area');
export const gameOverElement = document.querySelector('.game-over');
export const gameScoreElement = document.querySelector('.game-score');
export const gamePointsElement = document.querySelector('.points');
export const playerHealthElement = document.querySelector('.health');

export const keys = {};
export const player = {
    x: 150,
    y: 100,
    wizardHight: 100,
    wizardWight: 82,
    fireBallWight: 25,
    lastFireBallShot: 0
};
export const gameSettings = {
    movementSpeed: 2,
    bugSpeed: 2,
    fallingSpeed: 0.5,
    fireBallSpeed: 3,
    fireBallInterval: 1000,
    cloudSpawnInterval: 3000,
    bugSpawnInterval: 3000,
};
export const scene = {
    score: 0,
    health: 3,
    lastCloudSpawned: 0,
    cloudWidth: 200,
    lastBugSpawned: 0,
    bugWidth: 60,
    bugHight: 70,
    isActiveGame: true
}

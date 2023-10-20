const gameStartElement = document.querySelector('.game-start');
const gameAreaElement = document.querySelector('.game-area');
const gameOverElement = document.querySelector('.game-over');
const gameScoreElement = document.querySelector('.game-score');
const gamePointsElement = document.querySelector('.points');
const playerHealthElement = document.querySelector('.health');

gameStartElement.addEventListener('click', startGame);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

const keys = {};
const player = {
    x: 150,
    y: 100,
    wizardHight: 100,
    wizardWight: 82,
    fireBallWight: 25,
    lastFireBallShot: 0
};
const gameSettings = {
    movementSpeed: 2,
    bugSpeed: 2,
    fallingSpeed: 0.5,
    fireBallSpeed: 3,
    fireBallInterval: 1000,
    cloudSpawnInterval: 3000,
    bugSpawnInterval: 3000,
};
const scene = {
    score: 0,
    health: 3,
    lastCloudSpawned: 0,
    cloudWidth: 200,
    lastBugSpawned: 0,
    bugWidth: 60,
    bugHight: 70,
    isActiveGame: true
}

// Start the game
function startGame(e) {
    gameStartElement.classList.add('hide');

    // Render wizard
    let wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameAreaElement.appendChild(wizard);

    window.requestAnimationFrame(game);
}

// Game logic
function game(timestamp) {
    let wizard = document.querySelector('.wizard');

    // Spawn bugs
    if (timestamp - scene.lastBugSpawned >= gameSettings.bugSpawnInterval) {
        bugSpawn();
        scene.lastBugSpawned = timestamp;
        gameSettings.movementSpeed += 0.3;
    }

    // Render bugs
    let bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => {
        bug.x -= gameSettings.movementSpeed * 2;
        bug.style.left = bug.x + 'px';

        if (bug.x + bug.offsetWidth <= 0) {
            bug.remove();
            scene.score -= 500;
        }
    });

    // Spawn clouds
    if (timestamp - scene.lastCloudSpawned >= gameSettings.cloudSpawnInterval + 20000 * Math.random()) {
        cloudSpawn();
        scene.lastCloudSpawned = timestamp;
    }

    // Render clouds
    let clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= gameSettings.movementSpeed;
        cloud.style.left = cloud.x + 'px';

        if (cloud.x + cloud.offsetWidth <= 0) {
            cloud.remove();
        }
    });

    // Add movement
    if (keys.ArrowUp) {
        player.y = Math.max(player.y - gameSettings.movementSpeed * 2, 0);
    }

    if (keys.ArrowDown) {
        player.y = Math.min(player.y + gameSettings.movementSpeed * 1.3, (gameAreaElement.offsetHeight - player.wizardHight));
    }

    if (keys.ArrowLeft) {
        player.x = Math.max(player.x - gameSettings.movementSpeed * 1.3, 0);
    }

    if (keys.ArrowRight) {
        player.x = Math.min(player.x + gameSettings.movementSpeed * 1.3, (gameAreaElement.offsetWidth - player.wizardWight));
    }

    // Add gravity
    let isInAir = (player.y + player.wizardHight) <= gameAreaElement.offsetHeight;

    if (isInAir) {
        player.y += gameSettings.fallingSpeed;
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    // Shoot fire ball
    if (keys.Space && timestamp - player.lastFireBallShot >= gameSettings.fireBallInterval) {
        if (player.x < gameAreaElement.offsetWidth - player.wizardWight - player.fireBallWight) {

            player.lastFireBallShot = timestamp
            wizard.classList.add('wizard-fire');
            shootFireBall(player);
        }
    } else {
        wizard.classList.remove('wizard-fire');
    }

    // Render fire balls
    let fireBalls = document.querySelectorAll('.fire-ball');
    fireBalls.forEach(fireBall => {
        let fireBallX = parseInt(fireBall.style.left);
        fireBall.style.left = (fireBallX + gameSettings.fireBallSpeed) + 'px';

        if (fireBallX + fireBall.offsetWidth >= gameAreaElement.offsetWidth) {
            fireBall.remove();
        }
    });

    // Detect collision
    bugs.forEach(bug => {
        if (detectCollision(wizard, bug)) {
            bug.remove();
            scene.health--;
            playerHealthElement.textContent = scene.health;
            if (!scene.health) {
                gameOver();
            }
        }

        fireBalls.forEach(fireBall => {
            if (detectCollision(fireBall, bug)) {
                bug.remove();
                fireBall.remove();
                scene.score += 1000;
            }
        });
    });
    
    scene.score++;
    gamePointsElement.textContent = scene.score;

    if (scene.isActiveGame) {
        window.requestAnimationFrame(game);
    }
}

function bugSpawn() {
    let bug = document.createElement('div');
    bug.classList.add('bug');
    bug.x = gameAreaElement.offsetWidth - scene.bugWidth;
    bug.style.left = bug.x + 'px';
    bug.style.top = (gameAreaElement.offsetHeight - scene.bugHight) * Math.random() + 'px';

    gameAreaElement.appendChild(bug);
}

function cloudSpawn() {
    let cloud = document.createElement('div');
    cloud.classList.add('cloud');
    cloud.x = gameAreaElement.offsetWidth - scene.cloudWidth;
    cloud.style.left = cloud.x + 'px';
    cloud.style.top = (gameAreaElement.offsetHeight - 200) * Math.random() + 'px';

    gameAreaElement.appendChild(cloud);
}

function shootFireBall(player) {
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball');

    fireBall.style.top = (player.y + player.wizardHight / 3 - 5) + 'px';
    fireBall.style.left = (player.x + player.wizardWight) + 'px';

    gameAreaElement.appendChild(fireBall);
}

function detectCollision(firstElement, secondElement) {
    let firstRect = firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom ||
        firstRect.bottom < secondRect.top ||
        firstRect.right < secondRect.left ||
        firstRect.left > secondRect.right);
}

function gameOver() {
    scene.isActiveGame = false;
    gameOverElement.classList.remove('hide');

    gameOverElement.addEventListener('click', () => {
        location.reload();
    });
}

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}
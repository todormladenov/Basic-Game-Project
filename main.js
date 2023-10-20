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
    fireBallWight: 25,
    lastFireBallShot: 0
};
const gameSettings = {
    movementSpeed: 2,
    fallingSpeed: 0.5,
    fireBallSpeed: 3,
    fireBallInterval: 1000,
    cloudSpawnInterval: 3000,
    bugSpawnInterval: 3000,
};
const scene = {
    score: 0,
    lastCloudSpawned: 0,
    cloudWidth: 200,
    lastBugSpawned: 0,
    bugWidth: 60,
    bugHight: 70,
}

function startGame(e) {
    gameStartElement.classList.add('hide');

    let wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameAreaElement.appendChild(wizard);

    window.requestAnimationFrame(game);
}

function game(timestamp) {
    let wizard = document.querySelector('.wizard');

    let fireBalls = document.querySelectorAll('.fire-ball');
    fireBalls.forEach(fireBall => {
        let fireBallX = parseInt(fireBall.style.left);
        fireBall.style.left = (fireBallX + gameSettings.fireBallSpeed) + 'px';

        if (fireBallX + fireBall.offsetWidth >= gameAreaElement.offsetWidth) {
            fireBall.remove();
        }
    });

    if (timestamp - scene.lastBugSpawned >= gameSettings.bugSpawnInterval) {
        bugSpawn();
        scene.lastBugSpawned = timestamp
    }

    let bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => {
        bug.x -= gameSettings.movementSpeed;
        bug.style.left = bug.x + 'px';

        if (bug.x + bug.offsetWidth <= 0) {
            bug.remove();
        }
    });

    if (timestamp - scene.lastCloudSpawned >= gameSettings.cloudSpawnInterval + 20000 * Math.random()) {
        cloudSpawn();
        scene.lastCloudSpawned = timestamp;
    }

    let clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= gameSettings.movementSpeed;
        cloud.style.left = cloud.x + 'px';

        if (cloud.x + cloud.offsetWidth <= 0) {
            cloud.remove();
        }
    });

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

    if (keys.Space && timestamp - player.lastFireBallShot >= gameSettings.fireBallInterval) {
        if (player.x < gameAreaElement.offsetWidth - player.wizardWight - player.fireBallWight) {

            player.lastFireBallShot = timestamp
            wizard.classList.add('wizard-fire');
            shootFireBall(player);
        }
    } else {
        wizard.classList.remove('wizard-fire');
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    scene.score++;
    gamePointsElement.textContent = scene.score;

    window.requestAnimationFrame(game);
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

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}
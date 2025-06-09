function playGame(paused = false) {
  // Main gameplay loop. If paused=true, don't move anything.
  push();
  textFont(titleFont);
  textSize(48);
  fill(255, 240, 190, 200);
  text("Star Chaser", width / 2, 40);
  pop();

  textFont('Verdana');
  textSize(24);
  fill(255);
  text("Level: " + level, width - 120, 40);

  textSize(30);
  for (let i = 0; i < lives; i++) {
    fill(255, 60, 80);
    text("❤️", 40 + i * 40, 45);
  }

  spaceship.show();
  if (!paused) spaceship.move();

  // Stars
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].show();
    if (!paused && spaceship.intersects(stars[i])) {
      collectSound.play(); // Play collect sound when star is collected
      stars.splice(i, 1);
    }
  }

  // Level up or win when all stars are collected
  if (stars.length === 0 && !paused) {
    if (level < 5) {
      levelUp();
    } else {
      if (gameState !== "winner") {
        gameWon.play(); // Play win sound once
      }
      gameState = "winner";
    }
  }

  // Rockets
  for (let rocket of rockets) {
    // Only move rockets if not paused AND not frozen
    if (!paused && !rocketsFrozen) rocket.move();
    rocket.show();
    if (!paused && !rocketsFrozen && spaceship.intersects(rocket)) {
      destroySound.play(); // Play destroy sound on rocket hit
      lives--;
      spaceship.respawn();
      rocketsFrozen = true;  // stop and randomize rockets on life loss!
      for (let rocket of rockets) {
        let angle = random(TWO_PI);
        let speed = sqrt(rocket.vx * rocket.vx + rocket.vy * rocket.vy);
        rocket.vx = speed * cos(angle);
        rocket.vy = speed * sin(angle);
        // Randomize rocket positions, keep on screen
        rocket.x = random(rocket.width, width - rocket.width);
        rocket.y = random(100 + rocket.height, height - rocket.height);
        rocket.updateAngle();
      }
      if (lives <= 0) {
        if (gameState !== "gameover") {
          gameOver.play(); // Play game over sound once
        }
        gameState = "gameover";
      }
      break;
    }
  }
}

function levelUp() {
  // Go to next level, increase rocket numbers and speed
  level++;
  rocketsFrozen = true; // Freeze rockets at new level's start

  let rocketBase = [1, 2, 3, 4, 5];
  let rocketMax = [2, 4, 7, 10, 14];
  let speedBase = [1.7, 2.4, 3.2, 3.8, 4.6];
  let speedMax = [2.7, 3.4, 4.5, 5.5, 6.9];

  // Interpolate rocket count and speed by level progress
  let progress = (level - 1) / (rocketBase.length - 1); 
  let numRockets = Math.round(lerp(rocketBase[0], rocketMax[rocketMax.length - 1], progress));
  let rocketSpeed = lerp(speedBase[0], speedMax[speedMax.length - 1], progress);

  rockets = [];
  for (let i = 0; i < numRockets; i++) rockets.push(new Rocket(rocketSpeed));
  for (let i = 0; i < 10; i++) stars.push(new Star());
}

function resetGame() {
  // Set all variables to initial values
  lives = 3;
  level = 1;
  stars = [];
  rockets = [];
  spaceship = new Spaceship();
  rocketsFrozen = true;

  let numRockets = 2;  
  let rocketSpeed = 2.7;
  
  for (let i = 0; i < numRockets; i++) rockets.push(new Rocket(rocketSpeed));
  for (let i = 0; i < 10; i++) stars.push(new Star());
  animTimer = 0;
}
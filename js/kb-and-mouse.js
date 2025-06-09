function keyPressed() {
  if (keyCode === ENTER) {   // Enter: Go to different displays
    if (gameState === "start" || gameState === "gameover" || gameState === "winner") {
      resetGame();
      gameState = "playing";
      bgSound.play();
    }
  }

  if (keyCode === 32) {    // Space Bar: Pause/ Play
    if (gameState === "playing") {
      gameState = "paused";
      pauseDir = 1;
      pauseAlpha = 0;
      bgSound.stop();
     } else if (gameState === "paused") {
      gameState = "playing";
      pauseDir = -1;
       bgSound.play();
    }
  }
  
  if (keyCode === ESCAPE) {   // ESCAPE: go back to main menu
    gameState = "start";
    resetGame();
    bgSound.play();
  }
  
  if (keyCode === 82 && gameState === "playing") {  // R: reset
    resetGame();
  }

  // Start rocket movement on arrow or WASD if frozen and in playing
  if (gameState === "playing" && rocketsFrozen) {
    if (keyIsDown(37) || keyIsDown(38) || keyIsDown(39) || keyIsDown(40) ||
        keyIsDown(65) || keyIsDown(87) || keyIsDown(68) || keyIsDown(83)) {
      rocketsFrozen = false;
    }
  }
}

function mousePressed() {   // Play/ Pause while playing
  if (gameState === "playing") {
    gameState = "paused";
    pauseDir = 1;
    pauseAlpha = 0;
    bgSound.stop();
  } else if (gameState === "paused") {
    gameState = "playing";
    pauseDir = -1;
    bgSound.play();
  }
}
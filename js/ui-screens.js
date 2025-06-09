function showStartScreen() {
  // Main menu with title and controls
  push();
  let tSize = 60 + 6 * sin(animTimer);
  fill(255, 240, 190, 240);
  textFont(titleFont);
  textSize(tSize);
  text("Star Chaser", width / 2, height / 3);
  pop();

  textFont('Georgia');
  textSize(24);
  fill(255);
  text("Beat all 5 levels to win!", width / 2, height / 3 + 80);

  let bx = width/2, by = height/3 + 180, bw = 320, bh = 145;
  fill(35, 45, 90, 180);
  stroke(80, 180, 255, 160);
  strokeWeight(3);
  rect(bx, by, bw, bh, 16);
  noStroke();
  fill(255);
  textFont('Verdana');
  textSize(18);
  text("CONTROLS:\n← ↑ → ↓ or WASD to move\nMouse click to pause\nR to reset\nEsc to go to main menu\nCollect all stars, avoid rockets!", bx, by);

  textSize(18);
  fill(220, 220, 255);
  text("Press ENTER to start!", width / 2, height / 3 + 280);
  
  fill(200);
  textSize(16);
  text("* Play in fullscreen on a computer for best experience", width - 220, height - 12);
}

function showGameOver() {
  // Displayed when player loses all lives and the game overs
  let tSize = 60 + 10 * abs(sin(animTimer * 2));
  push();
  fill(255, 40, 80, 220);
  textFont(titleFont);
  textSize(tSize);
  text("Game Over", width / 2, height / 3);
  pop();

  textFont('Verdana');
  fill(255);
  textSize(28);
  text("Level reached: " + level, width / 2, height / 3 + 120);
  fill(200, 240, 255);
  textSize(18);
  text("Press ENTER to play again", width / 2, height / 3 + 250);
}

function showWinnerScreen() {
  // Displayed when player wins all levels
  let tSize = 65 + 6 * sin(animTimer * 3);
  push();
  fill(220, 255, 100, 230);
  textFont(titleFont);
  textSize(tSize);
  text("You Win!", width / 2, height / 3);
  pop();
  textFont('Georgia');
  fill(255, 220, 80);
  textSize(30);
  text("Congratulations!", width / 2, height / 3 + 80);
  fill(255, 255, 255);
  textSize(20);
  text("Level 5 cleared!", width / 2, height / 3 + 120);
  fill(150, 250, 200);
  text("Press ENTER to play again", width / 2, height / 3 + 250);
  fill(220,255,220);
  textSize(22);
  text("You finished with " + lives + " " + (lives === 1 ? "life" : "lives") + " left!", width/2, height/3 + 160);
}

function showPauseOverlay() {
  // Semi-transparent overlay for pause
  pauseAlpha += 8 * pauseDir;
  pauseAlpha = constrain(pauseAlpha, 0, 180);

  fill(40, 40, 70, pauseAlpha);
  rect(width / 2, height / 2, width, height);

  textSize(50);
  fill(220, 220, 255, pauseAlpha + 40);
  textFont('Georgia');
  text("Paused", width / 2, height / 2);
  textSize(18);
  fill(255, 255, 255, pauseAlpha + 30);
  text("Click mouse to resume", width / 2, height / 2 + 50);
}
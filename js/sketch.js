// Star Chaser
// ==========================================
// By: Krish Patel

// Asset and element variables
let titleFont;
let imgSpaceship, imgStar, imgSpace, imgRocket;
let bgSound, destroySound, collectSound, gameWon, gameOver;
let bgCanvas;

// Game objects and state variables
let spaceship;
let stars = [];
let rockets = [];
let lives = 3;

let level = 1;
let gameState; // "start", "playing", "paused", "gameover", "winner"
let pauseAlpha = 0;
let pauseDir = 1;
let animTimer = 0;

let rocketsFrozen = true; // Rockets don't move until user starts moving

function preload() {
  // Load sounds and images before the game starts
  bgSound = loadSound("assets/bg_sound.opus");  
  destroySound = loadSound("assets/destroy.wav");  
  collectSound = loadSound("assets/collect.mp3");  
  gameWon = loadSound("assets/gamewon.wav");       
  gameOver = loadSound("assets/gameover.wav");     
  
  imgSpaceship = loadImage("assets/spaceship.png");
  imgStar = loadImage("assets/star.png");
  imgSpace = loadImage("assets/space2.jpg");
  imgRocket = loadImage("assets/rocket.gif");
  
  titleFont = loadFont("assets/EagleLake.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a static space background for lagging issue
  bgCanvas = createGraphics(width, height);   
  bgCanvas.imageMode(CENTER);
  bgCanvas.tint(200);
  bgCanvas.image(imgSpace, width/2, height/2, width, height);

  bgSound.setLoop(true);
  bgSound.setVolume(0.3);
  bgSound.play();

  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  gameState = "start";
  resetGame();
}

function draw() {
  image(bgCanvas, width / 2, height / 2, width, height);
  animTimer += 0.03;

  // Game states
  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "paused") {
    playGame(true);
    showPauseOverlay();
  } else if (gameState === "gameover") {
    showGameOver();
  } else if (gameState === "winner") {
    showWinnerScreen();
  }
}
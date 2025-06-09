class Spaceship {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 90;
    this.speed = 6;
  }

  move() {
    // Arrow keys or WASD movement
    if (keyIsDown(65) || keyIsDown(37)) this.x -= this.speed;
    if (keyIsDown(68) || keyIsDown(39)) this.x += this.speed;
    if (keyIsDown(87) || keyIsDown(38)) this.y -= this.speed;
    if (keyIsDown(83) || keyIsDown(40)) this.y += this.speed;
    // Screen wrapping
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  show() {
    image(imgSpaceship, this.x, this.y, this.size, this.size);
  }

  intersects(object) {
    // Checks collision with Star or Rocket
    if (object instanceof Star) {
      let d = dist(this.x, this.y, object.x, object.y);
      return d < (this.size / 2 + object.size / 2 - 10);
    } else {
      // Rocket with rectangle hitbox
      let rx = object.x, ry = object.y;
      let rw = object.width * 0.38, rh = object.height * 0.55;
      return (
        this.x + this.size / 2 > rx - rw / 2 &&
        this.x - this.size / 2 < rx + rw / 2 &&
        this.y + this.size / 2 > ry - rh / 2 &&
        this.y - this.size / 2 < ry + rh / 2
      );
    }
  }

  respawn() {
    // Move back to center
    this.x = width / 2;
    this.y = height / 2;
  }
}

class Star {
  constructor() {
    this.size = 38;
    this.x = random(this.size, width - this.size);
    this.y = random(100 + this.size, height - this.size);
  }
  
  show() {
    image(imgStar, this.x, this.y, this.size, this.size);
  }
}

class Rocket {
  constructor(speed = 2) {
    this.width = 44;
    this.height = 68;
    this.x = random(this.width, width - this.width);
    this.y = random(100 + this.height, height - this.height);
    let angle = random(TWO_PI);
    let v = speed + random(0, 0.8);
    this.vx = v * cos(angle);
    this.vy = v * sin(angle);
    this.angle = angle;
    this.updateAngle();
  }

  move() {
    // Move rocket, bounce off edges
    this.x += this.vx;
    this.y += this.vy;
    let bounced = false;
    if (this.x < this.width / 2) {
      this.x = this.width / 2;
      this.vx *= -1;
      bounced = true;
    }
    if (this.x > width - this.width / 2) {
      this.x = width - this.width / 2;
      this.vx *= -1;
      bounced = true;
    }
    if (this.y < 100 + this.height / 2) {
      this.y = 100 + this.height / 2;
      this.vy *= -1;
      bounced = true;
    }
    if (this.y > height - this.height / 2) {
      this.y = height - this.height / 2;
      this.vy *= -1;
      bounced = true;
    }
    if (bounced) this.updateAngle();
  }

  updateAngle() {
    // Set rocket's rotation based on movement direction
    this.angle = atan2(this.vy, this.vx) + HALF_PI;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(imgRocket, 0, 0, this.width, this.height);
    pop();
    // Uncomment below to see Debug boxes
    // push();
    // translate(this.x, this.y);
    // noFill(); stroke(255,0,0); strokeWeight(2);
    // rect(0, 0, this.width*0.38, this.height*0.55);
    // pop();
  }
}
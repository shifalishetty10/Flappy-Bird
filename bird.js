//Display of bird and it's movements
function Bird() {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function () {
    fill(255);

    image(img, bird.x, bird.y, 50, 50);
  };

  this.up = function () {
    this.velocity += this.lift;
  };

  this.update = function () {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height - 50) {
      this.y = height - 50;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}

function preload() {
  img = loadImage("image/Flappy_bird_2.png");
}

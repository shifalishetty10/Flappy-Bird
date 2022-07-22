//Display of obstacles(pipes)
function Pipe() {
  var spacing = 200;
  var centery = random(spacing, height - spacing);

  this.top = centery - spacing / 2;
  this.bottom = height - (centery + spacing / 2);
  this.x = width;
  this.w = 162;
  this.speed = 8;

  this.highlight = false;

  this.show = function () {
    fill(34, 139, 34);
    stroke(0, 100, 0);
    strokeWeight(5);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom - 50);

  }
  this.update = function () {
    this.x -= this.speed;
  }

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}

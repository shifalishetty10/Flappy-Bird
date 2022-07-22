var bird;
var pipes = [];
var img;
var prev_score = 0;
var gameOverSound;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');

  bird = new Bird();
  pipes.push(new Pipe());

  monoSynth = new p5.MonoSynth();
  gameOverSound = loadSound("sound/Fall_sound.mp3");

  var button = createButton("RESTART");
  button.position(width - 165, 8);
  let col = color(0, 100, 0);
  let col1 = color(255);
  button.style("color", col1);
  button.style("font-size", "30px");
  button.style("background-color", col);
  button.mousePressed(resetSketch);

}

function draw() {

  fill(135, 206, 235);
  stroke(135, 206, 235);
  rect(0, 0, width, height - 50);

  fill(244, 164, 96);
  stroke(210, 105, 30);
  strokeWeight(5);
  rect(0, height - 50, width, 50);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  fill(255);
  stroke(0, 100, 0);
  strokeWeight(4);
  textSize(30);
  text("SCORE = " + prev_score, 15, 35);

  for (let j = 0; j < pipes.length; j++) {
    if (bird.x > pipes[j].x && bird.x < pipes[j].x + pipes[j].w) {
      if (bird.y > pipes[j].top && bird.y < height - pipes[j].bottom) {
        prev_score++;
      }
    }
  }

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  if (Stop()) {
    bird.gravity = 0.6;
    try {
      gameOverSound.play();
    } catch (e) {}
    stopPipe();
  }

  bird.update();
  bird.show();

  if (!mousePressed) {
      setTimeout(Stop(), 5);
    }
  }


//Condition to stop the bird
function Stop() {
  if (bird.y > height - 50 - 50) {
    return true;
  }

  for (i = 0; i < pipes.length; i++) {
    if (bird.x > pipes[i].x && bird.x < pipes[i].x + pipes[i].w) {
      if (
        (bird.y > 0 && bird.y < pipes[i].top) ||
        (bird.y > height - pipes[i].bottom && bird.y < height)
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

}

//After the bird stops
function stopPipe() {

  bird.y = height - 50 - 50;

  filter(GRAY);
  textAlign(CENTER);
  fill(0);
  stroke(0);
  strokeWeight(1);
  textSize(45);
  text("OOPS! GAME ENDED", width / 2, height / 2 - 100);
  textAlign(CENTER);
  text("YOUR SCORE IS " + prev_score, width / 2, height / 2);
  text("Press RESTART button to restart the game", width / 2, height / 2 + 100);

  noLoop();
}

//Restart game
function resetSketch() {
  window.location.reload();
}

//Audio while playing
function playSynth() {

  userStartAudio();

  let note = random(["Fb4", "D4"]);
  let velocity = random();
  let time = 0;
  let dur = 1 / 6;
  monoSynth.play(note, velocity, time, dur);
}



//Mouse press triggering the bird to move up
function mousePressed() {

  bird.up();
  if (!Stop()) {
    playSynth();
  }

}

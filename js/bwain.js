// is equal to the actual max speed - 1
let MAX_SPEED = 4;

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

let allIcons = "*+-.'@~×^";
class Star {
  constructor(pos, dest, elem, speed) {
    this.currPos = pos;
    this.dest = dest;
    this.elem = elem;
    this.speed = speed;
  }
}

let width = window.innerWidth;
let height = window.innerHeight;
function makeStar(old) {
  let posX = getRandom(width);
  let posY = getRandom(height);
  let icon = allIcons[getRandom(allIcons.length)];

  let p = old == undefined ? document.createElement("p") : old;
  p.textContent = icon;
  p.style.position = "absolute";
  p.style.left = posX.toString() + "px";
  p.style.bottom = posY.toString() + "px";
  p.style.fontSize = 14 + (6 * Math.random()) + "px";
  p.style.margin = 0;

  let endX = getRandom(width);
  let endY = getRandom(height);

  let speedX = 0;
  let speedY = 0;
  do {
    speedX = 1 + getRandom(MAX_SPEED);
    speedY = 1 + getRandom(MAX_SPEED);
  } while ((posX - endX) % speedX != 0 || (posY - endY) % speedY != 0);

  p.style.opacity = ((speedX)/5 + (speedY)/5)/1;
  p.style.zIndex = parseInt((-1.1 + Math.random()) * 100).toString();
  
  document.body.append(p);

  return new Star([posX, posY], [endX, endY], p, [speedX, speedY]);
}

let stars = [];
function init() {
  for (let i = 0; i < 200; i++) {
    stars.push(makeStar(undefined));
  }
  setInterval(starMotion, 100);
}

function starMotion() {
  let toRemove = [];
  for (let i = 0; i < stars.length; i++) {
    let curr = stars[i].currPos;
    let dest = stars[i].dest;

    let d_x = Math.abs(curr[0] - dest[0]);
    let d_y = Math.abs(curr[1] - dest[1]);
    let n_x = (dest[0] - curr[0]);
    let n_y = (dest[1] - curr[1]);
    if (d_x < 1 || d_y < 1) {
      toRemove.push(i);
    } else {
      curr[0] += (n_x/d_x) * stars[i].speed[0];
      curr[1] += (n_y/d_y) * stars[i].speed[1];
      stars[i].elem.style.left = curr[0].toString() + "px";
      stars[i].elem.style.bottom = curr[1].toString() + "px";
      stars[i].currPos = curr;
    }
  }
  for (let i = 0; i < toRemove.length; i++) {
    let j = toRemove[i];

    let endX = getRandom(width);
    let endY = getRandom(height);
    stars[j].dest = [endX, endY];

    let speedX = 0;
    let speedY = 0;
    do {
      speedX = 1 + getRandom(MAX_SPEED);
      speedY = 1 + getRandom(MAX_SPEED);
    } while ((stars[j].currPos[0] - endX) % speedX != 0 || (stars[j].currPos[1] - endY) % speedY != 0);

    stars[j].elem.style.opacity = ((speedX)/5 + (speedY)/5)/1;
    stars[j].elem.style.zIndex = parseInt((-1.1 + Math.random()) * 100).toString();

    stars[j].speed = [speedX, speedY];
  }
}
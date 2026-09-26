//make opacity based on speed

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

function makeStar() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  let posX = getRandom(width);
  let posY = getRandom(height);
  let icon = allIcons[getRandom(allIcons.length)];

  let p = document.createElement("p");
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
    speedX = 1 + getRandom(4);
    speedY = 1 + getRandom(4);
  } while ((posX - endX) % speedX != 0 || (posY - endY) % speedY != 0);

  p.style.opacity = ((speedX)/5 + (speedY)/5)/1;
  p.style.zIndex = parseInt((-1.1 + Math.random()) * 100).toString();
  
  document.body.append(p);

  return new Star([posX, posY], [endX, endY], p, [speedX, speedY]);
}

let stars = [];
function init() {
  for (let i = 0; i < 200; i++) {
    stars.push(makeStar());
  }
  setInterval(starMotion, 100);
}

function starMotion() {
  let toRemove = [];
  for (let i = 0; i < stars.length; i++) {
    let curr = stars[i].currPos;
    let dest = stars[i].dest;
    if (curr[0] == dest[0] && curr[1] == dest[1]) {
      console.log("damn")
      toRemove.push(i);
    } else {
      curr[0] += ((dest[0] - curr[0])/Math.abs(curr[0] - dest[0])) * stars[i].speed[0];
      curr[1] += ((dest[1] - curr[1])/Math.abs(curr[1] - dest[1])) * stars[i].speed[1];
      stars[i].elem.style.left = curr[0].toString() + "px";
      stars[i].elem.style.bottom = curr[1].toString() + "px";
      stars[i].currPos = curr;
    }
  }
  for (let i = 0; i < toRemove.length; i++) {
    stars[i].elem.removeChild(document.body);
    stars[i] = makeStar();
  }
}
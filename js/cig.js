let random_letters = "$(){}[]+/|\\@?.,";

// returns a random number from 0 to max - 1
function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function init() {
  let width = window.innerWidth;
  let dimsRatio = (width)/(1920);
  let drawCount = 100*dimsRatio;
  
  for (let i = 0; i < drawCount; i++) {
    let maxLength = getRandom(25);
    console.log(maxLength);
    drawText(maxLength);
  }
}

/*
writing-mode: vertical-rl;
text-orientation: upright;
*/

function drawText(maxLength) {
  let content = "classified";
  content = content.substring(getRandom(content.length));

  console.log(maxLength);
  while (content.length < maxLength) {
    let rand = random_letters[getRandom(random_letters.length)];
    if (getRandom(2)) {
      content += rand;
    } else {
      content = rand + content;
    }
  }

  let width = window.innerWidth;

  let p = document.createElement("p");
  p.textContent = content;
  p.style.position = "absolute";
  p.style.top = "0";
  p.style.left = (Math.random() * width) + "px";
  let opacity = Math.random();
  p.style.opacity = opacity;
  p.style.fontSize = 14 + (6 * opacity) + "px";
  p.style.margin = 0;
  p.style.zIndex = parseInt((-1.1 + opacity) * 100).toString();

  p.style["writingMode"] = "vertical-rl";
  p.style["textOrientation"] = "upright";

  document.body.append(p);
}
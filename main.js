/*
issues: too much text on small screens
change selected text to ######## :D
*/


function init() {
    loadBackground();
}
function loadBackground() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dimsRatio = (width*height)/(1920*1200);
    let drawCount = 100*dimsRatio;
    if (drawCount < 50) drawCount = 50;
    console.log(drawCount);
    if (localStorage.getItem("drawPrev") == "true") {
        for (let i = 0; i < drawCount; i++) {
            drawText(width, height);
        }
    } else {
        localStorage.setItem("drawPrev", "true");
        let loadInterval = setInterval(() => {
            if (i == 100) clearInterval(loadInterval);
            drawText(width, height);
            i++;
        }, 50);
    }
}

let pChoices = ["silver", "silver", "silver", "silver",
    "#####", "#####",
    "a sphinx",
    "[redacted]"];
function drawText(width, height) {
    let p = document.createElement("p");
    p.textContent = pChoices[Math.floor(Math.random() * pChoices.length)];
    p.style.position = "absolute";
    p.style.bottom = (Math.random() * height) + "px";
    p.style.left = (Math.random() * width) + "px";
    let opacity = Math.random();
    p.style.opacity = opacity;
    p.style.fontSize = 14 + (6 * opacity) + "px";
    p.style.margin = 0;
    p.style.zIndex = "-1";
    document.body.append(p);
}
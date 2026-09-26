/*
issues:
    resize
    change selected text to ######## :D
*/

let categoriesEnabled = false;
let dims = [];

function setDims() {
    dims[0] = document.getElementById("categoriesContainer").clientWidth.toString() + "px";
    dims[1] = document.getElementById("categoriesContainer").clientWidth.toString() + "px";
}

function toggleCategories() {
    categoriesEnabled = !categoriesEnabled;
    let l = document.getElementsByClassName("categories");

    for (let i = 0; i < l.length; i++) {
        if (categoriesEnabled) {
            l[i].style.display = "block";
            document.getElementById("categoriesContainer").style["width"] = dims[0];
            document.getElementById("categoriesContainer").style["gridTemplateRows"] = "1fr 1fr";
            document.getElementById("categoriesContainer").style["gridTemplateColumns"] = "1fr 1fr";
            document.getElementById("literallyme").style.display = "none";
        } else {
            l[i].style.display = "none";
            document.getElementById("categoriesContainer").style["gridTemplateRows"] = "auto";
            document.getElementById("categoriesContainer").style["gridTemplateColumns"] = "auto";
            document.getElementById("literallyme").style.display = "block";
        }
    }
}

function init() {
    loadBackground();
    loadAbout();
}

function loadAbout() {
    if (Math.floor(Math.random()*100) > 90) {
        document.getElementById("about").innerText = "(lost in time~)";
    }
}

function loadBackground() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dimsRatio = (width*height)/(1920*1200);
    let drawCount = 100*dimsRatio;
    if (drawCount < 50) drawCount = 50;
    if (localStorage.getItem("drawPrev") == "true") {
        for (let i = 0; i < drawCount; i++) {
            drawText(width, height);
        }
    } else {
        let i = 0;
        localStorage.setItem("drawPrev", "true");
        let loadInterval = setInterval(() => {
            if (i == drawCount) clearInterval(loadInterval);
            drawText(width, height);
            i++;
        }, 50);
    }
}

let pChoices = ["silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver",
    "#####", "#####", "#####", "#####",
    "a sphinx", "a sphinx",
    "[redacted]", "[redacted]",
    "चांदी"];
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
    p.style.zIndex = parseInt((-1.1 + opacity) * 100).toString();
    document.body.append(p);
}
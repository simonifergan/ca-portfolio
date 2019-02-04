var SMILE_N = '<img src="img/smile/neutral0.png">';
var SMILE_SAD = '<img src="img/smile/sad.png">';
var SMILE_HAPPY = '<img src="img/smile/happy.png">';;
var SMILE_HINT = '<img src="img/smile/hint.png">';
var SMILE_WIN = '<img src="img/smile/win.png">';

function neutralSmile() {
    if (!gGame.isOn) return;
    let elSmile = document.querySelector('.smile');
    elSmile.innerHTML = SMILE_N;
}

function gameOverSmile() {
    let elSmile = document.querySelector('.smile');
    elSmile.innerHTML = SMILE_SAD;
}

function hintSmile() {
    let elSmile = document.querySelector('.smile');
    elSmile.innerHTML = SMILE_HINT;
}

function happySmile() {
    let elSmile = document.querySelector('.smile');
    elSmile.innerHTML = SMILE_HAPPY;
}

function winSmile() {
    let elSmile = document.querySelector('.smile');
    elSmile.innerHTML = SMILE_WIN;
}


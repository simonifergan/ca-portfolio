/*
    Created by: Simon Ron Ifergan
    2018
    v 1.00
*/


// canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var QUIT = false;

// Key booleans
var left = right = up = down = false;


// Sounds
var eatApple = new Audio("sounds/eatApple.wav");
var bump = new Audio("sounds/bump.wav");

/*Snake variables = change later to make robust
var snake = {
    x : canvas.width/2,
    y : canvas.height/2,
    xDir : 0,
    yDir : 0,
    distance : 4,
    rectSize : 10,
    tailArray : []
};
*/

// transfer to object the above

var x = canvas.width/2;;
var y = canvas.height/2;
var xDir = 0;
var yDir = 0;
const snakeDistance = 4;
const snakeRect = 10;

// Tail variables
var tailArray = [];

// Game border - old variable - delete later
const BORDER_LINE = 10;

// Apple(s) variables
const appleRadius = 7;
const appleRect = 12;
const appleToBorder = 15;
var appleAte = 1;
var perApple = 40;
var randomAgain = false;


// Handle apple x,y randomization
var xApple;
var yApple;

function randomAppleVariables() {
    xApple = Math.floor(Math.random() * canvas.width);
    yApple = Math.floor(Math.random() * canvas.height);
    if (xApple < appleToBorder) {
        randomAgain = true;
    } else if (xApple > canvas.width - appleToBorder) {
        randomAgain = true;
    } else if (yApple < appleToBorder) {
        randomAgain = true;
    } else if (yApple > canvas.height - appleToBorder) {
        randomAgain = true;
    } else { randomAgain = false; }
}

do {
    randomAppleVariables();
} while (randomAgain);



// Useless Function
function drawBorder() {
    ctx.beginPath();
    ctx.lineWidth="10";
    ctx.strokeStyle="white";
    ctx.rect(0,0,canvas.width,canvas.height); 
    ctx.stroke();
    ctx.closePath();
}

// Draw snake and its tail
function drawSnake() {
    ctx.beginPath();
    
    // Snake Head
    if (tailArray.length === 0) {
        ctx.fillStyle = "#00FF55";
    } else {
        // ctx.fillStyle = "brown";
        ctx.fillStyle = "#D54B20"
    }
    ctx.fillRect(x, y, snakeRect, snakeRect);

    // Draw tail
    for (i = 0; i < tailArray.length; i++) {
        if (tailArray[i].xTail === null && tailArray[i].yTail === null) {
            continue;
        }
        ctx.fillStyle = "#00FF55";
        ctx.fillRect(tailArray[i].xTail, tailArray[i].yTail, snakeRect,snakeRect);
    }
    
    ctx.closePath();
}

// Function to check whether apple will spawn on snake (and/or its tail)
function appleTouchSnake() {
    if (xApple === x) { return true;}

    if (yApple === y) { return true; }

    if (tailArray.length > 0) { 
        for (var i = 0; i < tailArray.length; i++) {
            if (xApple === tailArray[i].xTail) { return true;}
    
            if (yApple === tailArray[i].yTail) { return true; }
        }
    }
    return false;

}

// draw apple to canvas
function drawApple() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(xApple, yApple, appleRect, appleRect);
    ctx.fill();
    ctx.closePath();
}

// Reposition snake
function snakeMovement() {

    if (tailArray.length > 0) {
        for (i = tailArray.length - 1; i > 0; i--) {
            tailArray[i].xTail = tailArray[i-1].xTail;
            tailArray[i].yTail = tailArray[i-1].yTail;
        }
        tailArray[0].xTail = x;
        tailArray[0].yTail = y;
    }

    x += xDir;
    y += yDir;
}


function collisionDetection() {
    // Colliding with walls
    if (x > canvas.width - snakeRect) {
        bump.play();
        QUIT = true;
    } else if (x < 0) {
        bump.play();
        QUIT = true;
    } else if (y > canvas.height - snakeRect) {
        bump.play();
        QUIT = true;
    } else if (y < 0) {
        bump.play();
        QUIT = true;
    }

    // Collision with tail
    for (i = 0; i < tailArray.length; i++) {
        if (x === tailArray[i].xTail && y === tailArray[i].yTail) {
            bump.play();
            QUIT = true;
        }
    }

    // Eat the APPLE
    if (x <= xApple + appleRadius && x >= xApple - appleRadius && y <= yApple + appleRadius && y >= yApple - appleRadius) {
        
        // Play eating sound
        eatApple.play();
        
        do {
            randomAppleVariables();
        } while (randomAgain);
        
        var length = 2; // Change the length in order to change size of snake - 
                        // maybe for compatibility
        for (var i = 0; i < length; i++) {
            tailArray.push( {
                xTail: null, 
                yTail: null}
            );
        }

        // change scoreboard

        var scoreBoard = document.getElementById('scoreBox');
        scoreBoard.value = parseInt(scoreBoard.value) + (appleAte * perApple);
        appleAte++;
        
        // Print to console
        console.log(`Numbers of apple(s) eaten: ${appleAte - 1}`);
    }


}

// Key handlers
function keyDownHandler(e) {
    if (e.keyCode === 38 || e.keyCode === 87) {       // UP Key
        if (!down) {
            yDir = -snakeDistance;
            xDir = 0;
            up = down = true;
            left = right = false;
        }
    }
    else if (e.keyCode === 40 || e.keyCode === 83) {  // Down Key
        if (!up)
        {
            yDir = snakeDistance;
            xDir = 0;
            up = down = true;
            left = right = false;
        }
    }
    else if (e.keyCode === 37 || e.keyCode === 65) {  // Left Key
        if (!right) {
            yDir = 0;
            xDir = -snakeDistance;
            left = right = true;
            up = down = false;
        }
    }
    else if (e.keyCode === 39 || e.keyCode === 68) {  // Right Key
        if (!left) {
            yDir = 0;
            xDir = snakeDistance;
            up = down = false;
            left = right = true;
        }
    }
    else { return; }
}
    
    



document.addEventListener("keydown", keyDownHandler, false);

// Main function (update/draw)

function draw() {
    if (QUIT) { 
        alert('Game Over!\n\nYour snake collided with the environment :(\nPress "ok" to retry.');
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //drawBorder();
    
    snakeMovement();
    
    drawSnake();

    drawApple();

    collisionDetection();

    requestAnimationFrame(draw);
};

draw();


'use strict';
// Create random speed and row for enemy
var Random = function() {
    this.randomRow = Math.floor(Math.random()*3); //Enemy start from random row
    this.randomSpeed = Math.floor((Math.random()+0.5)*3)*6; //Enemy runs at random speed
    this.randomDistance = Math.floor((Math.random()+1)*6); // Enemy starts from random starting point
    this.x = -101*this.randomDistance;
    this.y = 63 + this.randomRow*83;    
};

// Enemies our player must avoid
var Enemy = function() {
    Random.call(this);
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*40*this.randomSpeed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.x>506) {
        Random.call(this);
    }
    ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y);
};

// Detect collisions with the player
Enemy.prototype.checkCollisions = function() {
    if (this.x<player.x && (this.x+50.5)>player.x && this.y===player.y) {
        alert('Oops, collision!');
        window.Resources.restart();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];


// //Generate an array of enemies
// var generator = function() {
//     // allEnemies.push(new Enemy());
//     // setInterval(function() {
//     //     allEnemies.push(new Enemy());
//     // }, (Math.random()+0.2)*1000);
//     allEnemies.push(new Enemy());
//     let times = 0;
//     let interval = setInterval(function() {
//         times += 1;
//         if (times === 5) {
//             clearInterval(interval);
//         }
//         allEnemies.push(new Enemy());
//         }, Math.random()*2000);
// };

//The player class
var Player = function() {
    this.you = 'images/char-boy.png';
    this.x = 505/2-50;
    this.y = 312;
};

//Update player on the screen
// Player.prototype.update = function() {
//     if (this.y===-20) { //if player reach river, return to the starter position
//         alert('You made it!!');
//         window.Resources.restart();
//     }
//     this.y += (this.down-this.up)*83;
//     this.x += (this.right-this.left)*101;
//     this.down=this.up=this.left=this.right= 0;
// };

//Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(window.Resources.get(this.you), this.x, this.y);
};

//Handle the keyboard input
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x>0.5) { //stop player from moving out from the left side of screen
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x<404.5) { //stop player from moving out from the right side of screen
                this.x += 101;
            }
            break;
        case 'up':
            this.y -= 83;
            if (this.y===-20) { //if player reach river, return to the starter position
                setTimeout(function(){
                    alert('You made it!!');
                    window.Resources.restart();
                }, 100);
            }            
            break;
        case 'down':
            if (this.y<312) { //player can't move out from the bottom of the screen
                this.y += 83;
            }
            break;
    }

};

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

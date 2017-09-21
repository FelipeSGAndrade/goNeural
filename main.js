"use strict";

let player;
let playerX = 0;
let playerY = 0;

function update() {
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

function right() {
  playerX += 5;
}

function left() {
  playerX -= 5;
}

function up() {
  playerY -= 5;
}

function down() {
  playerY += 5;
}

function initialize() {
  player = document.getElementById('player');
  setInterval(update, 1000)
}

window.onload = initialize;

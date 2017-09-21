"use strict";

const sizing = 10;
const borderX = 1000;
const borderY = 1000;

let player;
let playerX = 0;
let playerY = 0;

function random(min, max) {
  return Math.floor((Math.random() * max) + min);
}

function clamp(value, min, max) {
  if (value > max) return max;
  else if (value < min) return min;
  return value;
}

function update() {
  randomCommand();
  player.style.left = (playerX * sizing) + "px";
  player.style.top = (playerY * sizing) + "px";
}

function randomCommand() {
  const command = random(0, 4);
  console.log(command);
  switch(command) {
    case 0: right();
      break;

    case 1: left();
      break;

    case 2: up();
      break;

    case 3: down();
      break;
  }
}

function right() {
  playerX = clamp(playerX + 1, 0, borderX);
}

function left() {
  playerX = clamp(playerX - 1, 0, borderX);
}

function up() {
  playerY = clamp(playerY - 1, 0, borderY);
}

function down() {
  playerY = clamp(playerY + 1, 0, borderY);
}

function initialize() {
  player = document.getElementById('player');
  setInterval(update, 100)
}

window.onload = initialize;

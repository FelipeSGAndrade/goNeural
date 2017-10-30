'use strict';

const size = 10;
const margin = 20;

let game;
let player;
let playerX = 0;
let playerY = 0;

let neuralNetwork;
let mapManager;

function update() {
  //randomCommand();
  const inputs = getInputs();
  console.log(inputs);
  const outputs = neuralNetwork.processInputs(inputs);

  processOutput(outputs);
  drawPlayer();
}

function drawPlayer() {
  player.style.left = ((playerX * size)) + 'px';
  player.style.top = ((playerY * size)) + 'px';

  if (mapManager.map[playerY][playerX] === 1) player.style.color = 'red';
  else player.style.color = 'black';
}

function getInputs() {
  const inputFirstRow = mapManager.map[playerY].slice();
  let inputSecondRow = [1, 1, 1, 1, 1];
  if(playerY < mapManager.map.length - 1)
    inputSecondRow = mapManager.map[playerY + 1];

  inputFirstRow[playerX] = 2;
  const input = inputFirstRow.concat(inputSecondRow);

  return input.map((value) => value * 5);
}

function processOutput(outputs) {
  if(outputs.length !== 4)
    throw new Error('Invalid output length');

  if(outputs[0]) right();
  else if(outputs[1]) left();
  else if(outputs[2]) up();
  else if(outputs[3]) down();
}

function randomCommand() {
  const command = MathHelper.randomInt(0, 4);
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
  playerX = MathHelper.clamp(playerX + 1, 0, mapManager.mapWidth - 1);
  console.log('right');
}

function left() {
  playerX = MathHelper.clamp(playerX - 1, 0, mapManager.mapWidth - 1);
  console.log('left');
}

function up() {
  playerY = MathHelper.clamp(playerY - 1, 0, mapManager.mapHeight - 1);
  console.log('up');
}

function down() {
  playerY = MathHelper.clamp(playerY + 1, 0, mapManager.mapHeight - 1);
  console.log('down');
}

function initialize() {
  mapManager = CreateMapManager();
  player = document.getElementById('player');

  game = document.getElementById('game');
  game.style.left = margin + 'px';
  game.style.top = margin + 'px';

  mapManager.draw(game, size);
  playerX = mapManager.playerStart[0];
  playerY = mapManager.playerStart[1];

  game.style.height = (mapManager.mapHeight * size) + 'px';
  game.style.width = ((mapManager.mapWidth * size) - 2) + 'px';

  neuralNetwork = CreateNeuralNetwork();

  drawPlayer();

  setInterval(update, 2000);
}

window.onload = initialize;

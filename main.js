'use strict';

let gameList = [];
let updateInterval;

function update() {
  let updated = false;
  gameList.forEach((game) => {
    if(game.alive) {
      updated = true;
      game.update();
    }
  });

  if(!updated) clearInterval(updateInterval);
}

function initialize() {

  for(let i = 0; i < 5; i ++) {
    for(let j = 0; j < 5; j++) {
      gameList.push(CreateGame(j * 60, i * 80, 10, 20));
    }
  }

  updateInterval = setInterval(update, 1000);
}

window.onload = initialize;

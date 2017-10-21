"use strict";

const mapManager = {
  mapHeight: 0,
  mapWidth: 0,
  playerStart: [2, 0],
  map: [
    [0,0,0,0,0],
    [1,0,0,0,1],
    [0,0,1,0,0],
    [1,0,0,0,1],
    [1,1,0,1,1],
    [0,0,0,0,0]
  ],
  draw: function(game, size) {
    const map = this.map;
    this.mapHeight = map.length;
    this.mapWidth = map[0].length;

    for(let i = 0; i < map.length; i++) {
      for(let j = 0; j < map[i].length; j++) {
        if(map[i][j] === 1) {
          const line = document.createElement("label");
          line.innerText = "*";
          line.style.position = "absolute";
          line.style.top = ((i * size)) + "px";
          line.style.left = ((j * size)) + "px";
          game.append(line);
        }

        if(map[i].length > this.mapWidth) this.mapWidth = map[i].length;
      }
    }
  }
}

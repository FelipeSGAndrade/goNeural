'use strict'

let gameList = []
let updateInterval
let geneticManager;

function update() {
  let updated = false
  gameList.forEach((game) => {
    if(game.alive) {
      updated = true
      game.update()
    }
  })

  if(!updated) {
    clearInterval(updateInterval)

    geneticManager.process(gameList.map((game) => game.neuralNetwork))
  }
}

function initialize() {

  geneticManager = CreateGeneticManager()
  for(let i = 0; i < 5; i ++) {
    for(let j = 0; j < 5; j++) {
      const neuralNetwork = CreateNeuralNetwork()
      gameList.push(CreateGame(j * 60, i * 80, 10, 20, neuralNetwork))
    }
  }

  updateInterval = setInterval(update, 1000)
}

window.onload = initialize

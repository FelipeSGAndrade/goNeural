'use strict'

let gameList = []
let updateInterval
let geneticManager
let gamesX = 10
let gamesY = 10

function update() {
    let updated = false
    gameList.forEach((game) => {
        if (game.alive) {
            updated = true
            game.update()
        }
    })

    if (!updated) {
        clearInterval(updateInterval)
        endOfGame()
    }
}

function endOfGame() {
    const oldFlatNeuralNetworks = gameList.map((game) => {
        game.clear()

        return {
            weights: game.neuralNetwork.getFlatWeights(),
            fitness: game.neuralNetwork.fitness
        }
    })

    const newFlatNeuralNetworks = geneticManager.process(oldFlatNeuralNetworks)
    startGames(newFlatNeuralNetworks)
}

function startGames(flatNeuralNetworks) {

    gameList = []
    flatNeuralNetworks = flatNeuralNetworks || []
    let neuralCount = 0

    for (let i = 0; i < gamesX; i++) {
        for (let j = 0; j < gamesY; j++) {
            const neuralNetwork = CreateNeuralNetwork(flatNeuralNetworks[neuralCount] || null)
            gameList.push(CreateGame(j, i, 10, 20, neuralNetwork))
            neuralCount++
        }
    }

    updateInterval = setTimeout(update, 5)
}

function initialize() {

    geneticManager = CreateGeneticManager()
    startGames()
}

window.onload = initialize

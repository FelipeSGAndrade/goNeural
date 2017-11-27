'use strict'

let gameList = []
let updateInterval
let geneticManager
let startAgain = true

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

        if (!startAgain) return
        startAgain = false
        const oldFlatNeuralNetworks = gameList.map((game) => {
            return {
                weights: game.neuralNetwork.getFlatWeights()
            }
        })

        const newFlatNeuralNetworks = geneticManager.process(oldFlatNeuralNetworks)
        startGames(newFlatNeuralNetworks)
    }
}

function startGames(flatNeuralNetworks) {

    gameList = []
    flatNeuralNetworks = flatNeuralNetworks || []
    let neuralCount = 0

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const neuralNetwork = CreateNeuralNetwork(flatNeuralNetworks[neuralCount] || null)
            gameList.push(CreateGame(j * 60, i * 80, 10, 20, neuralNetwork))
            neuralCount++
        }
    }

    updateInterval = setInterval(update, 1000)
}

function initialize() {

    geneticManager = CreateGeneticManager()
    startGames()
}

window.onload = initialize

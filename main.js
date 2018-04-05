'use strict'

let gameList = []
let updateInterval
let geneticManager
let gamesX = 5
let gamesY = 200
let updateTime = 1
let drawTreshould = 50
let drawCount = drawTreshould

function update() {
    let updated = false
    gameList.forEach((game) => {
        if (game.alive) {
            updated = true
            game.update(drawCount > 10)
        }
    })

    if (!updated) endOfGame()
    else handleUpdate()
}

function endOfGame() {
    const oldFlatNeuralNetworks = gameList.map((game) => {
        // game.clear()

        return {
            weights: game.neuralNetwork.getFlatWeights(),
            fitness: game.neuralNetwork.fitness
        }
    })

    const newFlatNeuralNetworks = geneticManager.process(oldFlatNeuralNetworks)
    startGames(newFlatNeuralNetworks)
}

function createGames() {
    gameList = []

    for (let i = 0; i < gamesY; i++) {
        for (let j = 0; j < gamesX; j++) {
            const draw = (i < 2 && j < 5)
            gameList.push(CreateGame(j, i, 10, 20, draw))
        }
    }
}

function startGames(flatNeuralNetworks) {
    let neuralCount = 0
    flatNeuralNetworks = flatNeuralNetworks || []

    if(drawCount > drawTreshould) drawCount = 0
    else drawCount++

    for (let i = 0; i < gamesY; i++) {
        for (let j = 0; j < gamesX; j++) {
            const neuralNetwork = CreateNeuralNetwork(flatNeuralNetworks[neuralCount] || null)
            gameList[(i * gamesX) + j].startGame(neuralNetwork)
            neuralCount++
        }
    }

    handleUpdate()
}

function handleUpdate() {
    if(drawCount > drawTreshould)
        updateInterval = setTimeout(update, updateTime)
    else
        update()
}

function initialize() {

    geneticManager = CreateGeneticManager()
    createGames()
    startGames()
}

window.onload = initialize

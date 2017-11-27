"use strict"

const CreateNeuralNetwork = function(flatNeuralNetworks) {
    let log = false
    let topology = [10, 10, 10, 8, 4]
    let activationFunctions = [null, MathHelper.sigmoid, MathHelper.sigmoid, MathHelper.sigmoid, MathHelper.boolean]
    let weights = null
    let arestsCount = 0
    const layers = []

    if (flatNeuralNetworks) {
        if (flatNeuralNetworks.topology) topology = flatNeuralNetworks.topology
        if (flatNeuralNetworks.activationFunctions) activationFunctions = flatNeuralNetworks.activationFunctions
        if (flatNeuralNetworks.weights) weights = flatNeuralNetworks.weights
    }

    topology.forEach((nodeCount, index) => {
        if (index === 0) return
        const inputCount = topology[index - 1]

        let layerWeights = null
        if (weights) {
            layerWeights = weights.splice(0, inputCount * nodeCount)
            console.log('flat:' + layerWeights.length)
        }

        arestsCount += inputCount * nodeCount

        layers.push(CreateNeuralLayer(inputCount, nodeCount, activationFunctions[index], layerWeights))
    })

    if (log) console.log("arests count:", arestsCount)

    function processInputs(inputs) {
        if (!inputs.length || inputs.length !== topology[0]) {
            throw new Error('invalid input length')
        }

        let processed = inputs.slice()
        layers.forEach((layer) => {
            if (log) console.log('input:', processed)
            processed = layer.processInputs(processed)
        })

        if (log) console.log(processed)
        return processed
    }

    function getFlatWeights() {
        const layersWeights = layers.map((layer) => layer.getFlatWeights())
        return [].concat.apply([], layersWeights)
    }

    return {
        set log(bool) {
            log = bool
        },
        topology: topology,
        activationFunctions: activationFunctions,
        arestsCount: arestsCount,
        layers: layers,
        processInputs: processInputs,
        getFlatWeights: getFlatWeights
    }
}

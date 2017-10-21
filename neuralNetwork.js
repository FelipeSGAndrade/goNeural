"use strict";

const NeuralNetwork = {
  topology: [10, 10, 10, 8, 4],
  activationFunctions: [null, MathHelper.sigmoid, MathHelper.sigmoid, MathHelper.sigmoid, MathHelper.boolean],
  arestsCount: 0,
  layers: [],
  initialize: function() {
    this.topology.forEach((nodeCount, index) => {
      if(index === 0) return;
      const inputCount = this.topology[index - 1];

      this.arestsCount += inputCount * nodeCount;

      this.layers.push(NeuralLayer.create(inputCount, nodeCount, this.activationFunctions[index]));
    });

    console.log("arests count:", this.arestsCount)
  },
  processInputs: function(inputs) {
    if(!inputs.length || inputs.length !== this.topology[0]) {
      throw new Error('invalid input length');
    }

    let processed = inputs.slice();
    this.layers.forEach((layer) => {
      console.log('input:', processed);
      processed = layer.processInputs(processed);
    });

    console.log(processed);
    return processed;
  },
}

NeuralNetwork.initialize();

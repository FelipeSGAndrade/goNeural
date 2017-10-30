"use strict";

const CreateNeuralNetwork = function (topology, activationFunctions) {
  topology = topology || [10, 10, 10, 8, 4];
  activationFunctions = activationFunctions || [null, MathHelper.sigmoid, MathHelper.sigmoid, MathHelper.sigmoid, MathHelper.boolean];
  let arestsCount = 0;
  const layers = [];

  topology.forEach((nodeCount, index) => {
    if(index === 0) return;
    const inputCount = topology[index - 1];

    arestsCount += inputCount * nodeCount;

    layers.push(CreateNeuralLayer(inputCount, nodeCount, activationFunctions[index]));
  });

  console.log("arests count:", arestsCount);

  function processInputs(inputs) {
    if(!inputs.length || inputs.length !== topology[0]) {
      throw new Error('invalid input length');
    }

    let processed = inputs.slice();
    layers.forEach((layer) => {
      console.log('input:', processed);
      processed = layer.processInputs(processed);
    });

    console.log(processed);
    return processed;
  };

  return {
    topology: topology,
    activationFunctions: activationFunctions,
    arestsCount: arestsCount,
    layers: layers,
    processInputs: processInputs
  };
};

"use strict";

const CreateNeuralLayer = function (inputCount, nodeCount, activationFunction) {

    let weights = [];
    for(let i = 0; i < nodeCount; i++){
      weights.push([]);
      for(let j = 0; j < inputCount; j++) {
        weights[i].push(MathHelper.random(-1, 2));
      }
    }

    console.log('weigths:', weights);

    function processInputs(inputs) {
      if(!inputs.length || inputs.length !== inputCount) {
        throw new Error('invalid input length');
      }

      let sum = [];
      for(let i = 0; i < nodeCount; i++) {
          sum.push(
            inputs.reduce((last, current, index) => {
              return last + (current * weights[i][index]);
            }, 0)
          );
      }

      if(this.activationFunction) {
        return sum.map(this.activationFunction);
      }

      return sum;
    };

    return {
      inputCount: inputCount,
      nodeCount: nodeCount,
      weights: weights,
      activationFunction: activationFunction || null,
      processInputs: processInputs
    };
};

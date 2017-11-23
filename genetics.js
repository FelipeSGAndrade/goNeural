'use strict'

const CreateGeneticManager = () => {

  const process = (inputGroup) => {

    const parent1 = randomSelection(inputGroup)
    const parent2 = randomSelection(inputGroup)

    const child = crossover(parent1, parent2)

    const survivalGroup = inputGroup.splice(0, inputGroup.length - 1)
    survivalGroup.push(child)

    console.log(survivalGroup)

    return survivalGroup
  }

  const randomSelection = (inputGroup) => {
    return inputGroup[MathHelper.randomInt(0, inputGroup.length)]
  }

  const crossover = (parent1, parent2) => {
    console.log(parent1)
    console.log(parent2)

    const parent1Weights = parent1.getFlatWeights();
    const parent2Weights = parent2.getFlatWeights();

    console.log(parent1Weights.length)
    console.log(parent2Weights.length)

    const minimumDivision = Math.floor(parent1Weights.length / 4)
    const divisionPoint = MathHelper.randomInt(minimumDivision, parent1Weights.length - minimumDivision)

    console.log(parent1Weights.length - minimumDivision)
    console.log('min: ' + minimumDivision)
    console.log('div: ' + divisionPoint)

    const parent1Splice = parent1Weights.splice(0, divisionPoint)
    const parent2Splice = parent2Weights.splice(divisionPoint)

    console.log(parent1Splice.length)
    console.log(parent2Splice.length)

    const childWeights = parent1Splice.concat(parent2Splice)
    console.log(childWeights.length)
    return {
      fitness: null,
      weights: childWeights
    }
  }

  return {
      process: process
  }
}

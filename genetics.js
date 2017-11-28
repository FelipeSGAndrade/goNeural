'use strict'

const CreateGeneticManager = () => {

    const process = (inputGroup) => {

        const crossoverQtd = (inputGroup.length / 2) - 2
        const children = randomCrossovers(crossoverQtd, inputGroup)
        inputGroup.sort((item1, item2) => item2.fitness - item1.fitness)

        children.concat(crossover(inputGroup[0], inputGroup[1]))
        console.log(children.length)
        const survivalGroup = inputGroup.slice(0, inputGroup.length - children.length)
        survivalGroup.concat(children)

        return survivalGroup
    }

    const sortByFitness = (inputGroup) => {

        return inputGroup.sort((item1, item2) => item2.fitness - item1.fitness)
    }

    const randomSelection = (inputGroup) => {
        return inputGroup[MathHelper.randomInt(0, inputGroup.length)]
    }

    const randomCrossovers = (quantity, inputGroup) => {

        let children = []
        for(let i = 0; i < quantity; i++) {

            const parent1 = randomSelection(inputGroup)
            const parent2 = randomSelection(inputGroup)

            children = children.concat(crossover(parent1, parent2))
        }

        return children
    }

    const crossover = (parent1, parent2) => {

        const parent1Weights = parent1.weights
        const parent2Weights = parent2.weights

        const minimumDivision = Math.floor(parent1Weights.length / 4)
        const divisionPoint = MathHelper.randomInt(minimumDivision, parent1Weights.length - minimumDivision)

        const parent1Slice1 = parent1Weights.slice(0, divisionPoint)
        const parent1Slice2 = parent1Weights.slice(divisionPoint)

        const parent2Slice1 = parent2Weights.slice(0, divisionPoint)
        const parent2Slice2 = parent2Weights.slice(divisionPoint)

        const child1Weights = mutate(parent1Slice1.concat(parent2Slice2))
        const child2Weights = mutate(parent2Slice1.concat(parent1Slice2))

        return [{
            weights: child1Weights
        }, {
            weights: child2Weights
        }]
    }

    const mutate = (childWeights) => {

        const mutations = MathHelper.randomInt(0, 10)

        for(let i = 0; i < mutations; i++) {
            const gene = MathHelper.randomInt(0, childWeights.length)
            childWeights[gene] = MathHelper.random(-1, 1)
        }

        return childWeights
    }

    return {
        process: process
    }
}

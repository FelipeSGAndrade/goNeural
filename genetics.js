'use strict'

const CreateGeneticManager = () => {

    const process = (inputGroup) => {
        sortByFitnessDesc(inputGroup)

        const crossoverQtd = (inputGroup.length / 2) - 4
        const children = repeatedCrossovers(crossoverQtd, inputGroup, tournament2OutOfk, bitSwapCrossover, randomIncrementMutation)
        children.concat(blockSwapCrossover(inputGroup[0], inputGroup[1]))

        const survivalGroup = inputGroup.slice(0, inputGroup.length - children.length)
        survivalGroup.concat(children)

        return survivalGroup
    }

    const sortByFitnessDesc = (inputGroup) => {
        return inputGroup.sort((item1, item2) => item2.fitness - item1.fitness)
    }

    const sortByFitnessAsc = (inputGroup) => {
        return inputGroup.sort((item1, item2) => item1.fitness - item2.fitness)
    }

    const repeatedCrossovers = (quantity, inputGroup, selectionFunction, crossoverFunction, mutationFunction) => {

        let allChildren = []
        for (let i = 0; i < quantity; i++) {

            const parents = selectionFunction(inputGroup)

            const children = crossoverFunction(parents[0], parents[1])

            children[0].weights = mutationFunction(children[0].weights)
            children[1].weights = mutationFunction(children[1].weights)

            allChildren = allChildren.concat(children)
        }

        return allChildren
    }

    const randomSelection = (inputGroup) => {
        return [
            inputGroup[MathHelper.randomInt(0, inputGroup.length)],
            inputGroup[MathHelper.randomInt(0, inputGroup.length)]
        ]
    }

    const tournamentPairSelection = (inputGroup, k) => {
        k = k || 3

        return [
            tournamentSelection(inputGroup, k),
            tournamentSelection(inputGroup, k)
        ]
    }

    const tournamentSelection = (inputGroup, k) => {
        let bestFitness = 0
        let bestParent = null

        for (let i = 0; i < k; i++) {
            const current = inputGroup[MathHelper.randomInt(0, inputGroup.length)]
            if (current.fitness >= bestFitness) {
                bestFitness = current.fitness
                bestParent = current
            }
        }

        return bestParent
    }

    const tournament2OutOfk = (inputGroup, k) => {
        k = k || 5

        let bestFitness = [-1, -1]
        let bestParents = [null, null]

        for (let i = 0; i < k; i++) {
            const current = inputGroup[MathHelper.randomInt(0, inputGroup.length)]
            if (current.fitness >= bestFitness[0]) {
                bestFitness[1] = bestFitness[0]
                bestParents[1] = bestParents[0]

                bestFitness[0] = current.fitness
                bestParents[0] = current
            } else if (current.fitness >= bestFitness[1]) {
                bestFitness[1] = current.fitness
                bestParents[1] = current
            }
        }

        return bestParents
    }

    const wheelSelection = (inputGroup) => {
        const sum = fitnessSum(inputGroup)

        const pointer1 = MathHelper.randomInt(0, sum)
        const pointer2 = MathHelper.randomInt(0, sum)

        return [
            rollWheel(inputGroup, sum, pointer1),
            rollWheel(inputGroup, sum, pointer2)
        ]
    }

    const rollWheel = (inputGroup, sum, pointer) => {
        let partialSum = 0
        for (let i = inputGroup.length - 1; i >= 0; i--) {
            partialSum += inputGroup[i].fitness
            if (partialSum >= pointer) {
                return inputGroup[i]
            }
        }

        throw new Error('No parent selected')
    }

    const fitnessSum = (list) => {
        return list.reduce((sum, current) => {
            return sum + current.fitness
        }, 0)
    }

    const blockSwapCrossover = (parent1, parent2) => {

        const parent1Weights = parent1.weights
        const parent2Weights = parent2.weights

        const minimumDivision = Math.floor(parent1Weights.length / 4)
        const divisionPoint = MathHelper.randomInt(minimumDivision, parent1Weights.length - minimumDivision)

        const parent1Slice1 = parent1Weights.slice(0, divisionPoint)
        const parent1Slice2 = parent1Weights.slice(divisionPoint)

        const parent2Slice1 = parent2Weights.slice(0, divisionPoint)
        const parent2Slice2 = parent2Weights.slice(divisionPoint)

        const child1Weights = parent1Slice1.concat(parent2Slice2)
        const child2Weights = parent2Slice1.concat(parent1Slice2)

        return [{
            weights: child1Weights
        }, {
            weights: child2Weights
        }]
    }

    const bitSwapCrossover = (parent1, parent2) => {

        const parentWeights = [
            parent1.weights,
            parent2.weights
        ]

        const childWeights = [
            [],
            []
        ]

        for (let i = 0; i < parentWeights[0].length; i++) {
            if (MathHelper.random(0, 1) < 0.6) {
                childWeights[0][i] = parentWeights[0][i]
                childWeights[1][i] = parentWeights[1][i]
            } else {
                childWeights[0][i] = parentWeights[1][i]
                childWeights[1][i] = parentWeights[0][i]
            }
        }

        return [{
            weights: childWeights[0]
        }, {
            weights: childWeights[1]
        }]
    }

    const randomMutation = (childWeights) => {
        const noMutationChance = 5
        const mutationMax = 10
        let mutations = MathHelper.randomInt(0, noMutationChance + mutationMax + 1)

        if (mutations <= noMutationChance) return childWeights

        mutations = mutations - noMutationChance

        for (let i = 0; i < mutations; i++) {
            const gene = MathHelper.randomInt(0, childWeights.length)
            const value = MathHelper.random(-1, 1)
            childWeights[gene] = value
        }

        return childWeights
    }

    const randomIncrementMutation = (childWeights) => {
        const noMutationChance = 5
        const mutationMax = 1 
        let mutations = MathHelper.randomInt(0, noMutationChance + mutationMax + 1)

        if (mutations <= noMutationChance) return childWeights

        mutations = mutations - noMutationChance

        for (let i = 0; i < mutations; i++) {
            const gene = MathHelper.randomInt(0, childWeights.length)
            const value = MathHelper.random(-1, 1)
            childWeights[gene] = MathHelper.clamp(childWeights[gene] + value, -1, 1)
        }

        return childWeights
    }

    return {
        process: process
    }
}

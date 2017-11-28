'use strict'

const CreateGame = function(xoffset, yoffset, size, margin, neuralNetwork) {
    let log = false
    let player
    let playerX = 0
    let playerY = 0
    let mapManager
    let game
    let alive = true
    let ticks = 0

    function update() {
        //randomCommand()
        const inputs = getInputs()
        if (log) console.log(inputs)
        const outputs = neuralNetwork.processInputs(inputs)
        ticks++

        if (!processOutput(outputs) || ticks > 5)
            endGame()
        else {
            neuralNetwork.fitness++
        }

        drawPlayer()
    }

    function drawPlayer() {
        player.style.left = ((playerX * size)) + 'px'
        player.style.top = ((playerY * size)) + 'px'

        if (mapManager.map[playerY][playerX] === 1) player.style.color = 'red'
        else if (playerY > 3) player.style.color = 'green'
        else player.style.color = 'black'
    }

    function getInputs() {
        const inputFirstRow = mapManager.map[playerY].slice()
        let inputSecondRow = [1, 1, 1, 1, 1]
        if (playerY < mapManager.map.length - 1)
            inputSecondRow = mapManager.map[playerY + 1]

        inputFirstRow[playerX] = 2
        const input = inputFirstRow.concat(inputSecondRow)

        return input.map((value) => value * 5)
    }

    function processOutput(outputs) {
        if (outputs.length !== 4)
            throw new Error('Invalid output length')

        let validMovement = false
        if (outputs[0]) validMovement = right()
        else if (outputs[1]) validMovement = left()
        else if (outputs[2]) validMovement = up()
        else if (outputs[3]) validMovement = down()

        return validMovement
    }

    function randomCommand() {
        const command = MathHelper.randomInt(0, 4)
        switch (command) {
            case 0:
                right()
                break

            case 1:
                left()
                break

            case 2:
                up()
                break

            case 3:
                down()
                break
        }
    }

    function right() {
        const nextPlayerX = MathHelper.clamp(playerX + 1, 0, mapManager.mapWidth - 1)
        let test = move(nextPlayerX, playerY)
        if (log) console.log('right = ', test)
        return test
    }

    function left() {
        const nextPlayerX = MathHelper.clamp(playerX - 1, 0, mapManager.mapWidth - 1)
        if (log) console.log('left')
        return move(nextPlayerX, playerY)
    }

    function up() {
        const nextPlayerY = MathHelper.clamp(playerY - 1, 0, mapManager.mapHeight - 1)
        if (log) console.log('up')
        return move(playerX, nextPlayerY)
    }

    function down() {
        const nextPlayerY = MathHelper.clamp(playerY + 1, 0, mapManager.mapHeight - 1)
        if (log) console.log('down')
        return move(playerX, nextPlayerY)
    }

    function move(nextX, nextY) {
        if (nextX === playerX && nextY === playerY) return false
        if (log) console.log(mapManager.mapPosition(nextX, nextY))
        if (mapManager.mapPosition(nextX, nextY) !== 0) return false

        playerX = nextX
        playerY = nextY
        return true
    }

    function endGame() {
        if (alive) alive = false
        neuralNetwork.fitness += playerY * 10

        if (neuralNetwork.fitness > 40) {
            alert("WOW")
        }
    }

    function clear() {
        game.remove()
    }

    mapManager = CreateMapManager()
    game = document.createElement('div')
    game.style.position = 'absolute'
    game.style.border = '1px solid black'
    game.style.left = (xoffset + margin) + 'px'
    game.style.top = (yoffset + margin) + 'px'

    player = document.createElement('label')
    player.innerText = '*'
    player.style.position = 'absolute'
    player.style.zIndex = '5'

    game.appendChild(player)
    document.body.appendChild(game)

    mapManager.draw(game, size)
    playerX = mapManager.playerStart[0]
    playerY = mapManager.playerStart[1]

    game.style.height = (mapManager.mapHeight * size) + 'px'
    game.style.width = ((mapManager.mapWidth * size) - 2) + 'px'

    drawPlayer()

    return {
        set log(bool) {
            log = bool
        },
        get alive() {
            return alive
        },
        update: update,
        neuralNetwork: neuralNetwork,
        clear: clear
    }
}

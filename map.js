"use strict"

const CreateMapManager = function() {
    let mapHeight = 0
    let mapWidth = 0
    const playerStart = [2, 0]
    const map = [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ]

    mapHeight = map.length
    mapWidth = map[0].length

    function draw(game, size) {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 1) {
                    const line = document.createElement("label")
                    line.innerText = "*"
                    line.style.position = "absolute"
                    line.style.top = ((i * size)) + "px"
                    line.style.left = ((j * size)) + "px"
                    game.append(line)
                }

                if (map[i].length > mapWidth) mapWidth = map[i].length
            }
        }
    }

    function mapPosition(x, y) {
        return map[y][x]
    }

    return {
        get mapHeight() {
            return mapHeight
        },
        get mapWidth() {
            return mapWidth
        },
        get playerStart() {
            return playerStart
        },
        get map() {
            return map
        },
        mapPosition: mapPosition,
        draw: draw
    }
}

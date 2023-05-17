
class AI {
    constructor({ available_space: available_space }) {
        this.available_space = available_space
        this.directions = []
        this.mode = Ghost_mode.SLEEP
        this.timer = 0
    }

    bfs(x, y) {
        var distance = new Array(NUMBER_OF_TILES)
        for (var i = 0; i < NUMBER_OF_TILES; i++) distance[i] = new Array(NUMBER_OF_TILES).fill(Infinity)

        var queue = []
        queue.push({ x: x, y: y, d: 0 })
        while (queue.length > 0) {
            var temp = queue.shift()
            if (distance[temp.y][temp.x] < Infinity) continue
            distance[temp.y][temp.x] = temp.d
            if (temp.x > 0 && !is_wall(current_map[temp.y][temp.x - 1]))
                queue.push({ x: temp.x - 1, y: temp.y, d: temp.d + 1 })
            if (temp.x < NUMBER_OF_TILES - 1 && !is_wall(current_map[temp.y][temp.x + 1]))
                queue.push({ x: temp.x + 1, y: temp.y, d: temp.d + 1 })
            if (temp.y > 0 && !is_wall(current_map[temp.y - 1][temp.x]))
                queue.push({ x: temp.x, y: temp.y - 1, d: temp.d + 1 })
            if (temp.y < NUMBER_OF_TILES - 1 && !is_wall(current_map[temp.y + 1][temp.x]))
                queue.push({ x: temp.x, y: temp.y + 1, d: temp.d + 1 })
        }
        return distance
    }

    get_path(x, y, distance) {
        var dist = distance[y][x]
        while (dist > 0) {
            if (x > 0 && distance[y][x - 1] < dist) {
                this.directions.push(Direction.right)
                dist--;
                x--;
                continue;
            }

            if (x < NUMBER_OF_TILES - 1 && distance[y][x + 1] < dist) {
                this.directions.push(Direction.left)
                dist--;
                x++;
                continue;
            }

            if (y > 0 && distance[y - 1][x] < dist) {
                this.directions.push(Direction.down)
                dist--;
                y--;
                continue;
            }

            if (y < NUMBER_OF_TILES - 1 && distance[y + 1][x] < dist) {
                this.directions.push(Direction.up)
                dist--;
                y++;
                continue;
            }
        }
    }

    search_for_free(x, y, direction, distance) {
        if (direction === Direction.left) {
            let xm = x - 4
            while (xm >= 0) {
                if (!is_wall(current_map[y][xm]) && distance[y][xm] < Infinity) {
                    return { 'x': xm, 'y': y }
                }
                xm--
            }
        } else if (direction === Direction.right) {
            let xm = x - 4
            while (xm < NUMBER_OF_TILES) {
                if (!is_wall(current_map[y][xm]) && distance[y][xm] < Infinity) {
                    return { 'x': xm, 'y': y }
                }
                xm++
            }
        } else if (direction === Direction.up) {
            let ym = y - 4
            while (ym >= 0) {
                if (!is_wall(current_map[ym][x]) && distance[ym][x] < Infinity) {
                    return { 'x': x, 'y': ym }
                }
                ym--
            }
        } else if (direction === Direction.down) {
            let ym = y + 4
            while (ym < NUMBER_OF_TILES) {
                if (!is_wall(current_map[ym][x])  && distance[ym][x] < Infinity) {
                    return { 'x': x, 'y': ym }
                }
                ym++
            }
        }
        return { 'x': x, 'y': y }
    }
}

class Random_chase extends AI {
    constructor({ available_space }) {
        super({ available_space })
        this.mode = Ghost_mode.CHASE
    }

    next_move(posX, posY) {
        if(this.mode === Ghost_mode.FRIGHTENED) {
            //TODO
        }
        if (this.directions.length == 0) {
            var x = Math.floor(Math.random() * NUMBER_OF_TILES)
            var y = Math.floor(Math.random() * NUMBER_OF_TILES)

            while (!this.available_space[y][x]) {
                x = Math.floor(Math.random() * NUMBER_OF_TILES)
                y = Math.floor(Math.random() * NUMBER_OF_TILES)
            }
            var distance = this.bfs(posX, posY)
            this.get_path(x, y, distance)
        }
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()
    }
}

class Pac_chase extends AI {
    constructor({ available_space, original_position }) {
        super({ available_space })
        this.original_position = original_position
        this.mode = Ghost_mode.CHASE
    }

    next_move(posX, posY) {
        if(this.mode === Ghost_mode.FRIGHTENED) {
            //TODO
        }
        if (game_second % 15 === 0 && this.mode === Ghost_mode.CHASE) {
            this.mode = Ghost_mode.SCATTER
            this.directions = []
            var distance = this.bfs(posX, posY)
            this.get_path(parseInt(this.original_position.x / SPRITE_SIZE), parseInt(this.original_position.y / SPRITE_SIZE), distance)
            if (this.directions.length == 0) return Direction.stationary
            return this.directions.pop()
        }
        if (this.mode === Ghost_mode.SCATTER) {
            if (this.directions.length != 0) {
                return this.directions.pop()
            }
            this.mode = Ghost_mode.CHASE
        }
        this.directions = []
        var distance = this.bfs(posX, posY)
        this.get_path(parseInt(pacman.position.x / SPRITE_SIZE), parseInt(pacman.position.y / SPRITE_SIZE), distance)
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()
    }
}

class Foreshadow_chase extends AI {
    constructor({ available_space, original_position }) {
        super({ available_space })
        this.original_position = original_position
        this.mode = Ghost_mode.CHASE
    }

    next_move(posX, posY) {
        if(this.mode === Ghost_mode.FRIGHTENED) {
            //TODO
        }
        if (game_second % 30 == 0 && this.mode === Ghost_mode.CHASE) {
            this.mode = Ghost_mode.SCATTER
            this.directions = []
            var distance = this.bfs(posX, posY)
            this.get_path(parseInt(this.original_position.x / SPRITE_SIZE), parseInt(this.original_position.y / SPRITE_SIZE), distance)
            if (this.directions.length == 0) return Direction.stationary
            return this.directions.pop()
        }
        if (this.mode === Ghost_mode.SCATTER) {
            if (this.directions.length != 0) {
                return this.directions.pop()
            }
            this.mode = Ghost_mode.CHASE
        }
        this.directions = []
        var distance = this.bfs(posX, posY)
        let position = this.search_for_free(parseInt(pacman.position.x / SPRITE_SIZE), parseInt(pacman.position.y / SPRITE_SIZE), pacman.get_direction(), distance)
        this.get_path(position.x, position.y, distance)
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()

    }
}
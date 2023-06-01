
class AI {
    constructor({ available_space: available_space, original_position: original_position }) {
        this.available_space = available_space
        this.original_position = original_position
        this.directions = []
        this.mode = Ghost_mode.CHASE
    }

    bfs(x, y) {
        let distance = new Array(NUMBER_OF_TILES)
        for (let i = 0; i < NUMBER_OF_TILES; i++) distance[i] = new Array(NUMBER_OF_TILES).fill(Infinity)

        let queue = []
        queue.push({ x: x, y: y, d: 0 })
        while (queue.length > 0) {
            let temp = queue.shift()
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
        let dist = distance[y][x]
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
                if (!is_wall(current_map[ym][x]) && distance[ym][x] < Infinity) {
                    return { 'x': x, 'y': ym }
                }
                ym++
            }
        }
        return { 'x': x, 'y': y }
    }

    scatter(posX, posY) {
        this.mode = Ghost_mode.SCATTER
        this.directions = []
        let distance = this.bfs(posX, posY)
        this.get_path(parseInt(this.original_position.x / SPRITE_SIZE), parseInt(this.original_position.y / SPRITE_SIZE), distance)
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()
    }

    chase(posX, posY) {
        this.directions = []
        let distance = this.bfs(posX, posY)
        this.get_path(parseInt(pacman.position.x / SPRITE_SIZE), parseInt(pacman.position.y / SPRITE_SIZE), distance)
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()
    }
}

class Random_chase extends AI {
    constructor({ available_space, original_position }) {
        super({ available_space, original_position })
    }

    next_move(posX, posY) {
        if (this.mode === Ghost_mode.FRIGHTENED) {
            // it should behave in the same way
        }
        if (this.directions.length == 0) {
            let x = Math.floor(Math.random() * NUMBER_OF_TILES)
            let y = Math.floor(Math.random() * NUMBER_OF_TILES)

            while (!this.available_space[y][x]) {
                x = Math.floor(Math.random() * NUMBER_OF_TILES)
                y = Math.floor(Math.random() * NUMBER_OF_TILES)
            }
            let distance = this.bfs(posX, posY)
            this.get_path(x, y, distance)
        }
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()
    }
}

class Pac_chase extends AI {
    constructor({ available_space, original_position }) {
        super({ available_space, original_position })
    }

    next_move(posX, posY) {
        if (this.mode === Ghost_mode.FRIGHTENED) {
            return Random_chase.next_move(posX, posY)
        }
        if (game_second % 20 === 0 && this.mode === Ghost_mode.CHASE) {
            return this.scatter(posX, posY)
        }
        if (this.mode === Ghost_mode.SCATTER) {
            if (this.directions.length != 0) {
                return this.directions.pop()
            }
            this.mode = Ghost_mode.CHASE
        }
        return this.chase(posX, posY)
    }
}

class Foreshadow_chase extends AI {
    constructor({ available_space, original_position }) {
        super({ available_space, original_position })
    }

    next_move(posX, posY) {
        if (this.mode === Ghost_mode.FRIGHTENED) {
            return Random_chase.next_move(posX, posY)
        }
        if (game_second % 20 == 0 && this.mode === Ghost_mode.CHASE) {
            return this.scatter(posX, posY)
        }
        if (this.mode === Ghost_mode.SCATTER) {
            if (this.directions.length != 0) {
                return this.directions.pop()
            }
            this.mode = Ghost_mode.CHASE
        }
        this.directions = []
        let distance = this.bfs(posX, posY)
        let position = this.search_for_free(parseInt(pacman.position.x / SPRITE_SIZE), parseInt(pacman.position.y / SPRITE_SIZE), pacman.get_direction(), distance)
        this.get_path(position.x, position.y, distance)
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()

    }
}

class Pacrand_chase extends AI {
    constructor({ available_space, original_position }) {
        super({ available_space, original_position })
    }

    next_move(posX, posY) {
        if (this.mode === Ghost_mode.FRIGHTENED) {
            return Random_chase.next_move(posX, posY)
        }
        if (game_second % 20 == 0 && this.mode === Ghost_mode.CHASE) {
            return this.scatter(posX, posY)
        }
        if (this.mode === Ghost_mode.SCATTER) {
            if (this.directions.length != 0) {
                return this.directions.pop()
            }
            this.mode = Ghost_mode.CHASE
        }
        let distance = this.bfs(posX, posY)
        if (distance[parseInt(pacman.position.y / SPRITE_SIZE)][parseInt(pacman.position.x / SPRITE_SIZE)] <= 8) {
            if (this.directions.length == 0) {
                let x = Math.floor(Math.random() * NUMBER_OF_TILES)
                let y = Math.floor(Math.random() * NUMBER_OF_TILES)

                while (!this.available_space[y][x]) {
                    x = Math.floor(Math.random() * NUMBER_OF_TILES)
                    y = Math.floor(Math.random() * NUMBER_OF_TILES)
                }
                this.get_path(x, y, distance)
            }
            if (this.directions.length == 0) return Direction.stationary
            return this.directions.pop()
        }

        return this.chase(posX, posY)
    }
}

class Vector_chase extends AI {
    constructor({ available_space, original_position }) {
        super({ available_space, original_position })
    }

    next_move(posX, posY) {
        if (this.mode === Ghost_mode.FRIGHTENED) {
            return Random_chase.next_move(posX, posY)
        }
        if (game_second % 20 === 0 && this.mode === Ghost_mode.CHASE) {
            return this.scatter(posX, posY)
        }
        if (this.mode === Ghost_mode.SCATTER) {
            if (this.directions.length != 0) {
                return this.directions.pop()
            }
            this.mode = Ghost_mode.CHASE
        }

        let px = parseInt(pacman.position.x / SPRITE_SIZE)
        let rx = parseInt(ghosts[1].position.x / SPRITE_SIZE)
        let py = parseInt(pacman.position.y / SPRITE_SIZE)
        let ry = parseInt(ghosts[1].position.y / SPRITE_SIZE)
        px = px + (px - rx)
        py = py + (py - ry)
        let distance = this.bfs(posX, posY)
        while (px >= 0 && py >= 0 && py < NUMBER_OF_TILES && px < NUMBER_OF_TILES) {
            if (distance[py][px] < Infinity) {
                this.get_path(px, py, distance)
                if (this.directions.length == 0) return Direction.stationary
                return this.directions.pop()
            }
            px += 1
            py += 1
        }

        px = 2 * parseInt(pacman.position.x / SPRITE_SIZE) - rx
        py = 2 * parseInt(pacman.position.y / SPRITE_SIZE) - ry
        while (px >= 0 && py >= 0 && py < NUMBER_OF_TILES && px < NUMBER_OF_TILES) {
            if (distance[py][px] < Infinity) {
                this.get_path(px, py, distance)
                if (this.directions.length == 0) return Direction.stationary
                return this.directions.pop()
            }
            px -= 1
            py -= 1
        }

        this.get_path(parseInt(pacman.position.x / SPRITE_SIZE), parseInt(pacman.position.y / SPRITE_SIZE), distance)
        if (this.directions.length == 0) return Direction.stationary
        return this.directions.pop()

    }
}
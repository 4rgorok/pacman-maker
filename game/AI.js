
class AI{
    constructor({avaiable_space}){
        this.avaiable_space = avaiable_space
        this.directions = []
    }

    bfs(x, y)
    {
        var distance = new Array(NUMBER_OF_TILES)
        for(var i = 0; i < NUMBER_OF_TILES; i++) distance[i] = new Array(NUMBER_OF_TILES).fill(Infinity)

        var queue = []
        queue.push({x:x, y: y, d: 0})
        while(queue.length > 0)
        {
            var temp = queue.shift()
            if(distance[temp.y][temp.x] < Infinity)continue
            distance[temp.y][temp.x] = temp.d
            if(temp.x > 0 && !is_wall(current_map[temp.y][temp.x - 1]))
                queue.push({x:temp.x-1, y:temp.y, d: temp.d + 1})
            if(temp.x < NUMBER_OF_TILES - 1 && !is_wall(current_map[temp.y][temp.x + 1]))
                queue.push({x:temp.x+1, y:temp.y, d: temp.d + 1})
            if(temp.y > 0 && !is_wall(current_map[temp.y - 1][temp.x]))
                queue.push({x:temp.x, y:temp.y - 1, d: temp.d + 1})
            if(temp.y < NUMBER_OF_TILES - 1 && !is_wall(current_map[temp.y + 1][temp.x]))
                queue.push({x:temp.x, y:temp.y + 1, d: temp.d + 1})
        }
        return distance
    }

    get_path(x, y, distance)
    {
        var dist = distance[y][x]
        while(dist > 0)
        {
            if(x > 0 && distance[y][x-1] < dist)
            {
                this.directions.push(Direction.right)
                dist--;
                x--;
                continue;
            }
                
            if(x < NUMBER_OF_TILES - 1 && distance[y][x+1] < dist)
            {
                this.directions.push(Direction.left)
                dist--;
                x++;
                continue;
            }
                
            if(y > 0 && distance[y - 1][x] < dist)
            {
                this.directions.push(Direction.down)
                dist--;
                y--;
                continue;
            }
                
            if(y < NUMBER_OF_TILES - 1 && distance[y + 1][x] < dist)
            {
                this.directions.push(Direction.up)
                dist--;
                y++;
                continue;
            } 
        }
    }
}

class Random_chase extends AI{
    constructor({avaiable_space}){
        super({avaiable_space})
    }

    next_move(posX, posY)
    {
        if(this.directions.length == 0){
            var x = Math.floor(Math.random() * NUMBER_OF_TILES)
            var y = Math.floor(Math.random() * NUMBER_OF_TILES)
            
            while(!this.avaiable_space[y][x])
            {
                x = Math.floor(Math.random() * NUMBER_OF_TILES)
                y = Math.floor(Math.random() * NUMBER_OF_TILES)
            }
            var distance = this.bfs(posX, posY)
            this.get_path(x, y, distance)
        }
        if(this.directions.length == 0) return Direction.stationary
        return this.directions.pop()
    }
}

class Pac_chase extends AI{
    constructor({avaiable_space}){
        super({avaiable_space})
    }

    next_move(posX, posY)
    {
        this.directions = []
        var distance = this.bfs(posX, posY)
        this.get_path(parseInt(pacman.position.x / SPRITE_SIZE), parseInt(pacman.position.y / SPRITE_SIZE), distance)
        
        if(this.directions.length == 0) return Direction.stationary
        return this.directions.pop()
    }
}
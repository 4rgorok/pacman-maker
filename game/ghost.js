class Ghost {
    constructor({position, velocity, type}){
        this.position = position
        this.velocity = velocity
        this.ghost_type = type
        this.animation_frame = 0
        this.number_of_frames = 2
        this.frame_change = 0
        this.avaiable_space = new Array(NUMBER_OF_TILES)
        for(var i = 0; i < NUMBER_OF_TILES; i++) this.avaiable_space[i] = new Array(NUMBER_OF_TILES).fill(0)
        this.set_space()
        this.set_ai()
    }

    // flood fill algorithm performed to determine where the ghost can go
    set_space()
    {
        var queue = []
        queue.push({x:this.position.x / SPRITE_SIZE, y: this.position.y/ SPRITE_SIZE})
        while(queue.length > 0)
        {
            var temp = queue.shift()
            if(this.avaiable_space[temp.y][temp.x])continue
            this.avaiable_space[temp.y][temp.x] = 1
            if(temp.x > 0 && !is_wall(current_map[temp.y][temp.x - 1]))
                queue.push({x:temp.x-1, y:temp.y})
            if(temp.x < NUMBER_OF_TILES - 1 && !is_wall(current_map[temp.y][temp.x + 1]))
                queue.push({x:temp.x+1, y:temp.y})
            if(temp.y > 0 && !is_wall(current_map[temp.y - 1][temp.x]))
                queue.push({x:temp.x, y:temp.y - 1})
            if(temp.y < NUMBER_OF_TILES - 1 && !is_wall(current_map[temp.y + 1][temp.x]))
                queue.push({x:temp.x, y:temp.y + 1})
        }
    }

    set_ai()
    {
        switch (this.ghost_type){
            case Ghost_type.red:
                this.ai = new Pac_chase({avaiable_space: this.avaiable_space, starting_position: this.position})
                break;
            case Ghost_type.orange:
                this.ai = new Random_chase({avaiable_space: this.avaiable_space, starting_position: this.position})
        }
    }

    draw()
    {
        var direction = this.get_direction()
        var sprite
        if(direction == Ghost_direction.stationary)
        {
            sprite = {
                x: this.animation_frame * SPRITE_SIZE,
                y: SPRITE_SIZE * 3 + this.ghost_type * SPRITE_SIZE
            }
        }
        else
        {
            sprite = {
                x: this.animation_frame * SPRITE_SIZE + direction * 2 * SPRITE_SIZE,
                y: SPRITE_SIZE * 3 + this.ghost_type * SPRITE_SIZE
            }
        }
        c.drawImage(img, sprite.x, sprite.y, SPRITE_SIZE, SPRITE_SIZE, this.position.x, this.position.y, SPRITE_SIZE, SPRITE_SIZE)
    }

    update()
    {
        this.draw()
        if(this.position.y % SPRITE_SIZE == 0 && this.position.x % SPRITE_SIZE == 0)
        {
            this.change_direction(this.ai.next_move(this.position.x / SPRITE_SIZE, this.position.y / SPRITE_SIZE))
        }
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        this.frame_change++
        this.frame_change%=10
        if(this.frame_change == 0)
        {
            this.animation_frame++
            this.animation_frame%=this.number_of_frames
        }
    }

    change_direction(direction)
    {
        switch (direction){
            case Direction.left:
                this.velocity.x = -GHOST_SPEED
                this.velocity.y = 0
                break;
            case Direction.right:
                this.velocity.x = GHOST_SPEED
                this.velocity.y = 0
                break;
            case Direction.up:
                this.velocity.x = 0
                this.velocity.y = -GHOST_SPEED
                break;
            case Direction.down:
                this.velocity.x = 0
                this.velocity.y = GHOST_SPEED
                break;
            case Direction.stationary:
                this.velocity.x = 0
                this.velocity.y = 0
                break;
        }
    }

    get_direction()
    {
        if(this.velocity.x > 0) return Ghost_direction.right
        if(this.velocity.x < 0) return Ghost_direction.left
        if(this.velocity.y > 0) return Ghost_direction.down
        if(this.velocity.y < 0) return Ghost_direction.up

        return Ghost_direction.stationary
    }
}

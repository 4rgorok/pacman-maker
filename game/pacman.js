class Pacman {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.animation_frame = 0
        this.number_of_frames = 2
        this.frame_change = 0
        this.last_sprite = {
            x: 0,
            y: SPRITE_SIZE * 2
        }
        this.direction_change = false
        this.new_velocity = {x: 0, y: 0}
        this.dots_eaten = 0
    }

    draw()
    {
        var direction = this.get_direction()
        var sprite
        if(this.check_colision() || direction == -1)
        {
            sprite = this.last_sprite
        }
        else
        {
            sprite = {
                x: direction * SPRITE_SIZE * 2 + this.animation_frame * SPRITE_SIZE,
                y: SPRITE_SIZE * 2
            }
            this.last_sprite = sprite
        }
        c.drawImage(img, sprite.x, sprite.y, SPRITE_SIZE, SPRITE_SIZE, this.position.x, this.position.y, SPRITE_SIZE, SPRITE_SIZE)
    }

    // update pacman position 
    update()
    {
        this.draw()
        this.check_dots()
        this.check_ghost_collision()
        if(this.check_colision())
        {
            this.velocity.x = 0
            this.velocity.y = 0
        }
        else
        {
            if(this.direction_change && this.position.y % SPRITE_SIZE == 0 && this.position.x % SPRITE_SIZE == 0)
            {
                this.direction_change = false
                var tempX = this.velocity.x
                var tempY = this.velocity.y
                this.velocity.x = this.new_velocity.x
                this.velocity.y = this.new_velocity.y
                if(this.check_colision())
                {
                    this.velocity.x = tempX
                    this.velocity.y = tempY
                }
            }
            if(!this.check_colision())
            {
                this.position.y += this.velocity.y
                this.position.x += this.velocity.x
            }
            this.frame_change++
            this.frame_change%=10
            if(this.frame_change == 0)
            {
                this.animation_frame++
                this.animation_frame%=this.number_of_frames
            }
        } 
    }

    get_direction()
    {
        if(this.velocity.x > 0) return Direction.right
        if(this.velocity.x < 0) return Direction.left
        if(this.velocity.y > 0) return Direction.down
        if(this.velocity.y < 0) return Direction.up

        return Direction.stationary
    }

    
    check_colision()
    {
        if(!(this.position.x % SPRITE_SIZE == 0 && this.position.y % SPRITE_SIZE == 0))return false
        var posX = this.position.x / SPRITE_SIZE
        var posY = this.position.y / SPRITE_SIZE

        var direction = this.get_direction()

        switch (direction){
            case Direction.right:
                // out of bounds check
                if(this.position.x + SPRITE_SIZE >= canvas.width) return true
                if(is_wall(current_map[posY][posX + 1]))return true
                break;
            case Direction.left:
                if(this.position.x <= 0) return true
                if(is_wall(current_map[posY][posX - 1]))return true
                break;
            case Direction.down:
                if(this.position.y + SPRITE_SIZE >= canvas.width) return true
                if(is_wall(current_map[posY + 1][posX]))return true
                break;
            case Direction.up:
                if(this.position.y <= 0) return true
                if(is_wall(current_map[posY - 1][posX]))return true
                break;
        }

        return false
    }

    change_direction(direction)
    {
        this.direction_change = true
        switch (direction){
            case Direction.left:
                this.new_velocity.x = -PAC_SPEED
                this.new_velocity.y = 0
                break;
            case Direction.right:
                this.new_velocity.x = PAC_SPEED
                this.new_velocity.y = 0
                break;
            case Direction.up:
                this.new_velocity.x = 0
                this.new_velocity.y = -PAC_SPEED
                break;
            case Direction.down:
                this.new_velocity.x = 0
                this.new_velocity.y = PAC_SPEED
                break;
        }
    }

    check_dots()
    {
        if(!(this.position.x % SPRITE_SIZE == 0 && this.position.y % SPRITE_SIZE == 0))return false
        var posX = this.position.x / SPRITE_SIZE
        var posY = this.position.y / SPRITE_SIZE

        if(current_map[posY][posX] == Sprites.pac_dots)
        {
            backgrund_ctx.fillRect(posX * SPRITE_SIZE, posY * SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE)
            current_map[posY][posX] = Sprites.empty
            this.dots_eaten++
            if(this.dots_eaten == number_of_dots)
            {
                game_end = true
                if(alert("YOU WON!!!")){}
                else    window.location.reload();
            }
        }
    }

    check_ghost_collision()
    {
        var pacX = parseInt(this.position.x / SPRITE_SIZE)
        var pacY = parseInt(this.position.y / SPRITE_SIZE)
        ghosts.forEach(ghost => {
            var ghX = parseInt(ghost.position.x / SPRITE_SIZE)
            var ghY = parseInt(ghost.position.y / SPRITE_SIZE)
            
            if(pacX == ghX && pacY == ghY)
            {
                game_end = true
                this.death_animation()
                if(alert("YOU LOST!!!")){}
                else    window.location.reload();
            }
        });
    }

    death_animation()
    {
        //TODO
    }
}



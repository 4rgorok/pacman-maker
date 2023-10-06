class Pacman {
    constructor({position, velocity}){
        this.position = position
        this.initial_position = {x: position.x, y: position.y}
        this.velocity = velocity
        this.speed = PAC_SPEED
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
        this.ghosts_eating_time_left = 0
        this.walls_passing_time_left = 0
        this.speedup_time_left = 0
        this.lives = 1
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
        this.check_powerup()
        this.check_powerups()
        this.check_ghost_collision()
        if(this.check_colision())
        {
            this.velocity.x = 0
            this.velocity.y = 0
        }
        else
        {
            if(this.position.y % SPRITE_SIZE == 0 && this.position.x % SPRITE_SIZE == 0)
            {
                //console.log("xdd")
                if(this.velocity.x > 0)this.velocity.x = this.speed
                if(this.velocity.y > 0)this.velocity.y = this.speed
            }
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
            else if (this.position.y % SPRITE_SIZE == 0 && this.position.x % SPRITE_SIZE == 0){
                this.check_teleport(this.position.x / SPRITE_SIZE, this.position.y / SPRITE_SIZE)
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
        if (this.ghosts_eating_time_left > 0) this.ghosts_eating_time_left--
        if (this.walls_passing_time_left > 0) this.walls_passing_time_left--
        if (this.speedup_time_left > 0) this.speedup_time_left--
        else this.speed = PAC_SPEED
    }

    get_direction()
    {
        if(this.velocity.x > 0) return Direction.right
        if(this.velocity.x < 0) return Direction.left
        if(this.velocity.y > 0) return Direction.down
        if(this.velocity.y < 0) return Direction.up

        return Direction.stationary
    }
    check_teleport(x, y)
    {
        if(teleports.length == 0)return 
        if(teleport_cooldown > 0)return
        //console.log(x, y, teleports[0])
        if(teleports[0][0] == x && teleports[0][1]== y)
        {
            this.position.x = teleports[1][0] * SPRITE_SIZE
            this.position.y = teleports[1][1] * SPRITE_SIZE
            teleport_cooldown = TELEPORT_COOLDOWN_TIME
        }
        else if (teleports[1][0] == x && teleports[1][1]== y)
        {
            this.position.x = teleports[0][0] * SPRITE_SIZE
            this.position.y = teleports[0][1] * SPRITE_SIZE
            teleport_cooldown = TELEPORT_COOLDOWN_TIME
        }
    }
    
    check_colision()
    {
        if (this.ghosts_eating_time_left > 0) return false
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
                this.new_velocity.x = -this.speed
                this.new_velocity.y = 0
                break;
            case Direction.right:
                this.new_velocity.x = this.speed
                this.new_velocity.y = 0
                break;
            case Direction.up:
                this.new_velocity.x = 0
                this.new_velocity.y = -this.speed
                break;
            case Direction.down:
                this.new_velocity.x = 0
                this.new_velocity.y = this.speed
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
    check_powerups()
    {
        if(!(this.position.x % SPRITE_SIZE == 0 && this.position.y % SPRITE_SIZE == 0))return false
        var posX = this.position.x / SPRITE_SIZE
        var posY = this.position.y / SPRITE_SIZE
        let current = current_map[posY][posX]
        if(current == Sprites.key_powerup ||
            current == Sprites.bell_powerup ||
            current == Sprites.apple_powerup ||
            current == Sprites.grapes_powerup ||
            current == Sprites.orange_powerup ||
            current == Sprites.galaxian_powerup ||
            current == Sprites.strawberry_powerup
            )
        {
            backgrund_ctx.fillRect(posX * SPRITE_SIZE, posY * SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE)
            current_map[posY][posX] = Sprites.empty
        }
    }

    check_ghost_collision()
    {
        var pacX = parseInt(this.position.x / SPRITE_SIZE)
        var pacY = parseInt(this.position.y / SPRITE_SIZE)
        ghosts.forEach(ghost => {
            if (!ghost.alive) return
            var ghX = parseInt(ghost.position.x / SPRITE_SIZE)
            var ghY = parseInt(ghost.position.y / SPRITE_SIZE)
            
            if(pacX == ghX && pacY == ghY)
            {
                if (this.ghosts_eating_time_left == 0) {
                    if (this.lives) {
                        this.position = {x : this.initial_position.x,y : this.initial_position.y},
                        this.velocity = {x : 0, y : 0}
                        this.lives--
                    }
                    else {
                        game_end = true
                        this.death_animation()
                    }
                } else {
                    //this.dots_eaten += 1000
                    ghost.alive = false
                }
            }
        });
    }

    check_powerup() {
        if(!(this.position.x % SPRITE_SIZE == 0 && this.position.y % SPRITE_SIZE == 0))return false
        var pacX = parseInt(this.position.x / SPRITE_SIZE)
        var pacY = parseInt(this.position.y / SPRITE_SIZE)
        var field_content = current_map[pacY][pacX]
        //console.log(field_content)
        switch (field_content) {
            case Sprites.power_pellet:
                //this.ghosts_eating_time_left += 1000
                //this.dots_eaten += 100
                break;
            case Sprites.strawberry_powerup: // dodatkowe zycie
                //this.dots_eaten += 200
                this.lives++
                console.log("lives "+this.lives)
                break;
            case Sprites.orange_powerup: // przyspieszenie
                //this.dots_eaten += 400
                //console.log("xdddddddd")
                this.speedup_time_left = 60 * 5
                this.speed = PAC_SPEED * 2
                break;
            case Sprites.apple_powerup: // zwolnienie duchow
                //this.dots_eaten += 800
                ghosts.forEach(ghost => {
                    ghost.paused += 120
                });
                break;
            case Sprites.grapes_powerup: // stale przyspieszenie
                //this.dots_eaten += 2400
                //this.speed ++
                break;
            case Sprites.galaxian_powerup: // teleportacja  duchow do orginalnej pozycji
                console.log("xdd")
                //this.dots_eaten += 4000
                ghosts.forEach(ghost => {
                    ghost.position = ghost.original_position
                });
                break;
            case Sprites.bell_powerup: // przedluzenie czasu bonusu
                //this.dots_eaten += 1000
                //this.ghosts_eating_time_left *= 2
                //this.speedup_time_left *= 2
                //this.walls_passing_time_left *= 2
                //ghosts.forEach(ghost => {
                //    ghost.paused *= 2
                //});
            case Sprites.key_powerup: // przelatywanie przez sciany
                //this.dots_eaten += 1600
                //this.walls_passing_time_left += 1000
                break;
        }
    }

    death_animation()
    {
        let x = 0;
        let y = 0;
        let frameCount = 11;

        c.clearRect(this.position.x, this.position.y, SPRITE_SIZE, SPRITE_SIZE);
            setInterval(() => {
                c.clearRect(this.position.x, this.position.y, SPRITE_SIZE, SPRITE_SIZE);
                c.drawImage(pac_death_img, x, y, SPRITE_SIZE, SPRITE_SIZE, this.position.x, this.position.y, SPRITE_SIZE, SPRITE_SIZE);
                x += SPRITE_SIZE;
            }, 100);

        setTimeout(() => {
            if(alert("YOU LOST!!!")){}
             else window.location.reload();
            }, 110 * frameCount);
    }
}



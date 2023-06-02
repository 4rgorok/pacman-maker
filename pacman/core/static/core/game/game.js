let canvas, c, pacman, ghosts = []
let backgrund, backgrund_ctx
let current_map
let game_end = false
let number_of_dots = 0
let teleport_cooldown = 0

let game_frame = 0
let game_second = 1
let img = new Image();
let pac_death_img = new Image();
let teleports = []

window.addEventListener("load", (event) => {
    img.src = '/static/core/game/sprites_24.png';
    pac_death_img.src = '/static/core/game/pac_death.png'
    img.onload = function() {
        //init()
    };
});

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("defaultmap").onclick = function(){
        current_map = mapa
        
        pacman = new Pacman({
            position: {x : 240,y : 240},
            velocity: {x : 0, y : 0}
        })

        var ghost2 = new Ghost({
            position: {x : 696,y : 552},
            velocity: {x : 0, y : GHOST_SPEED},
            type: Ghost_type.red
        })

        var ghost3 = new Ghost({
            position: {x : 48,y : 240},
            velocity: {x : 0, y : GHOST_SPEED},
            type: Ghost_type.blue
        })

        var ghost4 = new Ghost({
            position: {x : 48,y : 552},
            velocity: {x : 0, y : GHOST_SPEED},
            type: Ghost_type.pink
        })

        var ghost1 = new Ghost({
            position: {x : 480,y : 240},
            velocity: {x : 0, y : GHOST_SPEED},
            type: Ghost_type.orange
        })
        ghosts = [ghost1, ghost2, ghost3, ghost4]
        init()
    };
    document.getElementById("loadmap").onclick = function(){
        load_map()
        //init()
    };
});



function init()
{
    document.getElementById("lista").remove()

    var scale_factor = (window.innerHeight * 0.9) / (SPRITE_SIZE * NUMBER_OF_TILES)
    var left_shift = (window.innerWidth - SPRITE_SIZE * NUMBER_OF_TILES)/2
    console.log(window.innerWidth, left_shift)
    scale_factor = Math.round(scale_factor * 10) / 10

    document.body.style.transform = "scale("+scale_factor+")"
    document.getElementById("front").style.left = left_shift+"px"
    document.getElementById("background").style.left = left_shift+"px"

    canvas = document.getElementById("front");
    c = canvas.getContext("2d");

    canvas.width = SPRITE_SIZE * NUMBER_OF_TILES
    canvas.height = SPRITE_SIZE * NUMBER_OF_TILES


    backgrund = document.getElementById("background");
    backgrund_ctx = backgrund.getContext("2d");

    backgrund.width = SPRITE_SIZE * NUMBER_OF_TILES
    backgrund.height = SPRITE_SIZE * NUMBER_OF_TILES

    backgrund_ctx.fillRect(0, 0, backgrund.width, backgrund.height)

   
    //ghosts = [ghost2]
    draw_background()
    animate()
}

function load_map()
{
    //var that=this
        document.getElementById('input').click()
        document.getElementById('input').onchange=function()
        {
            var file = document.getElementById('input').files[0]
            if (file) {
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    var plik=JSON.parse(evt.target.result)
                    //console.log(plik)
                    current_map = plik
                    console.log(current_map)
                    init()
                   
                }
                reader.onerror = function (evt) {
                    //console.log("Błąd w czytaniu pliku")
                    window.alert("Błąd w czytaniu pliku")
                    document.getElementById("fileContents").innerHTML = "error reading file";
                }
               
            }   
       } 
}

function animate()
{
    if(!game_end)
    {
        window.requestAnimationFrame(animate)
        c.globalAlpha = 0;
        c.clearRect(0, 0, canvas.width, canvas.height)
        c.globalAlpha = 1;
        pacman.update()
        ghosts.forEach(ghost => ghost.update());
        game_frame++
        if(game_frame%60==0){
            game_second++
            if(teleport_cooldown > 0)teleport_cooldown--
        }
    }
}

function draw_background()
{
    teleports = []
    for(var y = 0; y < NUMBER_OF_TILES; y++)
    {
        for(var x = 0; x < NUMBER_OF_TILES; x++)
        {
            var posX = x * SPRITE_SIZE
            var posY = y * SPRITE_SIZE
            let curr_sprite = current_map[y][x]
            if(curr_sprite == Sprites.pac_dots) number_of_dots++
            //pacman
            if(curr_sprite == Sprites.pac_man)
            {
                pacman = new Pacman({
                    position: {x : x*SPRITE_SIZE,y : y*SPRITE_SIZE},
                    velocity: {x : 0, y : 0}
                })
                continue;
            }
            // 4 duchy
            if(curr_sprite == Sprites.red_ghost)
            {
                let ghost = new Ghost({
                    position: {x : x*SPRITE_SIZE,y : y*SPRITE_SIZE},
                    velocity: {x : 0, y : GHOST_SPEED},
                    type: Ghost_type.red
                })
                ghosts.push(ghost)
                continue;
            }
            if(curr_sprite == Sprites.blue_ghost)
            {
                let ghost = new Ghost({
                    position: {x : x*SPRITE_SIZE,y : y*SPRITE_SIZE},
                    velocity: {x : 0, y : GHOST_SPEED},
                    type: Ghost_type.blue
                })
                ghosts.push(ghost)
                continue;
            }
            if(curr_sprite == Sprites.pink_ghost)
            {
                let ghost = new Ghost({
                    position: {x : x*SPRITE_SIZE,y : y*SPRITE_SIZE},
                    velocity: {x : 0, y : GHOST_SPEED},
                    type: Ghost_type.pink
                })
                ghosts.push(ghost)
                continue;
            }
            if(curr_sprite == Sprites.orange_ghost)
            {
                let ghost = new Ghost({
                    position: {x : x*SPRITE_SIZE,y : y*SPRITE_SIZE},
                    velocity: {x : 0, y : GHOST_SPEED},
                    type: Ghost_type.orange
                })
                ghosts.push(ghost)
                continue;
            }
            if(curr_sprite == Sprites.teleport) {
                add_teleport(x, y)
                console.log("lool")
            }
            var sprite = get_sprite(curr_sprite)
            if(curr_sprite!=Sprites.empty)
                backgrund_ctx.drawImage(img, sprite.x * SPRITE_SIZE, sprite.y * SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE, posX, posY, SPRITE_SIZE, SPRITE_SIZE)
        }
    }
    console.log(teleports)
}

function add_teleport(x, y)
{
    teleports.push([x,y])
}

function get_sprite(tile_number)
{
    switch(tile_number){
        case Sprites.pac_dots:
            return {x: 6, y: 0}
        case Sprites.teleport:
            return {x: 7, y: 0}
        case Sprites.power_pellet:
            return {x: 0, y: 1}
        case Sprites.strawberry_powerup:
            return {x: 1, y: 1}
        case Sprites.orange_powerup:
            return {x: 2, y: 1}
        case Sprites.bell_powerup:
            return {x: 3, y: 1}
        case Sprites.apple_powerup:
            return {x: 4, y: 1}
        case Sprites.grapes_powerup:
            return {x: 5, y: 1}
        case Sprites.galaxian_powerup:
            return {x: 6, y: 1}
        case Sprites.key_powerup:
            return {x: 7, y: 1}
        case Sprites.empty:
            return {x: 7, y: 0}
        case Sprites.pac_man:
            return {x: 0, y: 2}
        case Sprites.wall_vertical:
            return {x: 1, y: 0}
        case Sprites.wall_horizontal:
            return {x: 0, y: 0}
        case Sprites.corner_left_up:
            return {x: 2, y: 0}
        case Sprites.corner_left_down:
            return {x: 4, y: 0}
        case Sprites.corner_right_up:
            return {x: 3, y: 0}
        case Sprites.corner_right_down:
            return {x: 5, y: 0}
        case Sprites.red_ghost:
            return {x: 0, y: 3}
        case Sprites.pink_ghost:
            return {x: 0, y: 4}
        case Sprites.blue_ghost:
            return {x: 0, y: 6}
        case Sprites.orange_ghost:
            return {x: 0, y: 5}    
    }
}

function is_wall(tile_number)
{
    if(tile_number >= Sprites.wall_vertical && tile_number <= Sprites.corner_right_down) return true
    return false
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowLeft":
            pacman.change_direction(Direction.left)
            break;
        case "ArrowRight":
            pacman.change_direction(Direction.right)
            break;
        case "ArrowUp":
            pacman.change_direction(Direction.up)
            break;
        case "ArrowDown":
            pacman.change_direction(Direction.down)
            break;
    }
})

addEventListener("resize", (event) => {
    var scale_factor = (window.innerHeight * 0.9) / (SPRITE_SIZE * NUMBER_OF_TILES)
    var left_shift = (window.innerWidth - SPRITE_SIZE * NUMBER_OF_TILES)/2
    console.log(window.innerWidth, left_shift)
    scale_factor = Math.round(scale_factor * 10) / 10

    document.body.style.transform = "scale("+scale_factor+")"
    document.getElementById("front").style.left = left_shift+"px"
    document.getElementById("background").style.left = left_shift+"px"
});
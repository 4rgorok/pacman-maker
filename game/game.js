let canvas, c, pacman
let backgrund, backgrund_ctx
let current_map

let img = new Image();
img.src = './sprites_24.png';
img.onload = function() {
    console.log()
    var scale_factor = (window.innerHeight * 0.9) / (SPRITE_SIZE * NUMBER_OF_TILES)
    var left_shift = (window.innerWidth - SPRITE_SIZE * NUMBER_OF_TILES)/2
    console.log(window.innerWidth, left_shift)
    scale_factor = Math.round(scale_factor * 10) / 10

    document.body.style.transform = "scale("+scale_factor+")"
    document.getElementById("front").style.left = left_shift+"px"
    document.getElementById("background").style.left = left_shift+"px"

    current_map = mapa
    canvas = document.getElementById("front");
    c = canvas.getContext("2d");

    canvas.width = SPRITE_SIZE * NUMBER_OF_TILES
    canvas.height = SPRITE_SIZE * NUMBER_OF_TILES


    backgrund = document.getElementById("background");
    backgrund_ctx = backgrund.getContext("2d");

    backgrund.width = SPRITE_SIZE * NUMBER_OF_TILES
    backgrund.height = SPRITE_SIZE * NUMBER_OF_TILES

    backgrund_ctx.fillRect(0, 0, backgrund.width, backgrund.height)

    pacman = new Pacman({
        position: {x : 240,y : 240},
        velocity: {x : 0, y : 0}
    })
    draw_background()
    animate()
};

function animate()
{
    window.requestAnimationFrame(animate)
    c.globalAlpha = 0;
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.globalAlpha = 1;
    pacman.update()
}

function draw_background()
{
    for(var y = 0; y < NUMBER_OF_TILES; y++)
    {
        for(var x = 0; x < NUMBER_OF_TILES; x++)
        {
            var posX = x * SPRITE_SIZE
            var posY = y * SPRITE_SIZE
            var sprite = get_sprite(current_map[x][y])
            backgrund_ctx.drawImage(img, sprite.x * SPRITE_SIZE, sprite.y * SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE, posY, posX, SPRITE_SIZE, SPRITE_SIZE)
        }
    }
}

function get_sprite(tile_number)
{
    switch(tile_number){
        case Sprites.pac_dots:
            return {x: 6, y: 0}
        case Sprites.power_pellet:
            return {x: 0, y: 1}
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
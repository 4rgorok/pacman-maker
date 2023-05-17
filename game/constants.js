const SPRITE_SIZE = 24
const NUMBER_OF_TILES = 32
const PAC_SPEED = 4
const GHOST_SPEED = 2

const Sprites = {
    pac_dots:           0,
    power_pellet:       1,
    empty:              2,
    pac_man:            3,
    wall_vertical:      4, 
    wall_horizontal:    5,
    corner_left_up:     6,
    corner_left_down:   7,
    corner_right_up:    8,
    corner_right_down:  9,
    red_ghost:          10,
    pink_ghost:         11,
    blue_ghost:         12,
    orange_ghost:       13,
    cherry_powerup:     14,
    strawberry_powerup: 15,
    orange_powerup:     16,
    grapes_powerup:     17,
    galaxian_powerup:   18,
    bell_powerup:       19,
    key_powerup:        20
}

const Direction = {
    left:   0,
    right:  2,
    up:     1,
    down:   3,
    stationary : -1,
    get_random_direction: () => {
        return Math.floor(Math.random() * 4);
    }
}

const Ghost_direction = {
    left:   2,
    right:  0,
    up:     3,
    down:   1,
    stationary : -1,
}

const Ghost_type = {
    red: 0,
    pink: 1,
    orange: 2,
    blue: 3
}
window.onload = function () {
    animateSprite('ghostStrong', 0, 0, 2, 8);
    animateSprite('pacmanWeak', 200, 0, 4, 3);
    animateSprite('ghostWeak', 200, 1, 8, 4);
    animateSprite('pacmanStrong', 0, 1, 4, 3);
}

function animateSprite(who, startingPosition, direction, tileX, tileY) {
    const DUR1 = 50; // duration of Pacman texture changing cycle
    const DUR2 = 25; // duration of Ghost texture changing cycle

    // TEXTURE ATLAS SETUP
    const src = '../graphics/sprites.png';
    const tileSize = 24;
    const basePacmanAtlasX = 0 * tileSize;
    const basePacmanAtlasY = 7 * tileSize;

    // distance between primary and secondary graphic
    let graphicDelta = 2;
    if (who == 'ghostStrong' || who == 'ghostWeak') {
        graphicDelta = 1;
    }
    let x = (tileX * tileSize); // tile offset x position (absolute)
    let y = (tileY * tileSize); // tile offset y position (absolute)

    let id = null;
    const elem = document.getElementById(who);

    elem.style.width = tileSize + 'px';
    elem.style.height = tileSize + 'px';
    elem.style.backgroundImage = "url('" + src + "')";
    elem.style.backgroundPosition = '-' + x + 'px -' + y + 'px';
    if (who == 'pacmanWeak') {
        elem.style.transform = 'rotate(90deg)';
    }

    // POSITION SETUP
    let pos = startingPosition;
    let way = direction; // way: 0 - down; 1 - right; 2 - up; 3 - left; direction: 0 - anticlockwise; 1 - clockwise
    // arrays of positions to which sprites will travel on X and Y axis, respectively
    let maxPosX = [200, 300, 100, 50, 180, 270, 70, 60];
    let maxPosY = [720, 600, 400, 200, 100, 50, 600, 80, 400];
    if (who == 'ghostWeak' || who == 'pacmanStrong') {
        maxPosX = [300, 50, 150, 90, 200, 40, 200, 350];
        maxPosY = [200, 720, 200, 370, 100, 400, 50, 80, 700];
    }
    // iterators over the arrays, if they hit its length, they reset to 0
    let maxPosXIter = 0;
    let maxPosYIter = 0;

    clearInterval(id);
    id = setInterval(frame, 5);

    function frame() {
        // REGULAR TEXTURE CHANGE
        if (who == 'ghostStrong' || who == 'ghostWeak') {
            if (pos % DUR2 == 0) {
                elem.style.backgroundPosition = '-' + (x + tileSize * graphicDelta) + 'px -' + y + 'px';
            } else if (pos % DUR2 == Math.floor(DUR2 / 2)) {
                elem.style.backgroundPosition = '-' + x + 'px -' + y + 'px';
            }
        } else {
            if (pos % DUR1 == 0) {
                elem.style.backgroundPosition = '-' + x + 'px -' + y + 'px';
            } else if (pos % DUR1 == Math.floor(DUR1 / 4) || pos % DUR1 == Math.floor(DUR1 * 3 / 4)) {
                elem.style.backgroundPosition = '-' + (x + tileSize * graphicDelta) + 'px -' + y + 'px';
            } else if (pos % DUR1 == Math.floor(DUR1 / 2)) {
                elem.style.backgroundPosition = '-' + basePacmanAtlasX + 'px -' + basePacmanAtlasY + 'px';
            }
        }

        // DIRECTION CHANGE
        if (pos == maxPosX[maxPosXIter] && (way == 1 || way == 3)) {
            pos = 0;
            if (way == 3) { maxPosXIter = (maxPosXIter + 1) % maxPosX.length; }
            way = direction == 0 ? (way + 1) % 4 : (way + 3) % 4;

            // for pacmans we can just rotate the texture, for ghostStrong we have to use another one
            if (who == 'pacmanWeak' || who == 'pacmanStrong') {
                elem.style.transform = way == 0 ? 'rotate(90deg)' : 'rotate(270deg)';
            } else if (who == 'ghostStrong') {
                x = way == 2 ? tileSize * 6 : tileSize * 2;
            }

        } else if (pos == maxPosY[maxPosYIter] && (way == 0 || way == 2)) {
            pos = 0;
            if (way == 2) { maxPosYIter = (maxPosYIter + 1) % maxPosY.length; }
            way = direction == 0 ? (way + 1) % 4 : (way + 3) % 4;

            // for pacmans we can just rotate the texture, for ghostStrong we have to use another one
            if (who == 'pacmanWeak' || who == 'pacmanStrong') {
                elem.style.transform = way == 3 ? 'rotate(180deg)' : 'rotate(0deg)';
            } else if (who == 'ghostStrong') {
                x = way == 3 ? tileSize * 4 : tileSize * 0;
            }

        } else { // NO DIRECTION CHANGE
            pos++;
            if (way == 0) {
                elem.style.top = pos + "px";
            } else if (way == 1) {
                elem.style.left = pos + "px";
            } else if (way == 2) {
                elem.style.top = maxPosY[maxPosYIter] - pos + "px";
            } else if (way == 3) {
                elem.style.left = maxPosX[maxPosXIter] - pos + "px";
            }

        }
    }
}
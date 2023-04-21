document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.getElementById('score')
    const boardSize = 32
    let score = 0
    let dotScore = 0
    const grid = document.querySelector('.grid')

    let layout = []
    function getCoord(x, y) {
        return boardSize * x + y
    }

    /*function generateMap(size) {


        for (let i = 0; i < size * size; i++) {
            layout.push(2)
        }

        // Place walls around the edges of the map
        for (let y = 0; y < size; y++) {
            layout[getCoord(0, y)] = 4;
            layout[getCoord(size - 1, y)] = 4;
        }
        for (let x = 0; x < size; x++) {
            layout[getCoord(x, 0)] = 4;
            layout[getCoord(x, size - 1)] = 4;
        }

        const lairSize = 8;
        const lairStartX = Math.floor((size - lairSize) / 2);
        const lairStartY = Math.floor((size - lairSize) / 2);
        for (let y = lairStartY; y < lairStartY + lairSize; y++) {
            for (let x = lairStartX; x < lairStartX + lairSize; x++) {
                layout[getCoord(y, x)] = 2;
            }
        }

        for (let i = 0; i < size * size * 0.3; i++) {
            const x = Math.floor(Math.random() * (size - 2)) + 1;
            const y = Math.floor(Math.random() * (size- 2)) + 1;
            if (layout[getCoord(y, x)] === 4) {
                layout[getCoord(y, x)] = 4;
            }
        }

        for (let i = 0; i < size * size * 0.6; i++) {
            const x = Math.floor(Math.random() * (size - 2)) + 1;
            const y = Math.floor(Math.random() * (size- 2)) + 1;
            if (layout[getCoord(y, x)] === 2) {
                layout[getCoord(y, x)] = 0;
            }
        }

        for (let i = 0; i < size * size * 0.05; i++) {
            const x = Math.floor(Math.random() * (size - 2)) + 1;
            const y = Math.floor(Math.random() * (size- 2)) + 1;
            if (layout[getCoord(y, x)] === 2) {
                layout[getCoord(y, x)] = 3;
            }
        }

        layout[410] = 3;

    }
    generateMap(boardSize)*/

    OpenFile()
    {
        var that=this
        document.getElementById('input').click()
        document.getElementById('input').onchange=function()
        {
            var file = document.getElementById('input').files[0]
        }

        layout = file
    }



    let maxScore = 0;

    // 0 - pac-dots
    // 1 - power-pellet
    // 2 - empty
    // 3 - pac-man
    // 4 - wall-vertical
    // 5 - wall-horizontal
    // 6 - corner-left-up
    // 7 - corner-left-down
    // 8 - corner-right-up
    // 9 - corner-right-down
    // 10 - red-ghost
    // 11 - pink-ghost
    // 12 - blue-ghost
    // 13 - orange-ghost

    const squares = []

    layout[40] = 11
    layout[41] = 12
    layout[42] = 13
    layout[43] = 10

    function createBoard() { // this function will easily create board when generated map is loaded to layout array
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');

            switch (layout[i]) {
                case 0:
                    square.classList.add('dot')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break
                case 1:
                    square.classList.add('pellet')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break
                case 3:
                    square.classList.add('pac-man')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break
                case 4:
                    square.classList.add('wall')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break
                case 5:
                    square.classList.add('wall')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 6:
                    square.classList.add('wall')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 7:
                    square.classList.add('wall')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 8:
                    square.classList.add('wall')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 9:
                    square.classList.add('wall')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 10:
                    square.classList.add('ghost')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 11:
                    square.classList.add('ghost')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 12:
                    square.classList.add('ghost')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
                case 13:
                    square.classList.add('ghost')
                    square.style.backgroundImage = `url(${render(layout[i])})`;
                    break;
            }

            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    // wydobyc z layout: maxscore, startindex duchow
    for (let i = 0; i < boardSize * boardSize; i++) {
        if (squares[i].classList.contains('dot'))
            maxScore++;
    }

    let redStartIndex, pinkStartIndex, blueStartIndex, orangeStartIndex;
    for (let i = 0; i < boardSize * boardSize; i++) {
        if (layout[i] === 10)
            redStartIndex = i;
        if (layout[i] === 11)
            pinkStartIndex = i;
        if (layout[i] === 12)
            blueStartIndex = i;
        if (layout[i] === 13)
            orangeStartIndex = i;
    }

    let pacmanCurrentIndex = -1;
    let BlinkyCurrentIndex = 400;

    for (let i = 0; i < boardSize * boardSize; i++) {
        if (squares[i].classList.contains('pac-man'))
            pacmanCurrentIndex = i;
    }

    let pacmanPreviousIndex = pacmanCurrentIndex
    squares[pacmanPreviousIndex].style.backgroundImage = `url(pacman1.png)`;

    function render(thing) {
        const imageMap = {
            0: 'pac-dots.png',
            1: 'power-pellet.png',
            2: 'empty.png',
            3: 'pac-man.png',
            4: 'wall-vertical.png',
            5: 'wall-horizontal.png',
            6: 'corner-left-up.png',
            7: 'corner-left-down.png',
            8: 'corner-right-up.png',
            9: 'corner-right-down.png',
            10: 'red-ghost.png',
            11: 'pink-ghost.png',
            12: 'blue-ghost.png',
            13: 'orange-ghost.png'
        };

        return imageMap[thing] || 'unknown.png';
    }

    function renderMap() {

    }

    let twofieldsInFrontOfPacMan = pacmanCurrentIndex + boardSize * 2;

    function animatePacman(direction) {
        const pacmanSprites = [
            'pacman1.png', 'pacman2.png', 'pacman3.png', 'pacman4.png',
            'pacman5.png', 'pacman6.png', 'pacman7.png', 'pacman8.png'
        ];
        let spriteIndex = 0;

        if (direction === 'left') {
            spriteIndex = 0;
        } else if (direction === 'up') {
            spriteIndex = 2;
        } else if (direction === 'right') {
            spriteIndex = 4;
        } else if (direction === 'down') {
            spriteIndex = 6;
        }

        const animation = setInterval(() => {
            squares[pacmanPreviousIndex].style.backgroundImage = `url(${render(2)})`;
            squares[pacmanCurrentIndex].style.backgroundImage = `url(${pacmanSprites[spriteIndex]})`;
            pacmanPreviousIndex = pacmanCurrentIndex
            spriteIndex = (spriteIndex + 1) % 2 + (direction === 'left' ? 0 : direction === 'up' ? 2 : direction === 'right' ? 4 : 6);
        }, 200);

        return animation;
    }


    let pacmanAnimation;
    function movePacman(e) {

        if (pacmanAnimation) {
            clearInterval(pacmanAnimation);
        }
        squares[pacmanCurrentIndex].classList.remove('pac-man')

        let direction = '';

        switch(e.keyCode) {
            case 37: // left arrow
                if (pacmanCurrentIndex % boardSize !== 0 &&
                    !squares[pacmanCurrentIndex - 1].classList.contains('wall')) {
                    pacmanCurrentIndex -= 1;
                    twofieldsInFrontOfPacMan = pacmanCurrentIndex - 2;
                }
                direction = 'left';
                break;
            case 38: // up arrow
                if (pacmanCurrentIndex - boardSize >= 0 &&
                    !squares[pacmanCurrentIndex - boardSize].classList.contains('wall')) {
                    pacmanCurrentIndex -= boardSize;
                    twofieldsInFrontOfPacMan = pacmanCurrentIndex - boardSize * 2;
                }
                direction = 'up';
                break;
            case 39: // right arrow
                if (pacmanCurrentIndex % boardSize < boardSize - 1 &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('wall')) {
                    pacmanCurrentIndex += 1;
                    twofieldsInFrontOfPacMan = pacmanCurrentIndex + 2;
                }
                direction = 'right';
                break;
            case 40: // down arrow
                if (pacmanCurrentIndex + boardSize < boardSize * boardSize &&
                    !squares[pacmanCurrentIndex + boardSize].classList.contains('wall')) {
                    pacmanCurrentIndex += boardSize;
                    twofieldsInFrontOfPacMan = pacmanCurrentIndex + boardSize * 2;
                }
                direction = 'down';
                break;
        }

        pacmanAnimation = animatePacman(direction);

        if (squares[pacmanCurrentIndex].classList.contains('dot'))
            ateDot();

        if (squares[pacmanCurrentIndex].classList.contains('pellet'))
            atePellet();

        squares[pacmanCurrentIndex].classList.add('pac-man')

        checkLose()
        checkWin()
    }
    document.addEventListener('keydown', movePacman)

    function ateDot() {
        dotScore++
        score++
        scoreDisplay.textContent = score
        squares[pacmanCurrentIndex].classList.remove('dot')
        layout[pacmanCurrentIndex] = 2;
    }

    function atePellet() {
        dotScore += 10
        score += 10
        ghosts.forEach(ghost => ghost.frightened = true)
        setTimeout(calmGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove('pellet')
    }

    function checkLose() {
        if (squares[pacmanCurrentIndex].classList.contains('ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePacman)
            setTimeout(function(){ alert("Game Over! \n You lost!"); }, 300)
        }
    }

    function checkWin() {
        if (dotScore === maxScore) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePacman)
            setTimeout(function(){ alert("Game Over! \n You won!"); }, 300)
        }
    }

    function calmGhosts() {
        ghosts.forEach(ghost => ghost.frightened = false)
    }

    class Ghost {
        constructor(startIndex, speed) {
            this.startIndex = startIndex
            this.currentIndex = startIndex
            this.speed = speed
            this.frightened = false
            this.timerId = NaN
        }

        move(/*pacmanCurrentIndex, boardSize*/) {
            const directions =  [-1, +1, boardSize, -boardSize]
            return directions[Math.floor(Math.random() * directions.length)]
        }

    }

    class Blinky extends Ghost {
        constructor(startIndex) {
            super(startIndex, 400);
        }

        move(/*pacmanCurrentIndex, boardSize*/) {
            const distance = Math.sqrt(
                Math.pow(this.currentIndex % boardSize - pacmanCurrentIndex % boardSize, 2) +
                Math.pow(Math.floor(this.currentIndex / boardSize) - Math.floor(pacmanCurrentIndex / boardSize), 2)
            );

            let direction;
            if (this.frightened) { // scared mode
                if (this.currentIndex / boardSize > boardSize - (this.currentIndex % boardSize) && !squares[this.currentIndex + boardSize].classList.contains('wall')) { // move up
                    direction = boardSize;
                } else { // move right
                    direction = 1;
                }
            } else { //chase mode
                if (pacmanCurrentIndex < this.currentIndex && pacmanCurrentIndex > this.currentIndex - boardSize && !squares[this.currentIndex - 1].classList.contains('wall')) {
                    direction = -1;
                } else if (pacmanCurrentIndex > this.currentIndex && pacmanCurrentIndex < this.currentIndex - boardSize && !squares[this.currentIndex + 1].classList.contains('wall')) {
                    direction = 1;
                } else if (pacmanCurrentIndex < this.currentIndex && !squares[this.currentIndex - boardSize].classList.contains('wall')) {
                    direction = -boardSize;
                } else if (pacmanCurrentIndex > this.currentIndex && !squares[this.currentIndex + boardSize].classList.contains('wall')) {
                    direction = boardSize;
                } else {
                    direction = null;
                }
            }
            return direction;
        }
    }

    class Pinky extends Ghost {
        constructor(startIndex) {
            super(startIndex, 500);
        }

        move(/*twofieldsInFrontOfPacMan, boardSize*/) {
            const distance = Math.sqrt(
                Math.pow(this.currentIndex % boardSize - twofieldsInFrontOfPacMan % boardSize, 2) +
                Math.pow(Math.floor(this.currentIndex / boardSize) - Math.floor(twofieldsInFrontOfPacMan / boardSize), 2)
            );

            let direction;
            if (this.frightened) { // scared mode
                if (this.currentIndex / boardSize > this.currentIndex % boardSize && !squares[this.currentIndex + boardSize].classList.contains('wall')) { // move down
                    direction = boardSize;
                } else { // move left
                    direction = -1;
                }
            } else { //chase mode
                if (twofieldsInFrontOfPacMan < this.currentIndex && !squares[this.currentIndex - 1].classList.contains('wall')) {
                    direction = -1;
                } else if (twofieldsInFrontOfPacMan > this.currentIndex && !squares[this.currentIndex + 1].classList.contains('wall')) {
                    direction = 1;
                } else if (twofieldsInFrontOfPacMan < this.currentIndex && !squares[this.currentIndex - boardSize].classList.contains('wall')) {
                    direction = -boardSize;
                } else if (twofieldsInFrontOfPacMan > this.currentIndex && !squares[this.currentIndex + boardSize].classList.contains('wall')) {
                    direction = boardSize;
                } else {
                    direction = null;
                }
            }

            return direction;
        }
    }

    class Inky extends Ghost {
        constructor(startIndex) {
            super(startIndex, 200);
        }

        move(/*twofieldsInFrontOfPacMan, boardSize*/) {
            let direction;
            if (this.frightened) { // scared mode
                if (this.currentIndex / boardSize < this.currentIndex % boardSize && !squares[this.currentIndex + boardSize].classList.contains('wall')) { // move up
                    direction = -boardSize;
                } else { // move right
                    direction = 1;
                }
            }
            else { //chase mode
                let desiredLocation = ghosts[0].currentIndex + (twofieldsInFrontOfPacMan - ghosts[0].currentIndex) * 2;
                const distance = Math.sqrt(
                    Math.pow(this.currentIndex % boardSize - desiredLocation % boardSize, 2) +
                    Math.pow(Math.floor(this.currentIndex / boardSize) - Math.floor(desiredLocation / boardSize), 2)
                );
                if (desiredLocation < this.currentIndex && !squares[this.currentIndex - 1].classList.contains('wall')) {
                    direction = -1;
                } else if (desiredLocation > this.currentIndex && !squares[this.currentIndex + 1].classList.contains('wall')) {
                    direction = 1;
                } else if (desiredLocation < this.currentIndex && !squares[this.currentIndex - boardSize].classList.contains('wall')) {
                    direction = -boardSize;
                } else if (desiredLocation > this.currentIndex && !squares[this.currentIndex + boardSize].classList.contains('wall')) {
                    direction = boardSize;
                } else {
                    direction = null;
                }
            }

            return direction;
        }

    }

    class Clyde extends Ghost {
        constructor(startIndex) {
            super(startIndex, 150);
        }

        move(/*pacmanCurrentIndex, boardSize*/) {
            const distance = Math.sqrt(
                Math.pow(this.currentIndex % boardSize - pacmanCurrentIndex % boardSize, 2) +
                Math.pow(Math.floor(this.currentIndex / boardSize) - Math.floor(pacmanCurrentIndex / boardSize), 2)
            );

            if (this.frightened || distance < 8) {
                if (this.currentIndex / boardSize < boardSize - (this.currentIndex % boardSize)) { // move down
                    direction = boardSize;
                } else { // move left
                    direction = -1;
                }
            } else { //chase mode
                if (pacmanCurrentIndex < this.currentIndex && !squares[this.currentIndex - 1].classList.contains('wall')) {
                    direction = -1;
                } else if (pacmanCurrentIndex > this.currentIndex && !squares[this.currentIndex + 1].classList.contains('wall')) {
                    direction = 1;
                } else if (pacmanCurrentIndex < this.currentIndex && !squares[this.currentIndex - boardSize].classList.contains('wall')) {
                    direction = -boardSize;
                } else if (pacmanCurrentIndex > this.currentIndex && !squares[this.currentIndex + boardSize].classList.contains('wall')) {
                    direction = boardSize;
                } else {
                    direction = null;
                }
            }
            return direction;
        }
    }

    let ghostsl = [
        new Blinky(redStartIndex),
        new Blinky(pinkStartIndex),
        new Blinky(blueStartIndex),
        new Blinky(orangeStartIndex)
    ]

    // check if ghosts.json file is available

    /*if('ghosts.json' in window.location.href) {
        // ghosts.json file is available, parse the JSON data and create the ghosts array
        ghostsl = JSON.parse('ghosts.json').ghosts.map(ghostData => {
            switch (ghostData.type) {
                case 'Blinky':
                    return new Blinky(ghostData.startIndex);
                case 'Pinky':
                    return new Pinky(ghostData.startIndex);
                case 'Inky':
                    return new Inky(ghostData.startIndex);
                case 'Clyde':
                    return new Clyde(ghostData.startIndex);
                default:
                    throw new Error(`Unknown ghost type: ${ghostData.type}`);
            }
        });
    } */

    const ghosts = ghostsl

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove('dot', 'pellet', 'wall', 'pac-man')
        squares[ghost.currentIndex].classList.add('ghost', ghost.constructor.name)
    })

    function moveGhost(ghost) {
        let direction = ghost.move();
        let limit = 100;
        let limiter = 0;

        ghost.timerId = setInterval(function() {
            while ((squares[ghost.currentIndex + direction].classList.contains('ghost') ||
                squares[ghost.currentIndex + direction].classList.contains('wall'))
            && limiter < limit) {
                direction = ghost.move();
                limiter++;
            }

            if (!squares[ghost.currentIndex].classList.contains('wall')) {
                squares[ghost.currentIndex].classList.remove(ghost.constructor.name, 'ghost', 'frightened-ghost')
                squares[ghost.currentIndex].style.backgroundImage = `url(${render(2)})`;
                if (layout[ghost.currentIndex] === 0) {
                    squares[ghost.currentIndex].classList.add('dot')
                    squares[ghost.currentIndex].style.backgroundImage = `url(pac-dots.png)`;
                }
                ghost.currentIndex += direction
                if (this.constructor.name === 'Blinky')
                    squares[ghost.currentIndex].style.backgroundImage = `url(red-ghost.png)`;
                if (this.constructor.name === 'Pinky')
                    squares[ghost.currentIndex].style.backgroundImage = `url(${render(11)})`;
                if (this.constructor.name === 'Inky')
                    squares[ghost.currentIndex].style.backgroundImage = `url(${render(12)})`;
                if (this.constructor.name === 'Clyde')
                    squares[ghost.currentIndex].style.backgroundImage = `url(${render(13)})`;
                squares[ghost.currentIndex].style.backgroundImage = `url(red-ghost.png)`
                squares[ghost.currentIndex].classList.remove(ghost.constructor.name, 'dot', 'pellet')
                squares[ghost.currentIndex].classList.add(ghost.constructor.name, 'ghost')
            }

            if (ghost.frightened) {
                squares[ghost.currentIndex].classList.remove('ghost')
                squares[ghost.currentIndex].classList.add('frightened-ghost')
            }

            if(ghost.frightened && squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.constructor.name, 'ghost', 'frightened-ghost')
                score += 100
                squares[ghost.startIndex].classList.add(ghost.constructor.name, 'frightened-ghost')
                ghost.currentIndex = ghost.startIndex
            }
            checkLose()
        }, ghost.speed)
    }

    ghosts.forEach(ghost => moveGhost(ghost))

})
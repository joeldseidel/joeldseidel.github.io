//CONSTANTS AND PIECE DEFINITION
//Map key controls to key codes
let key = { LEFT : 37, RIGHT : 39, DOWN : 40, ESC: 27, SPACE : 32};
let direction = { UP : 0, RIGHT : 1, DOWN : 2, LEFT : 3, MIN : 0, MAX : 3};
let gameView = document.getElementById("game-view");
let gameViewContext = gameView.getContext("2d");
let nextPieceView = document.getElementById("upcoming");
let nextPieceViewContext = nextPieceView.getContext("2d");
let piecePixelSize = { x : 0, y : 0};
let gridDimensions = { x : 10, y : 20 };
let nextPieceDimensions = { x : 5, y : 5};

//Define blocks and components as a 16 bit integer
let i = { size : 4, blocks : [0x0F00, 0x2222, 0x00F0, 0x4444], color : '#00ccff' };
let j = { size : 3, blocks : [0x44C0, 0x8E00, 0x6440, 0x0E20], color : '#0066cc' };
let l = { size : 3, blocks : [0x4460, 0x0E80, 0xC440, 0x2E00], color : '#ff9900' };
let o = { size : 2, blocks : [0xCC00, 0xCC00, 0xCC00, 0xCC00], color : '#ffff00' };
let s = { size : 3, blocks : [0x06C0, 0x8C40, 0x6C00, 0x4620], color : '#00cc00' };
let t = { size : 3, blocks : [0x0E40, 0x4C40, 0x4E00, 0x4640], color : '#660066' };
let z = { size : 3, blocks : [0x0C60, 0x4C80, 0xC600, 0x2640], color : '#ff0000' };

let pieceTypes = [i, j, l, o, s, t, z];

/**
 * Block bit manipulation, look for a specific piece based on a block signature
 * @param type type of block
 * @param x x position of the bit
 * @param y y position of the bit
 * @param orientation orientation of the block
 * @param onManip function to reconcile the manipulation
 */
let blockBit = function(type, x, y, orientation, onManip) {
    let bit, result;
    let row = 0, col = 0;
    let blocks = type.blocks[orientation];
    for(bit = 0x8000; bit > 0; bit = bit >> 1){
        if(blocks & bit) {
            onManip(x + col, y +row);
        }
        col += 1;
        if(col === 4) {
            col = 0;
            row += 1;
        }
    }
};

/**
 * Is this location occupied?
 * @param type type of block
 * @param x x coordinate
 * @param y y coordinate
 * @param orientation orientation of the block
 * @returns {boolean} is this location occupied?
 */
let isOccupied = function(type, x, y, orientation) {
    let result = false;
    blockBit(type, x, y, orientation, function(){
        if((x < 0) || (x >= gridDimensions.x) || (y < 0) || (y >= gridDimensions.y) || getBlock(x, y)){
            result = true;
        }
    });
    return result;
};

/**
 * Is this location not occupied?
 * @param type type of block
 * @param x x coordinate
 * @param y y coordinate
 * @param orientation orientation of the block
 * @returns {boolean} is the location not occupied?
 */
let isUnoccupied = function(type, x, y, orientation){
    return !isOccupied(type, x, y, orientation);
};

/**
 * Get a random type of piece and random orientation from that type of piece
 * @returns {{orientation: *, x: *, y: number, type: *}}
 */
let getRandomPiece = function(){
    let pieceType = Math.floor(Math.random() * 7);
    let pieceOrientation = Math.floor(Math.random() * 4);
    return { type : pieceTypes[pieceType], orientation : direction.UP, x : Math.floor(Math.random() * (gridDimensions.x - pieceTypes[pieceType].size)), y : 0};
};

let invalid = {};

let invalidate = function() {
    invalid.court = true;
};

let invalidateNext = function() {
    invalid.next = true;
};

let invalidateRows = function(){
    invalid.rows = true;
};

let redraw = function(){
    gameViewContext.save();
    gameViewContext.lineWidth = 1;
    gameViewContext.translate(0.5, 0.5);
    drawGameView();
    drawNextPiece();
    drawRows();
    gameViewContext.restore();
};

let drawGameView = function(){
    if(invalid.court){
        gameViewContext.clearRect(0, 0, gameView.width, gameView.height);
        if(isPlaying){
            drawPiece(gameViewContext, current.type, current.x, current.y, current.dir);
            let x; let y; let block;
            for(y = 0; y < gridDimensions.y; y++){
                for(x = 0; x < gridDimensions.x; x++){
                    if(block = getBlock(x, y)){
                        drawBlock(gameViewContext, x, y, block.color);
                    }
                }
            }
            gameViewContext.strokeRect(0, 0, gridDimensions.x * piecePixelSize.x - 1, gridDimensions.y * piecePixelSize - 1);
            invalid.court = false;
        }
    }
};

let drawNextPiece = function(){
    if(invalid.next){
        let padding = (nextPieceDimensions.x - next.type.size);
        nextPieceViewContext.save();
        nextPieceViewContext.translate(0.5, 0.5);
        nextPieceViewContext.clearRect(0, 0, nextPieceDimensions.x * piecePixelSize.x, nextPieceDimensions.x * piecePixelSize.y);
        drawPiece(nextPieceViewContext, next.type, padding, padding, next.orientation);
        nextPieceViewContext.strokeStyle = 'black';
        nextPieceViewContext.strokeRect(0, 0, piecePixelSize.x * nextPieceDimensions.x - 1, nextPieceDimensions.x * piecePixelSize.y - 1);
        nextPieceViewContext.restore();
        invalid.next = false;
    }
};

let drawRows = function(){
    if(invalid.rows) {
        $('#rows').innerHTML(rows);
        invalid.rows = false;
    }
};

let drawPiece = function(context, type, x, y, dir){
    blockBit(type, x, y, dir, function(x, y){
        drawBlock(context, x, y, type.color);
    });
};

let drawBlock = function(context, x, y, color){
    context.fillStyle = color;
    let dx = piecePixelSize.x;
    let dy = piecePixelSize.y;
    context.fillRect(x * dx, y * dy, dx, dy);
    context.strokeRect(x * dx, y * dy, dx, dy);
};

//Current timestamp
let now;
//Queue of user input/actions
let actions;
//Is the user currently playing?
let isPlaying = false;
//2D array of where the blocks are
let blocks;
//Current piece
let current;
//Next piece
let next;
//Speeds for the game loop
let speed = { start : 0.6, decrement : 0.005, min : 0.1 };

let gameLoop = function(){
    initControls();
    let last = now = new Date().getTime();
    let thisFrame = function(){
        now = new Date().getTime();
        onUpdate(Math.min(1, (now - last) / 1000.0));
        redraw();
        last = now;
        requestAnimationFrame(thisFrame, gameView);
    };
    doResize();
    doReset();
    thisFrame();
};

let initControls = function(){
    document.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('resize', doResize, false);
};

let doResize = function(){
    //Tell the canvas where it can draw on itself
    gameView.width = gameView.clientWidth;
    gameView.height = gameView.clientHeight;
    nextPieceView.width = nextPieceView.clientWidth;
    nextPieceView.height = nextPieceView.clientHeight;
    piecePixelSize.x = gameView.width / gridDimensions.x;
    piecePixelSize.y = gameView.height / gridDimensions.y;
    invalidate();
    invalidateNext();
};

let handleKeyDown = function(ev) {
    let handled = false;
    if(isPlaying){
        switch(ev.keyCode){
            case key.LEFT:
                actions.push(direction.LEFT);
                handled = true;
                break;
            case key.RIGHT:
                actions.push(direction.RIGHT);
                handled = true;
                break;
            case key.UP:
                actions.push(direction.UP);
                handled = true;
                break;
            case key.DOWN:
                actions.push(direction.DOWN);
                handled = true;
                break;
            case key.ESC:
                handleLose();
                handled = true;
                break;
        }
    } else if(ev.keyCode === key.SPACE){
        handlePlay();
        handled = true;
    }
    if(handled){
        //Prevent scroll or leaving page for keyboard commands
        ev.preventDefault();
    }
};

let handlePlay = function(){
    doReset();
    isPlaying = true;
};

let handleLose = function(){
    isPlaying = false;
};

let getBlock = function(x, y){
    //Ternary swap on the blocks to a specific coordinate
    return (blocks && blocks[x] ? blocks[x][y] : null);
};

let setBlock = function(x, y, type){
    blocks[x] = blocks[x] || [];
    blocks[x][y] = type;
    invalidate();
};

let clearBlocks = function(){
    blocks = [];
};

let clearActions = function(){
    actions = [];
};

let setCurrentPiece = function(piece){
    current = piece || getRandomPiece();
    invalidate();
};

let setNextPiece = function(piece) {
    next = piece || getRandomPiece();
    invalidateNext();
};

let clearRows = function() {
    setRows(0);
};

let setRows = function(n) {
    rows = n;
    step = Math.max(speed.min, speed.start - (speed.decrement * rows));
    invalidateRows();
};

let addRows = function(n) {
    setRows(rows + n);
};

//Time spent playing the game
let dt;
//Time until a piece drops
let step;

let doReset = function(){
    dt = 0;
    clearActions();
    clearBlocks();
    setCurrentPiece(next);
    setNextPiece();
};

let onUpdate = function(idt){
    if(isPlaying){
        handleAction(actions.shift());
        dt = dt + idt;
        if(dt > step){
            dt -= step;
            drop();
        }
    }
};

let handleAction = function(action){
    switch(action){
        case direction.LEFT:
            move(direction.LEFT);
            break;
        case direction.RIGHT:
            move(direction.RIGHT);
            break;
        case direction.UP:
            rotate();
            break;
        case direction.DOWN:
            drop();
            break;
    }
};

let move = function(dir) {
    let x = current.x, y = current.y;
    switch(dir){
        case direction.RIGHT:
            x += 1;
            break;
        case direction.LEFT:
            x -= 1;
            break;
        case direction.DOWN:
            y += 1;
            break;
    }
    if(isUnoccupied(current.type, x, y, current.orientation)){
        current.x = x;
        current.y = y;
        invalidate();
        return true;
    } else {
        return false;
    }
};

let rotate = function(){
    let newOrientation = (current.dir === direction.MAX ? direction.MIN : current.dir + 1);
    if(isUnoccupied(current.type, current.x, current.y, newOrientation)){
        current.dir = newOrientation;
        invalidate();
    }
};

let drop = function(){
    if(!move(direction.DOWN)){
        dropPiece();
        removeLines();
        setCurrentPiece(next);
        setNextPiece(getRandomPiece());
        clearActions();
        if(isOccupied(current.type, current.x, current.y, current.dir)){
            handleLose();
        }
    }
};

let dropPiece = function(){
    blockBit(current.type, current.x, current.y, current.dir, function(x, y){
        setBlock(x, y, current.type);
    });
};

let removeLines = function(){
    let x, y, complete, n = 0;
    for(y = gridDimensions.y; y > 0; y--){
        if(!getBlock(x, y)){
            complete = false;
        }
        if(complete){
            removeLine(y);
            y += 1;
            n++;
        }
    }
    if(n > 0){
        addRows(n);
    }
};

let removeLine = function(index){
    let x; let y;
    for(y = index; y >= 0; y--){
        for(x = 0; x < gridDimensions.x; x++){
            //Set this removed lined blocks to their new location
            //Perform cascade
            setBlock(x, y, (y === 0) ? null : getBlock(x, y - 1));
        }
    }
};

gameLoop();
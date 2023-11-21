//game init //do do doooo do do doooo
kaboom({ width: 1280, height: 720, scale: 1.3, debug: true})

////////////////////////////////////////////////////////////////
/////////////////////////STAGE//////////////////////////////////
////////////////////////////////////////////////////////////////

loadSprite("background", "assets/background/background_layer_1.png")
loadSprite("trees", "assets/background/background_layer_2.png")
loadSpriteAtlas("assets/oak_woods_tileset.png", {
    "ground-golden": {
        "x": 16,
        "y": 0,
        "width": 16,
        "height": 16,
    },
    "deep-ground": {
        "x": 16,
        "y": 32,
        "width": 16,
        "height": 16
    },
    "ground-silver": {
        "x": 150,
        "y": 0,
        "width": 16,
        "height": 16
    }
})

loadSprite("shop", "assets/shop_anim.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        "default": {
            from: 0,
            to: 5,
            speed: 12,
            loop: true
        }
    }
})
loadSprite("fence", "assets/fence_1.png")
loadSprite("sign", "assets/sign.png")


//----------------------PLAYER 1 ASSETS----------------------//
loadSprite("idle-player1", "assets/idle-player1.png", {
    sliceX: 8, sliceY: 1, anims: { "idle": {from: 0, to: 7, speed: 12, loop: true}}
})
loadSprite("jump-player1", "assets/jump-player1.png", {
    sliceX: 2, sliceY: 1, anims: { "jump": { from: 0, to: 1, speed: 2, loop: true}}
})
loadSprite("attack-player1", "assets/attack-player1.png", {
    sliceX: 6, sliceY: 1, anims: { "attack": { from: 1, to: 5, speed: 18}}
})
loadSprite("run-player1", "assets/run-player1.png", {
    sliceX: 8, sliceY: 1, anims: { "run": { from: 0, to: 7, speed: 18}}
})
loadSprite("death-player1", "assets/death-player1.png", {
    sliceX: 6, sliceY: 1, anims: { "death": { from: 0, to: 5, speed: 10}}
})

//----------------------PLAYER 2 ASSETS----------------------//
loadSprite("idle-player2", "assets/idle-player2.png", {
    sliceX: 8, sliceY: 1, anims: { "idle": {from: 0, to: 7, speed: 12, loop: true}}
})
loadSprite("jump-player2", "assets/jump-player2.png", {
    sliceX: 2, sliceY: 1, anims: { "jump": { from: 0, to: 1, speed: 2, loop: true}}
})
loadSprite("attack-player2", "assets/attack-player2.png", {
    sliceX: 6, sliceY: 1, anims: { "attack": { from: 1, to: 5, speed: 18}}
})
loadSprite("run-player2", "assets/run-player2.png", {
    sliceX: 8, sliceY: 1, anims: { "run": { from: 0, to: 7, speed: 18}}
})
loadSprite("death-player2", "assets/death-player2.png", {
    sliceX: 6, sliceY: 1, anims: { "death": { from: 0, to: 5, speed: 10}}
})


//#####################################################################//
//old player 2
/*
loadSprite("idle-player2", "assets/idle-player2.png", {
    sliceX: 4, sliceY: 1, anims: { "idle": { from: 0, to: 3, speed: 8, loop: true}}
})
loadSprite("jump-player2", "assets/jump-player2.png", {
    sliceX: 2, sliceY: 1, anims: {"jump": { from: 0, to: 1, speed: 2, loop: true}}
})
loadSprite("attack-player2", "assets/attack-player2.png", {
    sliceX: 4, sliceY: 1, anims: { "attack": { from: 0, to: 3, speed: 18}}
})
loadSprite("run-player2", "assets/run-player2.png", {
    sliceX: 8, sliceY: 1, anims: { "run": { from: 0, to: 7, speed: 18}}
})
loadSprite("death-player2", "assets/death-player2.png", {
    sliceX: 7, sliceY: 1, anims: { "death": { from: 0, to: 6, speed: 10}}
})
*/
//#####################################################################//




// you can drive
// all night
// looking for the answers in the pouring rain
// you wanna find
// peace of mind
// looking for the answer...

// thank you brendan eich for making the most popular language terrible
var gamecounter = 0;
var myPlayerNumber = 0;
var new_game_id;
var globalsocket;
var game_id;
//let game_id;
/*function getGameIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('game_id');
}*/

// Start the process
console.log("#-------DEBUG------#");
console.log("new game: " + game_id);
//console.log("socket: " + socket);


/*socket.on('playerNumber', (playerNumber) => {
    myPlayerNumber = playerNumber; 
    console.log("You are player", myPlayerNumber);
});*/

////////////////////////////
//////// ready up //////////
////////////////////////////

scene ("ready_up", () => {
    
    const background = add([
        sprite("background"),
        scale(4)
    ]);
    
    background.add([
        sprite("trees"),
    ]);

    let cen_x = 400;
    let cen_y = 360;
    let red = [240, 0, 0];
    let green = [0, 240, 0];
    // this language is completely detached from reality
    const p1rec_red = add([ rect(50,50), pos(cen_x + 30 , cen_y + 95), color(red), opacity(0.7) ]);
    const p1rec_green = add([rect(50,50), pos(cen_x + 30 , cen_y + 95), color(green), opacity(0) ]);
    const p2rec_red = add([ rect(50,50), pos(cen_x + 365 , cen_y + 95), color(red), opacity(0.7) ]);
    const p2rec_green = add([ rect(50,50), pos(cen_x + 365 , cen_y + 95), color(green), opacity(0) ]);
    const starttext = add([ text("starting game...", 24), pos(cen_x + 90, cen_y + 30), scale(0.75), color(1, 1, 1), opacity(0) ]);
    
    
    add([rect(500,75), pos(cen_x - 30 , cen_y - 95), color(128, 128, 128), opacity(0.7) ]);
    
    const title = add([text("press s to ready up", 32), pos(cen_x, cen_y - 80), color(1, 1, 1) ]);
    

    add([ scale(1.2), text("player 1", 32), pos(cen_x - 230, cen_y + 100), color(1, 1, 1) ]);
    
    add([scale(1.2), text("player 2", 32), pos(cen_x + 470, cen_y + 100), color(1, 1, 1) ]);

    console.log("up to here");
   
   
    // there is probably already methods called connect so will just use this
    
    let myPlayerNumber = 0;
    let p1ready = false;
    let p2ready = false;
    
    function getGameURL() {
        return fetch(`http://localhost:8008/newgame`)
        .then(response => response.ok ? response.json() : Promise.reject('Response not OK'))
        .then(data => {
            console.log("game id: " + data.url);
            return data.url;
        });
    }
    let gameUrl = "";
 
    async function connectshab() {
        //const game_id = new URLSearchParams(window.location.search).get('game_id');
        console.log("connect shab");
        gameUrl = await getGameURL();
        
        if (gameUrl != null) {
            const urlParts = new URL(gameUrl);
            let game_id = urlParts.pathname.replace('/', '');
            console.log("gameid: " + game_id);
            //let r_counter = 0;
            
            
            socket = io.connect(`http://localhost:8008/`, {
                withCredentials: true,
                query: { game_id: game_id }
            });

            globalsocket = socket;
            console.log("global socket: ",  globalsocket);
            console.log("reg socket: ",  socket);


            socket.on('playerNumber', (playerNumber) => {
                myPlayerNumber = playerNumber;
                console.log("You are player", myPlayerNumber);
                });
        
            onKeyPress("s", () => {
                // i need to change this "direction"
                console.log("test");
                socket.emit('ready', { game_id: game_id, direction: 'start' });   
            });
        
            socket.on('ready', (data) => {
                console.log("player:" + myPlayerNumber);
                console.log(data.playerNumber);
                // run right

                if (data.playerNumber === 1 && data.direction === 'start') {
                        console.log("player 1 ready");
                        p1rec_red.opacity = 0;
                        p1rec_green.opacity = 0.7;
                        p1ready = true;
                }
                if (data.playerNumber === 2 && data.direction === 'start') {
                        console.log("player 2 ready");
                        p2rec_red.opacity = 0;
                        p2rec_green.opacity = 0.7;
                        p2ready = true;                   
                }
                if (p1ready && p2ready) {
                    starttext.opacity = 1.0;
                        wait(2, () => {
                            console.log("starting game");
                            r_counter = 0;
                            go("fight");
                    })
                }
            });
        // Add other socket event listeners here
        } else {
            console.log("error getting game id");
        }
    }
    
    document.getElementById('copyButton').addEventListener('click', function() {
        if (gameUrl) {
            navigator.clipboard.writeText(gameUrl)
                .then(() => {
                    console.log('URL copied to clipboard');
                    // Optionally, provide feedback to the user that the URL was copied
                })
                .catch(err => console.error('Error in copying URL: ', err));
        } else {
            console.log('No game URL available to copy');
        }
    });
    

    //window.addEventListener('load', connectshab);
    console.log("test");
    
    console.log("but not here");
    
    connectshab();
    //window.location.href = gameUrl;
    

});

scene ("end", () => {
    
    const background = add([
        sprite("background"),
        scale(4)
    ]);
    
    background.add([
        sprite("trees"),
    ]);

    let cen_x = 400;
    let cen_y = 360;
    let red = [240, 0, 0];
    let green = [0, 240, 0];
    // this language is completely detached from reality
    const p1rec_red = add([
        rect(50,50), 
        pos(cen_x + 30 , cen_y + 95), 
        color(red),
        opacity(0.7)
         
    ]);
    const p1rec_green = add([
        rect(50,50), 
        pos(cen_x + 30 , cen_y + 95), 
        color(green),
        opacity(0)
         
    ]);
    
    const p2rec_red = add([
        rect(50,50), 
        pos(cen_x + 365 , cen_y + 95), 
        color(red),
        opacity(0.7)
        
    ]);
    const p2rec_green = add([
        rect(50,50), 
        pos(cen_x + 365 , cen_y + 95), 
        color(green),
        opacity(0)
        
    ]);

    const starttext = add([
        text("restarting", 24),
        pos(cen_x + 90, cen_y + 30),
        scale(0.75),
        color(1, 1, 1),
        opacity(0) 
    ]);
    
    
    add([
        rect(500,75), 
        pos(cen_x - 30 , cen_y - 95), 
        color(128, 128, 128),
        opacity(0.7) 
    ]);
    
    
    add([
        text("press s to rematch", 32),
        pos(cen_x, cen_y - 80),
        color(1, 1, 1), 
    ]);

    add([
        scale(1.2),
        text("player 1", 32), 
        pos(cen_x - 230, cen_y + 100), 
        color(1, 1, 1), 
    ]);
    
    add([
        scale(1.2),
        text("player 2", 32),
        pos(cen_x + 470, cen_y + 100), 
        color(1, 1, 1), 
    ]);

    let socket = globalsocket;
    
    let p1ready = false;
    let p2ready = true;
    onKeyPress("s", () => {
        // i need to change this "direction"
        //console.log("test");
        socket.emit('ready', { game_id: game_id, direction: 'start' });   
    });
    
    socket.on('ready', (data) => {
        console.log("player:" + myPlayerNumber);
        console.log(data.playerNumber);
        //run right
        if (data.playerNumber === 1) {
            if (data.direction === 'start') {
                console.log("player 1 ready");
                p1rec_red.opacity = 0;
                p1rec_green.opacity = 0.7;
                p1ready = true;

            }
        }
        if (data.playerNumber === 2) {
            if (data.direction === 'start') {
                console.log("player 2 ready");
                p2rec_red.opacity = 0;
                p2rec_green.opacity = 0.7;
                p2ready = true;
            }
        }

        if (p1ready && p2ready){
            starttext.opacity = 1.0;
            wait(2, () => {
                console.log("starting game");
                r_counter = 0;
                go("fight");
            })
        }
    });
   

});

scene("fight", () => {
   
    const background = add([
        sprite("background"),
        scale(4)
    ]);

    background.add([
        sprite("trees"),
    ]);

    const groundTiles = addLevel([
        "","","","","","","","","",
        "------#######-----------",
        "dddddddddddddddddddddddd",
        "dddddddddddddddddddddddd"
        ], {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            "#": () => [
                sprite("ground-golden"),
                area(),
                body({isStatic: true})
            ],
            "-": () => [
                sprite("ground-silver"),
                area(),
                body({isStatic: true}),
            ],
            "d": () => [
                sprite("deep-ground"),
                area(),
                body({isStatic: true})
            ]
        }
    });
    
    groundTiles.use(scale(4))

    const shop = background.add([
        sprite("shop"),
        pos(170, 15),
    ])

    shop.play("default")

   // left invisible wall
   add([
    rect(16, 720),
    area(),
    body({isStatic: true}),
    pos(-20,0)
   ])

   // right invisible wall
   add([
    rect(16, 720),
    area(),
    body({isStatic: true}),
    pos(1280,0)
   ])

   background.add([
    sprite("fence"),
    pos(85, 125)
   ])

   background.add([
    sprite("fence"),
    pos(10, 125)
   ])

   background.add([
    sprite("sign"),
    pos(290, 115)
   ])
////////////////////////////////////////////////////////////////
/////////////////////////STAGE//////////////////////////////////
////////////////////////////////////////////////////////////////
// init socket.io    
// we might not need to put it here -- we did not need to put it here
   let socket = globalsocket;

   //init player

    function makePlayer(posX, posY, width, height, scaleFactor, id) {
        return add([
            pos(posX, posY),
            scale(scaleFactor),
            area({shape: new Rect(vec2(0), width, height)}),
            anchor("center"),
            body({stickToPlatform: true}),
            {
                isCurrentlyJumping: false,
                health: 500,
                sprites: {
                    run: "run-" + id,
                    idle: "idle-" + id,
                    jump: "jump-" + id,
                    attack: "attack-" + id,
                    death: "death-" + id
                }
            }
        ])
    }

    setGravity(1200);

    let player1flip = false;
    let player2flip = true;
    let is_attacking = false;

    const player1 = makePlayer(200, 100, 16, 42, 4, "player1");
    player1.use(sprite(player1.sprites.idle));
    player1.play("idle");

    const player2 = makePlayer(1000, 200, 16, 42, 4, "player2");
    player2.use(sprite(player2.sprites.idle));
    player2.play("idle");
    player2.flipX = player2flip;



    

    function swapFlip() {
        let p1_pos = player1.pos.x;
        let p2_pos = player2.pos.x;

        if (p1_pos > p2_pos) {
            player1.flipX = true;
            player2.flipX = false;
            console.log("p1 on right, p2 on left");
        }
        if (p1_pos < p2_pos) {
            player1.flipX = false;
            player2.flipX = true;
            console.log("p1 on left, p2 on right");
        }

        

        player1flip = player1.flipX;
        player2flip = player2.flipX;
    }

    function run(player, speed, flipPlayer) {
        if (player.health === 0) {
            return;
        }
    
        if (player.curAnim() !== "run"
            && !player.isCurrentlyJumping) {
            player.use(sprite(player.sprites.run));
            player.play("run");
        }
        player.move(speed,0);
        player.flipX = flipPlayer;
    }

    function resetPlayerToIdle(player) {
        swapFlip();
        player.use(sprite(player.sprites.idle));
        player.play("idle");
    }
    
    // jump
    function makeJump(player) {
        if (player.health === 0) {
            return;
        }
    
        if (player.isGrounded()) {
            const currentFlip = player.flipX;
            player.jump();
            player.use(sprite(player.sprites.jump));
            player.flipX = currentFlip;
            player.play("jump");
            player.isCurrentlyJumping = true;
        }
    }
    
    // reset jump
    function resetAfterJump(player) {
        if (player.isGrounded() && player.isCurrentlyJumping) {
            player.isCurrentlyJumping = false;
            if (player.curAnim() !== "idle") {
                resetPlayerToIdle(player);
            }
        }
    }
    // attack
    function attack(player, excludedKeys) {
        is_attacking = true;
        if (player.health === 0) {
            return;
        }
    
        for (const key of excludedKeys) {
            if (isKeyDown(key)) {
                console.log("idk");
                if (myPlayerNumber == 1) {
                    console.log("glitch");
                    destroyAll(player1.id + "attackHitbox");
                }
                if (myPlayerNumber == 2) {
                    destroyAll(player2.id + "attackHitbox");
                }
            }
        }
        

    
        const currentFlip = player.flipX;
        if (player.curAnim() !== "attack") {
            player.use(sprite(player.sprites.attack))
            player.flipX = currentFlip;
            const slashX = player.pos.x + 30;
            const slashXFlipped = player.pos.x - 350;
            const slashY = player.pos.y - 200;
            //let hitbox_size = [300,300];
            wait(15/60, () => {
                if(is_attacking){
                    add ([
                        rect(300,200),
                        area(),
                        pos(currentFlip ? slashXFlipped: slashX, slashY),
                        opacity(0.5),
                        player.id + "attackHitbox"
                    ]);
                }
            });
            if (!is_attacking) {
                if (myPlayerNumber == 1) {
                    destroyAll(player1.id + "attackHitbox");
                }
                if (myPlayerNumber == 2) {
                    destroyAll(player2.id + "attackHitbox");
                }
            }
                
                
            player.play("attack", {
                onEnd: () => {
                    socket.emit('release', {game_id: game_id, direction: 'attack' });
                    resetPlayerToIdle(player);
                    player.flipX = currentFlip;
                    is_attacking = false;
                    
                }
            }) 
        }
    }

    
    if (!is_attacking){
    // move right
    onKeyDown("d", () => {
            socket.emit('move', { game_id: game_id, direction: 'right' });
            console.log("client pressed d");
    });
    onKeyRelease("d", () => {
        socket.emit('release', { game_id: game_id, direction: 'right' });
    });

    // move left
    onKeyDown("a", () => {
            socket.emit('move', { game_id: game_id, direction: 'left' });   
        
    });
    onKeyRelease("a", () => {
        socket.emit('release', { game_id: game_id, direction: 'left' });
    });


    // jump
    onKeyDown("w", () => {
            socket.emit('move', { game_id: game_id, direction: 'jump' });
    });
    }
    player1.onUpdate(() => resetAfterJump(player1))
    player2.onUpdate(() => resetAfterJump(player2))

    onKeyPress("space", () => {
        socket.emit('move', { game_id: game_id, direction: 'attack' });
        console.log("sent data");
  
    });

   
    //state control
    socket.on('state', (data) => {
        
        if (data.direction === 'p1win') {
            console.log("game over - p1 win");
            clearInterval(countInterval);
            declareWinner(winningText, player1, player2);
            gameOver = true;
        }

        if (data.direction === 'p2win') {
            console.log("game over - p2 win");
            clearInterval(countInterval);
            declareWinner(winningText, player1, player2);
            gameOver = true;
        }

        if (data.direction === 'p1l' && !gameOver) {
            console.log("p1 lost health");
            player1.health -= 50;
            tween(player1HealthBar.width, player1.health, 1, (val) => {
                player1HealthBar.width = val;
            }, easings.easeOutSine)
        }

        if (data.direction === 'p2l' && !gameOver) {
            console.log("p2 lost health ");
            player2.health -= 50;
            tween(player2HealthBar.width, player2.health, 1, (val) => {
                player2HealthBar.width = val;
            }, easings.easeOutSine)
        }
        
    });

    socket.on('move', (data) => {
        console.log("player:" + myPlayerNumber);
        swapFlip();
        console.log(data.direction);
        //run right
        if (data.playerNumber === 1 && data.direction === 'right') {
                console.log("server responded d");
                run(player1, 500, player1flip);
                destroyAll(player1.id + "attackHitbox");
                is_attacking = false;
        }
        if (data.playerNumber === 2 && data.direction === 'right') {
                console.log("server responded d");
                run(player2, 500, player2flip);
                destroyAll(player2.id + "attackHitbox");
                is_attacking = false;
        }
        //run left
        if (data.playerNumber === 1 && data.direction === 'left') {
                run(player1, -500, player1flip);
                destroyAll(player1.id + "attackHitbox");
                is_attacking = false;
        }
        if (data.playerNumber === 2 && data.direction === 'left') {
                run(player2, -500, player2flip);
                destroyAll(player2.id + "attackHitbox");
                is_attacking = false;
        }
        //jumping
        if (data.playerNumber === 1 && data.direction === 'jump' ) {
                makeJump(player1);
        }
        if (data.playerNumber === 2 && data.direction === 'jump' ) {
                makeJump(player2);
        }

        //attack
        if (data.playerNumber === 1 && data.direction === 'attack') {
                attack(player1, ["a", "d", "w"]);
            
        }
        if (data.playerNumber === 2 && data.direction === 'attack') {
                attack(player2, ["left", "right", "up"])
        }        
    });
    
    socket.on('release', (data) => {
        console.log("player:" + myPlayerNumber);
        console.log("released key: " + data.direction);
        swapFlip();


        if (data.playerNumber === 1 && data.direction === 'attack') {
            destroyAll(player1.id + "attackHitbox");
        }
        if (data.playerNumber === 2 && data.direction === 'attack') {
            destroyAll(player2.id + "attackHitbox");
        }
      
        
        if (data.playerNumber === 1) {
            if (player1.health !== 0) {
                resetPlayerToIdle(player1);
                player1.flipX = player1flip;
            }
        }
        if (data.playerNumber === 2) {
            if (player2.health !== 0) {
                resetPlayerToIdle(player2);
                player2.flipX = player2flip;
            }
        }
        

    });
    
/*
  
*/    
    const counter = add([
        rect(100,100),
        pos(center().x, center().y - 300),
        color(10,10,10),
        area(),
        anchor("center")
       ])
    
    const count = counter.add([
        text("60"),
        area(),
        anchor("center"),
        {
            timeLeft: 60,
        }
    ])

    const winningText = add([
        text(""),
        area(),
        anchor("center"),
        pos(center())
    ])
    
    let gameOver = false;
    
    onKeyDown("enter", () => gameOver ? go("fight") : null);

    function declareWinner(winningText, player1, player2) {
        if (player1.health > 0 && player2.health > 0
            || player1.health === 0 && player2.health === 0) {
            winningText.text = "Tie!";
        } else if (player1.health > 0 && player2.health === 0) {
            winningText.text = "Player 1 won!";
            player2.use(sprite(player2.sprites.death));
            player2.play("death");
            
        } else {
            winningText.text = "Player 2 won!"
            player1.use(sprite(player1.sprites.death));
            player1.play("death");
            
        }
        wait (3 , () => {
            console.log(gamecounter);
            gamecounter+=1;
            
            if (gamecounter > 2) {
                go("end");
                console.log("going back to start");
            }
            else {
                console.log("next game");
                console.log(gamecounter);
                go("fight");
            }
        })
    }

    const countInterval = setInterval(() => {
        if (count.timeLeft === 0) {
            clearInterval(countInterval);
            declareWinner(winningText, player1, player2);
            socket.emit('gamestate', { game_id: game_id, direction: 'p2win'});
            gameOver = true;
    
            return;
        }
        count.timeLeft--;
        count.text = count.timeLeft;
        }, 1000);

    const player1HealthContainer = add([
        rect(500, 70),
        area(),
        outline(5),
        pos(90, 20),
        color(200,0,0)
       ]);
       
    const player1HealthBar = player1HealthContainer.add([
        rect(498, 65),
        color(0,180,0),
        pos(498, 70 - 2.5),
        rotate(180)
    ]);

    const player2HealthContainer = add([
        rect(500, 70),
        area(),
        outline(5),
        pos(690, 20),
        color(200,0,0)
    ]);
       
    const player2HealthBar = player2HealthContainer.add([
        rect(498, 65),
        color(0,180,0),
        pos(2.5, 2.5),
    ]);




    player1.onCollide(player2.id + "attackHitbox", () => {
        if (gameOver) {
            return;
        }
        
        if (player1.health !== 0) {
            socket.emit('gamestate', { game_id: game_id, direction: 'p1l'});  
        }
        
        if (player1.health === 0) {
            socket.emit('gamestate', { game_id: game_id, direction: 'p2win'});
        }
    });

    
    
    player2.onCollide(player1.id + "attackHitbox", () => {
        if (gameOver) {
            return;
        }
        if (player2.health !== 0) {            
            socket.emit('gamestate', {game_id: game_id, direction: 'p2l'});
        } 
        
        if (player2.health === 0) {
            socket.emit('gamestate', {game_id: game_id, direction: 'p1win'});
        }
    });
});

go("ready_up");


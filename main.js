let player1; 
let gravityWell, gravityWell2;
let lasers = []; 
let stars = []
let players = []
let Ui
let gameManager

function setup() {
    createCanvas(windowWidth, windowHeight);	
    gravity = createVector(0, 0.4);
    createStars (350)
    
    player1 = new SpaceShip({
        position: createVector(100, 500), 
        name: "player1"
    })
    player1.init()
    player2 = new SpaceShip({
        position: createVector(1000, 500), 
        name: "player2"
    })
    player2.init()

    players.push(player1)
    players.push(player2)


    gravityWell = new GravityWell ({
        position: createVector(windowWidth / 2, windowHeight / 2),
        radius: 200, 
        gravityRadius: 400
    }); 

    gravityWell2 = new GravityWell ({
        position: createVector(200, 700),
        radius: 30, 
        gravityRadius: 100
    }); 

   gravityWell.massObjects.push(player1); 
   gravityWell2.massObjects.push(player2); 

   Ui = new UI(players) 
   gameManager = new GameManager(Ui, players)
}
  
function draw() {
    background(6);
    drawStars()
    gravityWell.draw();
    gravityWell.addGravity()
    gravityWell2.draw();
    gravityWell2.addGravity()
    gravityWell.checkShipProximity()
    gravityWell2.checkShipProximity()

    player1.render();
    player1.turn();
    player1.update();
    player1.edges();
    player1.checkImpact(lasers)

    player2.render();
    player2.turn();
    player2.update();
    player2.edges();
    player2.checkImpact(lasers)


    Ui.drawHealthBar()
    Ui.drawScore()
    Ui.drawFuel()
    Ui.drawAmmo()
    gameManager.EvaluateStatus(players)

    for (var i = lasers.length-1; i >= 0; i--) {
        lasers[i].render();
          lasers[i].update();
        if (lasers[i].offscreen()) {
          lasers.splice(i, 1);
        }
    }


  
}

function keyReleased() {
    player1.setRotation(0);
    player1.boosting(false);
  }

function keyPressed() {
  
    if (key == ' ') {
        if(player1.torpedoAmmo > 0) {
            player1.torpedoAmmo -= 1
            let laser = new Laser(player1.position, player1.heading, "player1")
            lasers.push(laser);
            gravityWell.massObjects.push(laser);
        }
    } 
    else if (keyCode == RIGHT_ARROW) {
        player1.setRotation(0.1);
    } 
    else if (keyCode == LEFT_ARROW) {
        player1.setRotation(-0.1);
    } 
    else if (keyCode == UP_ARROW) {
        if(player1.fuel > 0) {
            player1.boosting(true);
        }
       
    }

    if (key == 'æ') {
        let laser = new Laser(player2.position, player2.heading, "player2")
        lasers.push(laser);
        gravityWell.massObjects.push(laser);
      } else if (keyCode == 65) {
        player2.setRotation(0.1);
    } else if (keyCode == 68) {
        player2.setRotation(-0.1);
    } else if (keyCode == 87) {
        player2.boosting(true);
    }
}

function drawScore () {
    fill(220)
    textStyle(BOLD);
    strokeWeight(20);
    textSize(256);
    text(leftScore, 200, 300);
    textSize(256);
    text(rightScore, 900, 300)
}


function drawStars () {
    stars.forEach(star => {
        star.draw()
    })
}


function createStars (numberOfStars) {
    for(let i = 0; i < numberOfStars; i++) {
        let x = random(0, windowWidth)
        let y = random(0, windowHeight)
        let radius = random (2, 8)

        stars.push(new Star ({
            position: createVector(x, y), 
            radius: radius
        }))
    }
}



  




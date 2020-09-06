let player1; 
let gravityWell, gravityWell2;
let lasers = []; 

function setup() {
    createCanvas(windowWidth, windowHeight);	
    gravity = createVector(0, 0.4);
    player1 = new SpaceShip({
        position: createVector(100, 100)
    })
    player2 = new SpaceShip({
        position: createVector(700, 100)
    })

    gravityWell = new GravityWell ({
        position: createVector(windowWidth / 2, windowHeight / 2),
        radius: 100, 
        gravityRadius: 300
    }); 

    gravityWell2 = new GravityWell ({
        position: createVector(200, 700),
        radius: 30, 
        gravityRadius: 100
    }); 

    // add player one to the gravitywells pull... 
   gravityWell.massObjects.push(player1); 
   gravityWell2.massObjects.push(player2); 

}
  
function draw() {
    background(6);
    drawStars()
    gravityWell.draw();
    gravityWell.addGravity()
    gravityWell2.draw();
    gravityWell2.addGravity()

    player1.render();
    player1.turn();
    player1.update();
    player1.edges();

    player2.render();
    player2.turn();
    player2.update();
    player2.edges();

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
        let laser = new Laser(player1.position, player1.heading)
        lasers.push(laser);
        gravityWell.massObjects.push(laser);
      } else if (keyCode == RIGHT_ARROW) {
        player1.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        player1.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        player1.boosting(true);
    }

    if (key == 'æ') {
        let laser = new Laser(player2.position, player2.heading)
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

function mouseClicked() { 
    
}

function mouseReleased() {
    
}


function drawStars () {
    for(let i = 0; i < 300; i++) {
        let x = random(0, windowWidth); 
        let y = random(0, windowHeight); 
        let radius = random(2, 8); 
        fill(200);
        ellipse(x, y, radius, radius);
    }
}



  




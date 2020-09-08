function SpaceShip(settings) {
    this.position = settings.position;
    this.spawnPosition 
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.acceleration = createVector(0, 0);  
    this.maxSpeed = 3;
    this.name = settings.name

    this.isVounerable = true; 


    this.health = 100
    this.maxHealth = 100
    this.torpedoAmmo = 100;
    this.maxTorpedoAmmo = 100
    this.fuel = 1000; 
    this.maxFuel = 1000

    this.isBoosting = false;

    let self = this;

    this.init = function (){
        this.spawnPosition = this.position;
    }
    
    this.boosting = function(b) {
        this.isBoosting = b;
    }
    
    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }

        // Velocity changes according to acceleration
        this.vel.add(this.acceleration);
        // position changes by velocity
        this.position.add(this.vel);
        // We must clear acceleration each frame
        this.acceleration.mult(0)
        this.vel.mult(0.99);
      
    }
    
    this.boost = function() {
        this.fuel -= 1; 
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
    
    this.render = function() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.heading + PI / 2);
        fill(150);
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }
    
    this.edges = function() {
        if (this.position.x > width + this.r) {
            this.position.x = -this.r;
        } else if (this.position.x < -this.r) {
            this.position.x = width + this.r;
        }
        if (this.position.y > height + this.r) {
            this.position.y = -this.r;
        } else if (this.position.y < -this.r) {
            this.position.y = height + this.r;
        }
    }
    
    this.setRotation = function(a) {
        this.rotation = a;
    }
    
    this.turn = function() {
        this.heading += this.rotation;
    }

    this.addForce = function (force) {
        this.acceleration.add(force);
    }

    this.checkImpact = function(lasers) {
        lasers.forEach(laser => {
            if(dist(this.position.x, this.position.y, laser.position.x, laser.position.y) < this.r) {
                console.log(this.isVounerable);
                if(this.isVounerable === true && this.name != laser.owner) {
                    this.health -= laser.damage; 
                    gameManager.EvaluateStatus(self)
                    self.isVounerable = false
                    setTimeout(this.setVounerability, 500)
                }
            }
        })
    }

    this.setVounerability = function () {
        self.isVounerable = true;
        console.log("set the vounerability to: " + this.isVounerable); 
    }
    
  }
  
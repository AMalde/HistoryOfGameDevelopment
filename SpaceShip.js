function SpaceShip(settings) {
    this.position = settings.position;
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.acceleration = createVector(0, 0);  
    this.maxSpeed = 3;

    this.isBoosting = false;
    
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
      var force = p5.Vector.fromAngle(this.heading);
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
    
  }
  
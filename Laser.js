function Laser(spos, angle, owner) {
    this.position = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);
    this.acceleration = createVector ( 0, 0 ); 
    this.damage = 10; 
    this.owner = owner
    
    this.update = function() {
      this.position.add(this.vel);

      this.vel.add(this.acceleration);
      // position changes by velocity
      this.position.add(this.vel);
      // We must clear acceleration each frame
      this.acceleration.mult(0)
      this.vel.mult(0.99);
    }
    this.render = function() {
      push();
      stroke(240, 0, 0);
        strokeWeight(8); 
      point(this.position.x, this.position.y);
      pop();
    }
    
    this.hits = function(asteroid) {
      var d = dist(this.position.x, this.position.y, asteroid.position.x, asteroid.position.y);
      if (d < asteroid.r) {
        return true;
      } else {
        return false;
      }
    }
    
    this.offscreen = function() {
      if (this.position.x > width || this.position.x < 0) {
        return true;
      }
      if (this.position.y > height || this.position.y < 0) {
        return true;
      }
      return false;
    }

    this.addForce = function (force) {
        this.acceleration = force; 
    }
    
    
  }
class GravityWell {
    constructor (settings) {
        this.massObjects = []; 
        this.forceOfGravity = 0.05; 
        this.position = settings.position; 
        this.radius = settings.radius; 
        this.GravityRadius = settings.gravityRadius;
    }

    addGravity () {
        this.massObjects.forEach(massObject => {
            if(dist(this.position.x, this.position.y, massObject.position.x, massObject.position.y) < this.GravityRadius / 2) {
                let distanceVector = p5.Vector.sub(this.position, massObject.position); 
                let direction = distanceVector.normalize();
                massObject.addForce(direction.mult(this.forceOfGravity));  
            } 
        })
    }

    draw() {
        noStroke();
        fill(2); 
        ellipse (this.position.x, this.position.y, this.radius, this.radius); 
        stroke(100, 0, 0); 
        noFill()
        ellipse (this.position.x, this.position.y, this.GravityRadius, this.GravityRadius);
    }
}
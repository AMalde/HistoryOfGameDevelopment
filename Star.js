class Star  {
    constructor (settings) {
        this.x = settings.position.x
        this.y = settings.position.y
        this.r = settings.radius
        this.alpha = random (40, 200)
    }

    draw() {
        push()
        fill(200, 200, 200, this.alpha);
        ellipse(this.x, this.y, this.r, this.r);
        pop()
    }  
}
class Enemy extends SpaceShip {
    constructor (settings) {
        super()
        this.color = color()
    }
    lookAt(other) {
        let position = other.position
        return this;
    }
}
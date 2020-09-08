class UI {
    constructor (players) {

        this.players = players; 
        this.playerOneScore = 0; 
        this.playerTwoScore = 0; 
    }


    draw() {
        this.drawScore () 
        this.drawHealthBar()
        this.drawFuel()
    }

    drawScore (player) {
        
        textSize(64);
        fill(0, 102, 153);
        text(this.playerOneScore, windowWidth - 200, 100);
        fill(0, 102, 153);
        text("-", windowWidth - 145, 100);
        fill(0, 102, 153);
        text(this.playerTwoScore, windowWidth - 100, 100);
        
    }

    setScore(player) {
        if(player.name === "player1"){
            this.playerOneScore += 1
        }
        if(player.name === "player2") {
            this.playerTwoScore += 1
        }
    }

    drawHealthBar () {
        this.players.forEach(player => {
            fill(240, 240, 240, 100)
            rect(player.position.x - player.maxHealth / 2, player.position.y + 30, player.maxHealth, 5)
            fill(200, 0, 0, 100)
            rect(player.position.x - player.maxHealth / 2, player.position.y + 30, player.health, 5)
        }) 
    }

    drawFuel () {
        this.players.forEach(player => {

            fill(240, 240, 240, 100)
            rect(player.position.x - 50, player.position.y + 40, (player.maxFuel * 100) / player.maxFuel , 5)
            fill(0, 100, 0, 100)
            rect(player.position.x - 50, player.position.y + 40, (player.fuel * 100) / player.maxFuel , 5)
        }) 
    }

    drawAmmo () {
        this.players.forEach(player => {
            textSize(20);
            fill(0, 102, 153);
            text(player.torpedoAmmo, player.position.x - 50, player.position.y + 70);
            
        }) 
    }


}
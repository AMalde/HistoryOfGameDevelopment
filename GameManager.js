class GameManager {
    constructor (UI, players) {
        this.UI = UI; 
        this.players = players
    }

    resetGame() {
        players.forEach(player => {
            player.health = player.maxHealth
            player.fuel = player.maxFuel
            player.position = createVector(player.spawnPosition.x, player.spawnPosition.y); 
            console.log("yoyo")
        })
    }

    EvaluateStatus (player) {
            if (player.health <= 0 ) {
                this.UI.setScore(player)
                this.resetGame()
            }
        
    }
}
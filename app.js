// custom functions
function getRandomValue(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}



const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monstarHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    watch: {
        playerHealth(){
            if(this.playerHealth <= 0 && this.monstarHealth <= 0){
                // draw
                this.winner = 'draw';
            }
            else if(this.playerHealth <= 0){
                // you lost
                this.winner = 'monstar';
            }
        }, 
        monstarHealth(){
            if(this.playerHealth <= 0 && this.monstarHealth <= 0){
                // draw
                this.winner = 'draw';
            }
            if(this.monstarHealth <= 0){
                // you won
                this.winner = 'player';
            }
        }
    },
    computed: {
        monstarHealthStyles(){
            if(this.monstarHealth <= 0){
                return {width: 0 + '%'};
            }
            return {width: this.monstarHealth + '%'};
        },
        playerHealthStyles(){
            if(this.playerHealth <= 0){
                return {width: 0 + '%'};
            }
            return {width: this.playerHealth + '%'};
        },
        specialAttackAvailability(){
            return this.currentRound % 3 !== 0;
        },
        healAvailability(){
            return this.currentRound % 2 !== 0;
        },
    },
    methods: {
        startNewGame(){
            this.playerHealth = 100;
            this.monstarHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = []
        },
        attackMonstar(){
            this.currentRound++;
            const attackValue =  getRandomValue(12, 5);
            this.monstarHealth = this.monstarHealth -= attackValue;
            this.logMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue =  getRandomValue(18, 8);
            this.playerHealth -= attackValue;
            this.logMessage('monstar', 'attack', attackValue);
        },
        specialAttackToMonstar(){
            this.currentRound++;
            const attackValue = getRandomValue(22, 12);
            this.monstarHealth-= attackValue;
            this.logMessage('player', 'special-attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(20, 8);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth+=healValue;
            }
            this.logMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'monstar';
        },
        logMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');
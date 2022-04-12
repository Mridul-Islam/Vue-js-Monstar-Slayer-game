// custom functions
function getRandomValue(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}



const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monstarHealth: 100
        }
    },
    methods: {
        attackMonstar(){
            const attackValue =  getRandomValue(12, 5);
            this.monstarHealth = this.monstarHealth -= attackValue;
            this.attackPlayer();
            console.log(this.monstarHealth);
        },
        attackPlayer(){
            const attackValue =  getRandomValue(15, 8);
            this.playerHealth -= attackValue;
        }
    }
});

app.mount('#game');
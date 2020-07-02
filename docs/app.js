new Vue({
   el: '#app',
    data: {
       playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
       startGame: function(){
           this.gameIsRunning  = true;
           this.playerHealth = 100;
           this.monsterHealth = 100;
           this.turns = [];
       },
        attack: function(){
           let damage = this.calculateDamage(3,10);
           this.monsterHealth  -= damage
           this.logDamage(true,damage);

           if(this.checkWin()){
               return;
           }

         this.monsterAttacks();
        },
        specialAttack: function(){
           let damage = this.calculateDamage(10,20);
           this.monsterHealth -= damage;
           if(this.checkWin()){
               return;
           }
           this.logDamage(true,damage);
           this.monsterAttacks();
        },
        heal : function(){
           if(this.playerHealth <= 90) {
              this.healByTen();
              this.logHeal();

           } else {
               this.healFullHp();
               this.logHeal(100)
           }
            this.monsterAttacks();
        },
        giveUp : function(){
           this.gameIsRunning = false;

        },
        monsterAttacks : function(){
           let damage = this.calculateDamage(5,12);
           this.playerHealth -= damage;
           this.checkWin();
           this.logDamage(false,damage);
        },
        calculateDamage: function(minDamage,maxDamage){
           return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkWin : function(){
            if(this.monsterHealth <= 0) {
                if (confirm("You won! New game?")) {
                    this.startGame();
                }
                 else
                {
                    this.gameIsRunning = false;
                }
                 return true;
            }
            else if(this.playerHealth <= 0){
                if(confirm('You lost! New game?')){
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        logDamage : function(isPlayer = true,damage){
           if(isPlayer) {
               this.turns.unshift({
                   isPlayer: isPlayer,
                   text: 'Player hits Monster for - ' + damage + ' damage'
               })
           } else {
               this.turns.unshift({
                   isPlayer: isPlayer,
                   text: 'Monster hits Player for - ' + damage + ' damage'
               })
           }
        },
        healByTen : function(){
           this.playerHealth += 10;
        },
        healFullHp: function(){
           this.playerHealth = 100;
        },
        logHeal: function(amount = 10){
           if(amount === 10){
                this.turns.unshift({
                    isPlayer : true,
                    text: 'Player healed for +' + amount + ' HP '
                })
           }
           else {
               this.turns.unshift({
                   isPlayer: true,
                   text: 'Player healed up to full HP!'
               })
           }
        }
    }

});
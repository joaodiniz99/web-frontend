var aplicacao = new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
    turn_id: 0,
    notAllowed: false,
    animationToggle: true,
    bkgColorP: "green",
    bkgColorM: "green",
  },
  methods: {
    startGame() {
      this.notAllowed = false;
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.turn_id = 0;
      this.animationToggle = true;
    },
    calculateDamage(max, min) {
      return Math.max(Math.floor(Math.random() * max + 1, min));
    },
    checkWin() {
      // Empate
      if (this.monsterHealth <= 0 && this.playerHealth <= 0) {
        this.notAllowed = true;
        this.playerHealth = 0;
        this.monsterHealth = 0;
        setTimeout(() => {
          alert("Empate 😮");
          this.startGame();
        }, 500);
        return;
      }

      // Verificar se o jogador ganhou
      if (this.monsterHealth <= 0) {
        this.notAllowed = true;
        this.monsterHealth = 0;
        setTimeout(() => {
          alert("Ganhaste! 🥳");
          this.startGame();
        }, 500);
        return;
      }

      // Verificar se o monstro ganhou
      if (this.playerHealth <= 0) {
        this.notAllowed = true;
        this.playerHealth = 0;
        setTimeout(() => {
          alert("Perdeste... 😢");
          this.startGame();
        }, 500);
        return;
      }
    },
    insertTurn(state, msg, dmg) {
      this.turns.unshift({
        id: ++this.turn_id,
        isPlayer: state,
        text: msg + dmg,
      });
    },
    toggleAnimation() {
      this.animationToggle = !this.animationToggle;
    },
    attack() {
      // Jogador
      var playerDamage = this.calculateDamage(10, 3);
      this.monsterHealth -= playerDamage;
      this.insertTurn(true, "Player hits Monster for ", playerDamage);

      // Monstro
      var monsterDamage = this.calculateDamage(12, 5);
      this.playerHealth -= monsterDamage;
      this.insertTurn(false, "Monster hits Player for ", monsterDamage);

      // Verificar quem ganhou
      this.checkWin();
    },
    specialAttack() {
      // Jogador
      var playerDamage = this.calculateDamage(20, 10);
      this.monsterHealth -= playerDamage;
      this.insertTurn(true, "Player hits Monster hard for ", playerDamage);

      // Monstro
      var monsterDamage = this.calculateDamage(12, 5);
      this.playerHealth -= monsterDamage;
      this.insertTurn(false, "Monster hits Player for ", monsterDamage);

      // Verificar quem ganhou
      this.checkWin();
    },
    heal() {
      // Ganhar vida
      this.playerHealth += this.calculateDamage(25, 5);
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }

      // Perder vida
      setTimeout(() => {
        var monsterDamage = this.calculateDamage(10, 3);
        this.playerHealth -= monsterDamage;
        this.insertTurn(false, "Monster hits Player for ", monsterDamage);
      }, 500);

      // Verificar quem ganhou
      this.checkWin();
    },
    giveUp() {
      this.gameIsRunning = false;
    }
  },
  watch: {
    animationToggle() {
      setTimeout(() => {
        this.animationToggle = true;
      }, 0);
    },
    playerHealth() {
      if (this.playerHealth < 25) {
        this.bkgColorP = "red";
      } else if (this.playerHealth < 50) {
        this.bkgColorP = "orange";
      } else {
        this.bkgColorP = "green";
      }
    },
    monsterHealth() {
      if (this.monsterHealth < 25) {
        this.bkgColorM = "red";
      } else if (this.monsterHealth < 50) {
        this.bkgColorM = "orange";
      } else {
        this.bkgColorM = "green";
      }
    }
  }
});
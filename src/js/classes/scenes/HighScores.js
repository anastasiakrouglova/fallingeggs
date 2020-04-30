import {
  getScores
} from './../../functions/scores.js';

export default class HighScores extends Phaser.Scene {
  constructor() {
    super({
      key: 'scores'
    });
  }
  preload() {}
  create() {
    // -------------------------- BACKGROUND INLADEN -------------------------- //
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `background`
    );

    // -------------------------- BACKGROUND INLADEN -------------------------- //
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `highscorebg`
    );



    // -------------------------- OPNIEUW SPELEN -------------------------- //

    this.input.on('pointerdown', pointer => {
      this.scene.start(`game`);
    });

    // -------------------------- INFO PLAY AGAIN -------------------------- //

    this.info = this.add.text(this.sys.game.config.width / 2 - 125, 550, `touch the screen to play again`, {
      fontSize: `15px`,
      fontFamily: `krungthep`,
      fill: `#fbf5da`
    });

    // -------------------------- TOP 10 TITEL -------------------------- //

    this.titel = this.add.text(this.sys.game.config.width / 2 - 100, 165, `TOP 10 PLAYERS`, {
      fontSize: `25px`,
      fontFamily: `krungthep`,
      fill: `#fbf5da`
    });

    // -------------------------- SCORE PUSHEN -------------------------- //

    getScores().then(data => {
      this.createcreateScoreFields(data);
    });

    const $input = document.querySelector(`.overlay`);
    $input.style.visibility = `hidden`;
  }

  // -------------------------- TOP 10 PLAYERS -------------------------- //

  createcreateScoreFields(data) {
    const x = this.sys.game.config.width / 2;
    let y = 230;
    let y2 = 230;
    let y3 = 230;
    let plaats = 1;
    data.forEach(player => {
      this.add
        .text(x - 100, y, `${plaats}`, {
          color: `#982850`
        })
        .setOrigin(0.5, 0.5);
      y += 20;
      plaats += 1;
    });
    data.forEach(player => {
      this.add
        .text(x, y2, `${player.name}`, {
          color: `#982850`
        })
        .setOrigin(0.5, 0.5);
      y2 += 20;
    });
    data.forEach(player => {
      this.add
        .text(x + 100, y3, `${player.score}`, {
          color: `#982850`
        })
        .setOrigin(0.5, 0.5);
      y3 += 20;
    });
  }

  update() {}
}

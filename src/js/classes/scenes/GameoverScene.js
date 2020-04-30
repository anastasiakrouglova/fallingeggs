import {saveScore} from './../../functions/scores.js';
import Game from './GameScene.js';

export default class GameoverScene extends Phaser.Scene {
  constructor() {
    super({
      key: `gameover`
    });
    console.log(`in gameoverscene`);
  }

  preload() {}

  init(data) {
    this.score = data.score;
  }

  create() {
    this.game = new Game();
    //console.log(this.game);

    // -------------------------- BACKGROUND -------------------------- //
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `gameover`
    );

    // -------------------------- KNOP TEKST -------------------------- //
    this.scoreknop = this.add.text(275, 474, `GO TO SCOREBOARD`, {
      fontSize: `25px`,
      fontFamily: `krungthep`,
      fill: `#c98d6b`,
      align: `center`
    });

    this.scoreknop.once(
      'pointerup',
      function() {
        this.scene.start('scores');
        const klikMusic = this.sound.add('klik');
        klikMusic.play();
      },
      this
    );

    this.scoreknop.setInteractive();

    // -------------------------- OPSLAAN NAAM SPELER -------------------------- //
    this.input.on('pointerdown', pointer => {
      const $name = document.querySelector(`.overlay__nameinput`).value;
      console.log($name);
      console.log(`SCORE IN GAMEOVER  ${this.score}`);

      saveScore($name, this.score).then(data => {
        if (data.result === `ok`) {
          const $input = document.querySelector(`.overlay`);
          console.log($name);
          console.log(this.score);
          $input.style.visibility = `hidden`;
          this.scene.start('scores');
          console.log('Score is goed doorgestuurd');
        } else {
          console.log('Score is NIET goed doorgestuurd');
        }
      });
    });

    // this.playField.setInteractive();
    this.createScoreSubmit();
  }

  // -------------------------- NAAM SPELER INVULLEN -------------------------- //
  createScoreSubmit() {
    const $input = document.querySelector(`.overlay`);
    $input.style.visibility = `visible`;
    $input.querySelector(`.overlay__nameinput`).value = ``;
    $input.querySelector(`.overlay__nameinput`).focus();
  }

  update() {}
}

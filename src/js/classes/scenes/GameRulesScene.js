export default class GameRulesScene extends Phaser.Scene {
  constructor() {
    super({
      key: `uitleg`
    });
  }

  create() {
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `background`
    );

    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `rules`
    );

    this.start = this.add.image(
      this.sys.game.config.width / 2,
      550,
      `startbutton`
    );

    this.start.setInteractive();
    this.start.once(
      'pointerup',
      function () {
        this.scene.start('game');
        const klikMusic = this.sound.add('klik');
        klikMusic.play();
      },
      this
    );
  }
}

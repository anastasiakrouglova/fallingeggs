import Egg from '../gameObjects/Egg.js';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });
  }

  create() {
    // -------------------------- CREATE ACHTERGROND / BERGEN / WOLKEN  -------------------------- //

    // achtergrond
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `startbg`
    );

    // wolken
    this.wolk = this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `wolk1`
    );
    this.wolk.timeVal = 0;

    this.wolk2 = this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 200,
      `wolk2`
    );
    this.wolk2.timeVal = 0;

    this.wolk3 = this.add.image(
      this.sys.game.config.width / 2 + 200,
      this.sys.game.config.height / 2 - 120,
      `wolk3`
    );
    this.wolk3.timeVal = 0;

    // bergen
    this.add.image(
      this.sys.game.config.width / 2 + 100,
      this.sys.game.config.height / 2 + 170,
      `startbergen`
    );
    // -------------------------- EITJES VALLEN  -------------------------- //

    const timedEventNormalegg = this.time.addEvent({
      delay: 4000,
      callback: this.createEggs,
      callbackScope: this,
      loop: true
    });

    // -------------------------- TITEL SPEL  -------------------------- //
    this.titel = this.add.text(250, 117, `FALLING EGGS`, {
      fontSize: `35px`,
      fontFamily: `krungthep`,
      fill: `#fff`
    });

    // -------------------------- KNOP START GAME  -------------------------- //

    this.start = this.add.image(
      this.sys.game.config.width / 2 - 150,
      this.sys.game.config.height / 2,
      `startbutton`
    );

    this.start.setInteractive();
    this.start.once(
      'pointerup',
      function() {
        this.scene.start('game');
        const klikMusic = this.sound.add('klik');
        klikMusic.play();
      },
      this
    );

    // -------------------------- KNOP DISCOVER RULES  -------------------------- //

    this.rules = this.add.image(
      this.sys.game.config.width / 2 + 110,
      this.sys.game.config.height / 2,
      `rulesbutton`
    );

    this.rules.setInteractive();
    this.rules.once(
      'pointerup',
      function() {
        this.scene.start('uitleg');
        klikMusic.play();
      },
      this
    );

    //aan en uit knop geluid

    const geluid = this.add.image(
      this.sys.game.config.width - 85,
      this.sys.game.config.height - 80,
      `geluidsknop`
    );

    geluid.setInteractive();
    geluid.on('pointerup', function() {
      music.pause();
      klikMusic.pause();
      geluid.alpha = 0;
      console.log(uit);
      uit.alpha = 1;
    });
    const uit = this.add.image(
      this.sys.game.config.width - 85,
      this.sys.game.config.height - 80,
      `uitknop`
    );
    uit.alpha = 0;

    uit.setInteractive();
    uit.on('pointerup', function() {
      uit.alpha = 0;
      music.resume();
      klikMusic.resume();
      geluid.alpha = 1;
    });

    //muziek bij klikken knop
    const klikMusic = this.sound.add('klik');

    // algemene background music
    const music = this.sound.add('theme');
    music.play();

    this.createPlatforms();
  }

  // -------------------------- RANDOM EITJES LATEN VALLEN -------------------------- //
  createEggs() {
    // Random x position per egg
    this.eggs = new Egg(this, Math.random() * 600, 0);
    this.physics.add.collider(
      this.eggs,
      this.platforms,
      parameter => {
        this.eiverwijderen(parameter);
      },
      null,
      this
    );
  }

  eiverwijderen(groundSprite) {
    if (groundSprite) {
      groundSprite.destroy();
    }
  }
  // grond waar eitjes verdwijnen
  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(400, 622, `ground`)
      .setScale(2)
      .refreshBody();
  }

  update() {
    // -------------------------- WOLKEN LATEN BEWEGEN -------------------------- //

    // wolk van links naar rechts laten bewegen
    this.wolk.x = 100 + Math.sin(this.wolk.timeVal) * 100;
    this.wolk.timeVal += 0.01;

    this.wolk2.x = 400 + Math.sin(this.wolk2.timeVal) * 200;
    this.wolk2.timeVal -= 0.008;

    this.wolk3.x = 600 + Math.sin(this.wolk3.timeVal) * 100;
    this.wolk3.timeVal -= 0.008;
  }
}

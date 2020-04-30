import Player from '../gameObjects/Player';
import Egg from '../gameObjects/Egg.js';
import GreenEgg from '../gameObjects/GreenEgg.js';
import RedEgg from '../gameObjects/RedEgg.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }
  init() {
    this.gameOver = false;
  }
  preload() {}

  create() {
    // Background image
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `background`
    );

    // Timing events for eggs
    const timedEventNormalegg = this.time.addEvent({
      delay: 2000,
      callback: this.createEggs,
      callbackScope: this,
      loop: true
    });
    const timedEventGreenegg = this.time.addEvent({
      delay: 7500,
      callback: this.createGreenEggs,
      callbackScope: this,
      loop: true
    });
    const timedEventRedegg = this.time.addEvent({
      delay: 5500,
      callback: this.createRedEggs,
      callbackScope: this,
      loop: true
    });

    // Initialization
    this.createControls();
    this.createPlayer();
    this.createScore();
    this.createLives();
    this.createPlatforms();
    this.createHeart(this.life);
    this.createLevel();

    //aan en uit knop geluid

    const geluid = this.add.image(
      this.sys.game.config.width - 85,
      this.sys.game.config.height - 80,
      `geluidsknop`
    );

    const music = this.sound.add('theme');
    music.play();

    geluid.setInteractive();
    geluid.on('pointerup', function() {
      music.pause();
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
      geluid.alpha = 1;
    });
  }

  // -------------------------- GROUND -------------------------- //

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(400, 622, `ground`)
      .setScale(2)
      .refreshBody();
  }

  // -------------------------- CREATE EGGS -------------------------- //

  createEggs() {
    // Random x position per egg
    this.eggs = new Egg(this, Math.random() * 600, 0);
    this.physics.add.overlap(
      this.player,
      this.eggs,
      this.collectEggs,
      null,
      this
    );
    this.physics.add.collider(
      this.eggs,
      this.platforms,
      parameter => {
        this.looseLives(parameter);
        const eiMusic = this.sound.add('ei');
        eiMusic.play();
      },
      null,
      this
    );
  }

  createGreenEggs() {
    // Random start x position per egg
    this.greenEggs = new GreenEgg(this, Math.random() * 600, 0);
    this.physics.add.overlap(
      this.player,
      this.greenEggs,
      this.collectGreenEggs,
      null,
      this
    );
    this.physics.add.collider(
      this.greenEggs,
      this.platforms,
      parameter => {
        this.looseLives(parameter);
        const eiMusic = this.sound.add('ei');
        eiMusic.play();
      },
      null,
      this
    );
  }

  createRedEggs() {
    this.redEggs = new RedEgg(this, Math.random() * 600, 0);
    this.physics.add.overlap(
      this.player,
      this.redEggs,
      this.hitRedEgg,
      null,
      this
    );
    this.physics.add.collider(
      this.redEggs,
      this.platforms,
      parameter => {
        this.redEggs.destroy();
        //console.log('ground hit');
      },
      null,
      this
    );
  }

  // -------------------------- HIT EGGS -------------------------- //

  collectEggs(playerSprite, eggSprite) {
    eggSprite.killed = true;
    eggSprite.disableBody(true, true);
    eggSprite.destroy();
    this.score += 1;
    this.scoreLevel += 1;

    this.scoreTextField.setText(`Score: ${this.score}`);
    this.levelHigher();
    const eiMusic = this.sound.add('ei');
    eiMusic.play();
  }

  collectGreenEggs(playerSprite, eggSprite) {
    eggSprite.disableBody(true, true);
    this.score += 2;
    this.scoreLevel += 2;
    this.scoreTextField.setText(`Score: ${this.score}`);
    this.levelHigher();
    const eiMusic = this.sound.add('ei');
    eiMusic.play();
  }

  hitRedEgg() {
    console.log(this.score);
    this.scene.start('gameover', {
      score: this.score
    });
    const errorMusic = this.sound.add('error');
    errorMusic.play();
  }

  // -------------------------- SCORE -------------------------- //

  createScore() {
    this.scoreTextField = this.add.text(650, 16, `Score: 0`, {
      fontSize: `30px`,
      fontFamily: `krungthep`,
      fill: `#fff`
    });
    this.score = 0;
  }

  // -------------------------- LEVEL -------------------------- //

  createLevel() {
    this.levelTextField = this.add.text(20, 16, `Level: 1`, {
      fontSize: `30px`,
      fontFamily: `krungthep`,
      fill: `#FFF`
    });
    this.level = 1;
  }

  levelHigher() {
    this.prevLevel = this.level;
    this.level = 1 + Math.floor(this.score / 10);
    if (this.prevLevel < this.level) {
      const timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.createEggs,
        callbackScope: this,
        loop: true
      });

      const levelMusic = this.sound.add('levelUp');
      levelMusic.play();
    }
    this.levelTextField.setText(`Level: ${this.level}`);
  }

  // -------------------------- LIVES -------------------------- //

  createLives() {
    this.life = 3;
  }

  looseLives(groundSprite) {
    if (groundSprite) {
      this.life -= 1;
      this.createHeart(this.life);
      groundSprite.destroy();
      const errorMusic = this.sound.add('error');
      errorMusic.play();
    }
    if (this.life === 0) {
      this.scene.start('gameover', {
        score: this.score
      });
    }
  }

  createHeart(levens) {
    this.heartalive = this.add.group({
      key: `heartalive`,
      repeat: levens - 1,
      setXY: {
        x: 755,
        y: 80,
        stepX: - 45
      }
    });

    if (levens < 3) {
      this.heartdead = this.add.group({
        key: `heartdead`,
        repeat: Math.abs(2 - levens),
        setXY: {
          x: 755,
          y: 80,
          stepX: - 45
        }
      });
    }
  }

  // -------------------------- PLAYER / CHICKEN -------------------------- //

  createPlayer() {
    this.player = new Player(this, 380, 500, `kip`);
    this.physics.add.overlap(this.player);
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // -------------------------- UPDATE OF THE CHICKEN -------------------------- //

  update() {
    if (!this.gameOver) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(- 250);
        this.player.anims.play(`left`, true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(250);
        this.player.anims.play(`right`, true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play(`turn`);
      }
    }
  }
}

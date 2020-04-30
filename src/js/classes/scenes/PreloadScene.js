import './../../../assets/background.jpg';
import './../../../assets/kip.png';
import './../../../assets/orange_egg.png';
import './../../../assets/aliveheart.png';
import './../../../assets/deadheart.png';
import './../../../assets/ground.png';
import './../../../assets/green_egg.png';
import './../../../assets/roodei.png';
import './../../../assets/beginscherm.jpg';
import './../../../assets/gameover.jpg';
import './../../../assets/highscore.png';
import './../../../assets/uitlegscherm.jpg';
import './../../../assets/wolkje.png';
import './../../../assets/wolkje2.png';
import './../../../assets/wolkje3.png';
import './../../../assets/backgroundorange.jpg';
import './../../../assets/bergen.png';
import './../../../assets/start-button.png';
import './../../../assets/rules-button.png';
import './../../../assets/rules.png';
import './../../../assets/geluidsknop.png';
import './../../../assets/uitknop.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }
  preload() {
    this.preloader = this.add.graphics();
    this.load.on(`progress`, this.onProgress, this);
    this.load.on(`complete`, this.onComplete, this);
    this.load.image(`egg`, `./assets/orange_egg.png`);
    this.load.image(`greenegg`, `./assets/green_egg.png`);
    this.load.image(`redegg`, `./assets/roodei.png`);
    this.load.image(`background`, `./assets/background.jpg`);
    this.load.image(`heartalive`, `./assets/aliveheart.png`);
    this.load.image(`heartdead`, `./assets/deadheart.png`);
    this.load.image(`ground`, `./assets/ground.png`);
    this.load.image(`highscorebg`, `./assets/highscore.png`);
    this.load.image(`wolk1`, `./assets/wolkje.png`);
    this.load.image(`wolk2`, `./assets/wolkje2.png`);
    this.load.image(`wolk3`, `./assets/wolkje3.png`);
    this.load.image(`startbg`, `./assets/backgroundorange.jpg`);
    this.load.image(`startbergen`, `./assets/bergen.png`);
    this.load.image(`startbutton`, `./assets/start-button.png`);
    this.load.image(`rulesbutton`, `./assets/rules-button.png`);
    this.load.image(`rules`, `./assets/rules.png`);
    this.load.image(`geluidsknop`, `./assets/geluidsknop.png`);
    this.load.image(`uitknop`, `./assets/uitknop.png`);

    this.load.spritesheet(`kip`, `./assets/kip.png`, {
      frameWidth: 139,
      frameHeight: 149
    });
    this.load.image(`beginscherm`, `./assets/beginscherm.jpg`);
    this.load.image(`gameover`, `./assets/gameover.jpg`);
    this.load.image(`uitlegscherm`, `./assets/uitlegscherm.jpg`);

    this.load.audio('theme', [
      'assets/audio/background.ogg',
      'assets/audio/background.mp3'
    ]);
    this.load.audio('klik', ['assets/audio/klik.ogg', 'assets/audio/klik.mp3']);
    this.load.audio('error', [
      'assets/audio/error.ogg',
      'assets/audio/error.mp3'
    ]);
    this.load.audio('ei', ['assets/audio/ei.ogg', 'assets/audio/ei.mp3']);
    this.load.audio('levelUp', [
      'assets/audio/level-up.ogg',
      'assets/audio/level-up.mp3'
    ]);
  }

  onProgress(value) {
    console.log(`Loading: ${Math.round(value * 100)}%`);
    this.preloader.clear();
    this.preloader.fillStyle(0xff0000, 1);
    //this.preloader.fillRect(0, this.game.config.height / 2, this.game.config.width * value, 5);
  }

  onComplete() {
    this.preloader.destroy();
    this.scene.start(`start`);
  }

  create() {}
  update() {}
}

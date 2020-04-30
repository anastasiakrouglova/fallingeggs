import PreloadScene from './scenes/PreloadScene.js';
import StartScene from './scenes/StartScene.js';
import GameoverScene from './scenes/GameoverScene.js';
//import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
import HighScores from './scenes/HighScores.js';
import GameRulesScene from './scenes/GameRulesScene.js';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      title: `My Super cool Platform Game`,
      scene: [
        PreloadScene,
        StartScene,
        GameRulesScene,
        GameScene,
        GameoverScene,
        HighScores
      ],
      audio: {
        disableWebAudio: true
      },
      url: `http://www.devine.be`,
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          gravity: {
            y: 300
          },
          debug: false
        }
      }
    });
  }
}

export default Game;

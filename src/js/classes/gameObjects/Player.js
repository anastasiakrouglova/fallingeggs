export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, `kip`);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(1.5);
    this.setCollideWorldBounds(true);
    this.createAnimations();
  }
  createAnimations() {
    this.scene.anims.create({
      key: `turn`,
      frames: [{key: `kip`, frames: 6}],
      frameRate: 300
    });
    this.scene.anims.create({
      key: `left`,
      frames: this.scene.anims.generateFrameNumbers(`kip`, {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: - 1
    });
    this.scene.anims.create({
      key: `right`,
      frames: this.scene.anims.generateFrameNumbers(`kip`, {
        start: 7,
        end: 12
      }),
      frameRate: 10,
      repeat: - 1
    });
  }
}

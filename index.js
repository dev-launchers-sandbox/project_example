import Phaser from "phaser";
import Player from "./classes/Player.js";
import Enemy from "./classes/Enemy.js";
import Vehicle from "./classes/Vehicle.js";
import Powerup from "./classes/Powerup.js";

class PlayScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet("johnny", "./assets/johnny_sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("cake", "./assets/cake.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("ghost", "./assets/ghost.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet("baker", "./assets/baker.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });

    this.load.image("power", "./assets/powerup.png");
  }

  create() {
    this.johnny = new Player(this, 40, 5);
    this.enemy = new Enemy(this, 10, 0);
    this.vehicle = new Vehicle(this, 80, 5);
    this.powerup = new Powerup(this, 100, 5);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    this.platforms = [
      this.addPhysicalRectangle(150, 100, 500, 10, 0xaa0000),
      this.addPhysicalRectangle(350, 200, 500, 10, 0xaa0000),
      this.addPhysicalRectangle(250, 300, 500, 10, 0xaa0000)
    ];

    //Player collisions
    this.physics.add.collider(this.johnny, this.platforms);
    //powerup collisions
    this.physics.add.collider(this.powerup, this.platforms);
    //vehicle collisions
    this.physics.add.collider(this.vehicle, this.platforms);
    //player and vehicle collisions
    this.physics.add.collider(this.johnny, this.vehicle);
    //enemy collisions
    this.physics.add.collider(this.enemy, this.platforms);
    //enemy and vehicle collision
    this.physics.add.collider(
      this.enemy,
      this.vehicle,
      this.enemyAndVehicleCallback
    );
    //player and powerup collisions
    //this.phyiscs.add.collider(this.johnny, this.powerup);
    //player and powerup collisions
    /*this.physics.add.collider(
      this.player,
      this.powerup,
      this.playerAndPowerupCallBack
    );
    */

    this.enemy.body.setAllowGravity(false);
  }
  enemyAndVehicleCallback(enemy, vehicle) {
    vehicle.takeAwayHealth();
  }
  playerAndPowerupCallBack(player, powerup) {
    this.enemy.moveAway(this.scene.player.x, this.scene.player.y);
  }

  update(time, delta) {
    this.johnny.update(time, delta);
    this.enemy.update(time, delta);
  }

  /* <Begin> helper functions added by Kris */
  //
  //

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 300,
  parent: "game-container",
  pixelArt: true,
  zoom: 1,
  backgroundColor: "#000000",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 }
    }
  }
};

const game = new Phaser.Game(config);
let controls;

import { Sprite, Assets, Container, Texture } from "pixi.js";
import { app } from "../app";
import { TILE } from "../constants/config";
import throttle from '../helper/throttle';
import IC from "./InstanceContainer";
import levelRecord from "./LevelRecord";

enum Display {
  Heart = 'heart',
  Empty = 'empty',
};

class HealthBar {
  heart: number = 3;
  container: Container = new Container();
  display: Display[] = [];
  heartTexture!: Texture;
  emptyTexture!: Texture;

  constructor() {
    this.updateHeart = throttle(this.updateHeart.bind(this), 500);
  }

  async init() {
    this.container.position.set(TILE.SIZE * 1.5);

    this.heartTexture = await Assets.load('/assets/healthbar/heart.png');
    this.emptyTexture = await Assets.load('/assets/healthbar/heart_empty.png');

    this.display = [Display.Heart, Display.Heart, Display.Heart];

    app.stage.addChild(this.container);

    this.renderHeart();
  }

  renderHeart() {
    this.container.removeChildren();
    this.display.forEach((display, index) => {
      const item = display === Display.Heart ? this.heartTexture : this.emptyTexture;

      const sprite = new Sprite(item);

      sprite.position.set(index * 24, 0);
      this.container.addChild(sprite);
    });
  }

  updateHeart() {
    this.heart -= 1;

    switch (this.heart) {
      case 2:
        this.display = [Display.Heart, Display.Heart, Display.Empty];
        break;
      case 1:
        this.display = [Display.Heart, Display.Empty, Display.Empty];
        break;
      case 0:
        this.display = [Display.Empty, Display.Empty, Display.Empty];
        IC.get('gameover').init();
        break;
    }

    this.renderHeart();
  }

  async destroy() {
    await Assets.unload('/assets/healthbar/heart.png');
    await Assets.unload('/assets/healthbar/heart_empty.png');
    this.container.destroy({
      children: true,
      texture: true,
      textureSource: true,
      context: true
    });
  }
}

export default HealthBar;
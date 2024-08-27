import { Assets, Texture, AnimatedSprite } from "pixi.js";
import { FRAME } from "../components/Fruit";
import { app } from "../app";
import { Z_INDEX } from "../constants/config";

class Loader {
  bubbles!: AnimatedSprite[];

  async init() {
    await Assets.load(`/assets/fruits/collected.json`);

    const textureArray = [];

    for (let i = 1; i <= FRAME.BUBBLE; i++) {
      textureArray.push(Texture.from(`collected_${i}.png`));
    }

    this.bubbles = [
      new AnimatedSprite(textureArray),
      new AnimatedSprite(textureArray),
      new AnimatedSprite(textureArray)
    ];

    this.bubbles.forEach((item, index) => {
      item.animationSpeed = 0.2;
      item.anchor.set(0.5, 0.5);
      item.scale.set(0.7);
      item.position.set(275 + index * 32, 210);
      item.zIndex = Z_INDEX.MASK;
      setTimeout(() => {
        item.play();
      }, 100 * index);
      app.stage.addChild(item);
    });
  }

  destroy() {
    this.bubbles.forEach((item) => {
      item.destroy();
    });
  }
}

export default Loader;
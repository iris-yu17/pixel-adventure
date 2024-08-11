import FRUIT from "../types/fruit";
import { Assets, Texture, AnimatedSprite, Container } from "pixi.js";
import { app } from "../app";

const FRAME = {
  FRUIT: 17,
  BUBBLE: 6,
};

export type FruitType = {
  name: FRUIT;
  x: number;
  y: number;
};

class Fruit {
  name: string = FRUIT.Apple;
  fruit!: AnimatedSprite;
  bubble!: AnimatedSprite;
  container: Container = new Container();
  x: number;
  y: number;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  async init() {
    await Assets.load(`/assets/fruits/${this.name}.json`);
    await Assets.load(`/assets/fruits/collected.json`);

    this.createFruit();
    this.createBubble();

    // create container
    this.container = new Container();
    this.container.position.set(this.x, this.y);
    this.container.addChild(this.fruit);
    app.stage.addChild(this.container);
  }

  createFruit() {
    const textureArray = [];

    for (let i = 1; i <= FRAME.FRUIT; i++) {
      textureArray.push(Texture.from(`${this.name}_${i}.png`));
    }

    this.fruit = new AnimatedSprite(textureArray);
    this.fruit.animationSpeed = 0.35;
    this.fruit.anchor.set(0.5, 0.5);
    this.fruit.play();

    this.container.addChild(this.fruit);
  }

  createBubble() {
    const textureArray = [];

    for (let i = 1; i <= FRAME.BUBBLE; i++) {
      textureArray.push(Texture.from(`collected_${i}.png`));
    }

    this.bubble = new AnimatedSprite(textureArray);
    this.bubble.animationSpeed = 0.35;
    this.bubble.anchor.set(0.5, 0.5);
  }

  collected() {
    this.container.removeChild(this.fruit);
    this.container.addChild(this.bubble);
    this.bubble.play();
    this.bubble.loop = false;
  }
}

export default Fruit;
import { AnimatedSprite, Assets, Sprite, Texture } from "pixi.js";
import { app } from "../app";
import { Z_INDEX } from "../constants/config";

class CheckPoint {
  finish: boolean = false;
  destination!: AnimatedSprite;
  constructor() {
  }

  async init() {
    // 終點
    await Assets.load('/assets/checkpoint/flag.json');
    const textureArray = [];
    for (let i = 1; i <= 10; i++) {
      textureArray.push(Texture.from(`flag_${i}.png`));
    }
    this.destination = new AnimatedSprite(textureArray);
    this.destination.position.set(120, 288);
    this.destination.anchor.set(0.5);
    this.destination.zIndex = Z_INDEX.CHECKPOINT;
    this.destination.animationSpeed = 0.35;


    // 起點
    const startTexture = await Assets.load('/assets/checkpoint/start.png');
    const startSprite = new Sprite(startTexture);
    startSprite.position.set(20, 288);
    startSprite.zIndex = Z_INDEX.CHECKPOINT;

    app.stage.addChild(startSprite);
  }

  showFlag() {
    this.destination.play();
    app.stage.addChild(this.destination);
  }
}

export default CheckPoint;
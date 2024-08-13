import { AnimatedSprite, Assets, Sprite, Texture, Ticker } from "pixi.js";
import { app } from "../app";
import { CHECKPOINT, Z_INDEX } from "../constants/config";

class CheckPoint {
  finish: boolean = false;
  destination!: AnimatedSprite;
  destinationPosition: { x: number; y: number; };

  constructor(destination: { x: number; y: number; }) {
    this.destinationPosition = destination;
  }

  async init() {
    // 終點
    await Assets.load('/assets/checkpoint/flag.json');
    const textureArray = [];
    for (let i = 1; i <= 8; i++) {
      textureArray.push(Texture.from(`flag_${i}.png`));
    }
    this.destination = new AnimatedSprite(textureArray);
    this.destination.position.set(this.destinationPosition.x, 0);
    this.destination.anchor.set(0.5);
    this.destination.scale.x = -1;
    this.destination.zIndex = Z_INDEX.CHECKPOINT;
    this.destination.animationSpeed = 0.35;

    // 起點
    const startTexture = await Assets.load('/assets/checkpoint/start.png');
    const startSprite = new Sprite(startTexture);
    startSprite.position.set(CHECKPOINT.INITIAL_X, CHECKPOINT.INITIAL_Y);
    startSprite.zIndex = Z_INDEX.CHECKPOINT;

    app.stage.addChild(startSprite);
  }

  showFlag() {
    app.stage.addChild(this.destination);
    this.destination.play();
    this.flagDrop();
  }

  flagDrop() {
    const ticker = new Ticker();
    ticker.add(({ deltaTime }) => {
      if (this.destination.position.y >= this.destinationPosition.y) {
        ticker.stop();
        return;
      };
      this.destination.position.y += 1 * deltaTime;
    });
    ticker.speed = 2;
    ticker.start();
  }
}

export default CheckPoint;
import { Assets, Ticker, TilingSprite } from "pixi.js";
import { SCREEN } from "../constants/config";
import { app } from "../app";


class Background {
  color: string = 'Gray';
  tilingSprite!: TilingSprite;

  constructor(color: string) {
    this.color = color;
  }

  async init() {
    const bgTexture = await Assets.load(`/assets/background/${this.color}.png`);

    this.tilingSprite = new TilingSprite(
      {
        texture: bgTexture,
        width: SCREEN.WIDTH,
        height: SCREEN.HEIGHT
      }
    );

    app.stage.addChild(this.tilingSprite);

    this.animate();
  }

  animate() {
    const ticker = new Ticker();
    ticker.add(({ deltaTime }) => {
      this.tilingSprite.tilePosition.y += 0.5 * deltaTime;
    });

    ticker.start();
  }
}

export default Background;
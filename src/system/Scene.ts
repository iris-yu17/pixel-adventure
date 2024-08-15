import { Assets, Container, Graphics, Sprite, Texture, Rectangle, TextureSource, Ticker } from "pixi.js";
import { app } from "../app";
import { SCREEN, TEXT, Z_INDEX } from "../constants/config";
import textTable from "../constants/text";
import ALPHABET from "../types/alphabet";

class Scene {
  container: Container;
  textBaseTexture!: TextureSource;
  textContainer: Container = new Container();

  constructor() {
    this.container = new Container();
  }

  async init() {
    this.container.zIndex = Z_INDEX.MASK;

    this.textBaseTexture = await Assets.load('/assets/menu/text/text-white.png');
    app.stage.addChild(this.container);

    this.createMask();

    this.textContainer.alpha = 0;
  }

  createMask() {
    const graphics = new Graphics().rect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT).fill('#000');
    graphics.alpha = 0;

    return graphics;
  }

  prepareTextSprite(alphabetArr: ALPHABET[]) {
    const textArr: Sprite[] = [];
    alphabetArr.forEach((alphabet, index) => {
      const rect = new Rectangle(textTable[alphabet][0] * TEXT.WIDTH, textTable[alphabet][1] * TEXT.HEIGHT, TEXT.WIDTH, TEXT.HEIGHT);
      const texture = new Texture({
        source: this.textBaseTexture,
        frame: rect
      });
      const alphabetSprite = new Sprite(texture);
      alphabetSprite.position.set(TEXT.WIDTH * index, 0);

      textArr.push(alphabetSprite);
    });

    return textArr;
  }

  createText(alphabetArr: ALPHABET[], position?: { x?: number, y?: number; }) {
    const textSpriteArr = this.prepareTextSprite(alphabetArr);

    const text = new Container();
    textSpriteArr.forEach((alphabet) => {
      text.addChild(alphabet);
    });
    text.scale.set(2);
    text.zIndex = Z_INDEX.MASK;

    // 預設置中
    const _x = position?.x || SCREEN.WIDTH / 2 - text.width / 2;
    const _y = position?.y || SCREEN.HEIGHT / 2 - text.height / 2;
    text.position.set(_x, _y);

    this.textContainer.addChild(text);
  }

  animate() {
    const mask = this.createMask();
    const ticker = new Ticker();
    this.container.addChild(mask);
    this.container.addChild(this.textContainer);

    ticker.add(({ deltaTime }) => {
      if (mask.alpha >= 0.7 && this.textContainer.alpha >= 1) {
        ticker.destroy();
        return;
      }
      if (mask.alpha < 1) mask.alpha += 0.01 * deltaTime;
      if (this.textContainer.alpha < 1) this.textContainer.alpha += 0.01 * deltaTime;

    });
    ticker.start();
  }

  async destroy() {
    await Assets.unload('/assets/menu/text/text-white.png');
    this.container.destroy({
      children: true,
      texture: true,
      textureSource: true,
      context: true
    });
  }
}

export default Scene;
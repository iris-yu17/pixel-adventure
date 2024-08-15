import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";

class Gameover extends Scene {
  constructor() {
    super();
  }

  async init() {
    await super.init();

    this.createText([
      ALPHABET.G,
      ALPHABET.A,
      ALPHABET.M,
      ALPHABET.E,
      ALPHABET.SPACE,
      ALPHABET.O,
      ALPHABET.V,
      ALPHABET.E,
      ALPHABET.R
    ]);

    this.animate();
    this.createRestartBtn();
  }

  createRestartBtn() {
    this.createText(
      [
        ALPHABET.R,
        ALPHABET.E,
        ALPHABET.S,
        ALPHABET.T,
        ALPHABET.A,
        ALPHABET.R,
        ALPHABET.T,
      ],
      {
        y: 200
      }
    );
    const btn = this.textContainer.children[1];
    btn.interactive = true;
    btn.cursor = 'pointer';
    btn.on('pointerdown', () => {
      this.destroy();

      // IC.get('level1').init();
    });
  }
}

export default Gameover;
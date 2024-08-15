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
  }
}

export default Gameover;
import IC from "../components/InstanceContainer";
import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";

class Level1Cutscene extends Scene {
  constructor() {
    super();
  }

  async init() {
    await super.init();

    this.createText([
      ALPHABET.L,
      ALPHABET.E,
      ALPHABET.V,
      ALPHABET.E,
      ALPHABET.L,
      ALPHABET.SPACE,
      ALPHABET.O,
      ALPHABET.N,
      ALPHABET.E,
    ]);

    this.animate();

    setTimeout(async () => {
      IC.get('level1').init();
      await super.fadeOut();
    }, 2000);
  }
}

export default Level1Cutscene;
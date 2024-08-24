import IC from "../components/InstanceContainer";
import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";
import IcEnum from "../types/instanceContainer";

class Level3Cutscene extends Scene {
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
      ALPHABET.T,
      ALPHABET.H,
      ALPHABET.R,
      ALPHABET.E,
      ALPHABET.E,
    ]);

    this.animate();

    setTimeout(async () => {
      IC.get(IcEnum.Level3).init();
      await super.fadeOut();
    }, 2000);
  }
}

export default Level3Cutscene;
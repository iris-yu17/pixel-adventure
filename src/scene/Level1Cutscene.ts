import IC from "../components/InstanceContainer";
import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";
import IcEnum from "../types/instanceContainer";
import Loader from "../system/Loader";

const loader = new Loader();

class Level1Cutscene extends Scene {
  constructor() {
    super();
  }

  async init() {
    await super.init();
    await loader.init();

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
      await IC.get(IcEnum.Level1).init();
      await super.fadeOut();
      loader.destroy();

      const newCutscene = new Level1Cutscene();
      IC.register(IcEnum.Level1Cutscene, newCutscene);
    }, 2000);
  }
}

export default Level1Cutscene;
import IC from "../components/InstanceContainer";
import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";
import IcEnum from "../types/instanceContainer";
import Loader from "../system/Loader";

const loader = new Loader();

class WinCutscene extends Scene {
  constructor() {
    super();
  }

  async init() {
    await super.init();
    await loader.init();

    this.createText([
      ALPHABET.C,
      ALPHABET.O,
      ALPHABET.N,
      ALPHABET.G,
      ALPHABET.R,
      ALPHABET.A,
      ALPHABET.T,
      ALPHABET.S,
    ]);

    this.animate();

    setTimeout(async () => {
      await IC.get(IcEnum.Win).init();
      await super.fadeOut();
      loader.destroy();

      const newCutscene = new WinCutscene();
      IC.register(IcEnum.WinCutscene, newCutscene);
    }, 2000);
  }
}

export default WinCutscene;
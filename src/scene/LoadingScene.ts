import IC from "../components/InstanceContainer";
import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";
import IcEnum from "../types/instanceContainer";
import Loader from "../system/Loader";

const loader = new Loader();

class LoadingScene extends Scene {
  constructor() {
    super();
  }

  async init() {
    await super.init();
    await loader.init();

    this.createText([
      ALPHABET.L,
      ALPHABET.O,
      ALPHABET.A,
      ALPHABET.D,
      ALPHABET.I,
      ALPHABET.N,
      ALPHABET.G,
    ]);

    this.animate();

    setTimeout(async () => {
      await IC.get(IcEnum.Opening).init();
      await super.fadeOut();
      loader.destroy();

      const newScene = new LoadingScene();
      IC.register(IcEnum.LoadingScene, newScene);
    }, 2000);
  }
}

export default LoadingScene;
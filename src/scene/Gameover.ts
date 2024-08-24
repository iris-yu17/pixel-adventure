import IC from "../components/InstanceContainer";
import levelRecord from "../components/LevelRecord";
import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";
import IcEnum from "../types/instanceContainer";

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
    btn.on('pointerdown', async () => {
      // destroy gameover scene
      await this.destroy();

      // destroy current level
      const currentLevel = levelRecord.getLevel;
      await IC.get(`level${currentLevel}` as IcEnum).destroy();

      // new gameover scene
      const newGameover = new Gameover();
      IC.register(IcEnum.Gameover, newGameover);

      // this level init
      IC.get(`level${currentLevel}` as IcEnum).init();
    });
  }
}

export default Gameover;
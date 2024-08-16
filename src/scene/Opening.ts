import { Assets, Sprite } from "pixi.js";
import Background from "../components/Background";
import Fruits from "../components/Fruits";
import Terrain from "../components/Terrain";
import { fruits_opening } from "../constants/fruit";
import { map_opening } from "../constants/map";
import Scene from "../system/Scene";
import ALPHABET from "../types/alphabet";
import BackgroundColor from "../types/background";
import { SCREEN } from "../constants/config";
import Monsters from "../components/Monsters";
import { monster_opening } from "../constants/monster";
import IC from "../components/InstanceContainer";

class Opening extends Scene {
  bg: Background = new Background(BackgroundColor.Green);
  map: Terrain = new Terrain(map_opening);
  fruits: Fruits = new Fruits(fruits_opening);
  monsters: Monsters = new Monsters(monster_opening);

  constructor() {
    super();
  }

  async init() {
    await super.init();

    this.createText([
      ALPHABET.P,
      ALPHABET.I,
      ALPHABET.X,
      ALPHABET.E,
      ALPHABET.L,
    ], {
      y: 100
    });
    this.createText([
      ALPHABET.A,
      ALPHABET.D,
      ALPHABET.V,
      ALPHABET.E,
      ALPHABET.N,
      ALPHABET.T,
      ALPHABET.U,
      ALPHABET.R,
      ALPHABET.E,
    ], {
      y: 130
    });

    this.textContainer.alpha = 1;
    this.container.addChild(this.textContainer);

    this.bg.init();
    this.map.init();
    this.fruits.init();
    this.monsters.init();
    this.createStartButton();
  }

  async createStartButton() {
    const btnBaseTexture = await Assets.load('/assets/menu/button/play.png');
    const btn = new Sprite(btnBaseTexture);
    btn.scale = 1.5;
    const { width, height } = btn;
    btn.position.set(SCREEN.WIDTH / 2 - width / 2, SCREEN.HEIGHT / 2 - height / 2);

    btn.interactive = true;
    btn.cursor = 'pointer';
    btn.on('pointerdown', () => {
      this.destroy();
      IC.get('level1').init();
    });

    this.container.addChild(btn);
  }

  async destroy() {
    super.destroy();
    this.map.destroy();
    this.bg.destroy();
    this.monsters.destroy();
    this.fruits.destroy();
  }
}

export default Opening;
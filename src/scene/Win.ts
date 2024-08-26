import { Assets, Sprite } from "pixi.js";
import Background from "../components/Background";
import Fruits from "../components/Fruits";
import Terrain from "../components/Terrain";
import { fruits_opening } from "../constants/fruit";
import { map_win } from "../constants/map";
import Scene from "../system/Scene";
import BackgroundColor from "../types/background";
import { SCREEN } from "../constants/config";
import Monsters from "../components/Monsters";
import { monster_opening } from "../constants/monster";
import IC from "../components/InstanceContainer";
import IcEnum from "../types/instanceContainer";

class Win extends Scene {
  bg: Background = new Background(BackgroundColor.Pink);
  map: Terrain = new Terrain(map_win);
  fruits: Fruits = new Fruits(fruits_opening);
  monsters: Monsters = new Monsters(monster_opening);
  // checkpoint!: Sprite;

  constructor() {
    super();
  }

  async init() {
    await super.init();

    this.bg.init();
    this.map.init();
    // this.fruits.init();
    // this.monsters.init();
    this.createStartButton();
    // this.createCheckpoint();
  }

  async createStartButton() {
    const btnBaseTexture = await Assets.load('/assets/menu/button/restart.png');
    const btn = new Sprite(btnBaseTexture);
    btn.scale = 1.5;
    const { width, height } = btn;
    btn.position.set(SCREEN.WIDTH / 2 - width / 2, SCREEN.HEIGHT / 1.4 - height / 2);

    btn.interactive = true;
    btn.cursor = 'pointer';
    btn.on('pointerdown', async () => {
      await this.destroy();

      const newWinScene = new Win();
      IC.register(IcEnum.Win, newWinScene);

      await IC.get(IcEnum.Level1Cutscene).init();
    });

    this.container.addChild(btn);
  }

  async destroy() {
    await Assets.unload('/assets/menu/button/play.png');
    await super.destroy();
    this.map.destroy();
    this.bg.destroy();
    this.monsters.destroy();
    this.fruits.destroy();
    // this.checkpoint.destroy();
  }
}

export default Win;
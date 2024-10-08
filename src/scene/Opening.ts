import { Assets, Sprite } from "pixi.js";
import Background from "../components/Background";
import Fruits from "../components/Fruits";
import Terrain from "../components/Terrain";
import { fruits_opening } from "../constants/fruit";
import { map_opening } from "../constants/map";
import Scene from "../system/Scene";
import BackgroundColor from "../types/background";
import { SCREEN } from "../constants/config";
import Monsters from "../components/Monsters";
import { monster_opening } from "../constants/monster";
import IC from "../components/InstanceContainer";
import IcEnum from "../types/instanceContainer";
import { app } from "../app";

class Opening extends Scene {
  bg: Background = new Background(BackgroundColor.Purple);
  map: Terrain = new Terrain(map_opening);
  fruits: Fruits = new Fruits(fruits_opening);
  monsters: Monsters = new Monsters(monster_opening);
  checkpoint!: Sprite;

  constructor() {
    super();
  }

  async init() {
    await super.init();

    await this.bg.init();
    await this.map.init();
    await this.fruits.init();
    await this.monsters.init();
    await this.createStartButton();
    await this.createCheckpoint();
  }

  async createCheckpoint() {
    const startTexture = await Assets.load('/assets/checkpoint/start.png');
    this.checkpoint = new Sprite(startTexture);
    this.checkpoint.position.set(500, 144);
    app.stage.addChild(this.checkpoint);
  }

  async createStartButton() {
    const btnBaseTexture = await Assets.load('/assets/menu/button/play.png');
    const btn = new Sprite(btnBaseTexture);
    btn.scale = 1.5;
    const { width, height } = btn;
    btn.position.set(SCREEN.WIDTH / 2 - width / 2, SCREEN.HEIGHT / 2 - height / 2);

    btn.interactive = true;

    // window.addEventListener('keydown', async (e) => {
    //   await this.destroy();
    //   await IC.get(IcEnum.Level1Cutscene).init();
    // });

    btn.cursor = 'pointer';
    btn.on('pointerdown', async () => {
      await this.destroy();
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
    this.checkpoint.destroy();
  }
}

export default Opening;
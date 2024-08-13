import { Container } from 'pixi.js';
import Character from './../components/Character.js';
import Background from './../components/Background.js';
import Terrain from './../components/Terrain.js';
import { map_lv1 } from './../constants/map.js';
import { fruits_lv1 } from './../constants/fruit.js';
import { monster_lv1 } from './../constants/monster.js';
import { destination_lv1 } from './../constants/checkpoint.js';
import Fruits from './../components/Fruits.js';
import Monsters from './../components/Monsters.js';
import HealthBar from './../components/HealthBar';
import CheckPoint from './../components/CheckPoint.js';
import IC from './../components/InstanceContainer.js';
import BackgroundColor from './../types/background.js';
import { CHARACTER } from './../constants/config.js';

class Level {
  container: Container;

  constructor() {
    this.container = new Container();
  }

  init() {
    // bg
    const bg = new Background(BackgroundColor.Brown);
    bg.init();

    // 地形
    const tiles = new Terrain(map_lv1);
    tiles.init();
    IC.register('tiles', tiles);

    // 起終點
    const checkpoint = new CheckPoint(destination_lv1);
    checkpoint.init();
    IC.register('checkpoint', checkpoint);

    // 水果
    const fruits = new Fruits(fruits_lv1);
    fruits.init();
    IC.register('fruits', fruits);

    // 怪物
    const monsters = new Monsters(monster_lv1);
    monsters.init();
    IC.register('monsters', monsters);

    // 血條
    const healthbar = new HealthBar();
    healthbar.init();
    IC.register('healthbar', healthbar);

    // 角色
    const blueGuy = new Character('blue-guy', CHARACTER.INITIAL_X, CHARACTER.INITIAL_Y);
    blueGuy.init();
  }

  getContainer() {
    return this.container;
  }

  destroy() {
    this.container.destroy({ children: true, texture: true, textureSource: true, context: true });
  }
}

export default Level;
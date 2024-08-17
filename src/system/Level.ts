import Character from '../components/Character.js';
import Background from './../components/Background.js';
import Terrain from './../components/Terrain.js';
import { map_lv1, map_lv2, map_lv3 } from './../constants/map.js';
import { fruits_lv1, fruits_lv2, fruits_lv3 } from './../constants/fruit.js';
import { monster_lv1, monster_lv2, monster_lv3 } from './../constants/monster.js';
import { destination_lv1, destination_lv2, destination_lv3 } from './../constants/checkpoint.js';
import Fruits from './../components/Fruits.js';
import Monsters from './../components/Monsters.js';
import HealthBar from './../components/HealthBar';
import CheckPoint from './../components/CheckPoint.js';
import IC from './../components/InstanceContainer.js';
import BackgroundColor from './../types/background.js';
import { CHARACTER } from './../constants/config.js';

const config = {
  map: {
    lv1: map_lv1,
    lv2: map_lv2,
    lv3: map_lv3,
  },
  fruits: {
    lv1: fruits_lv1,
    lv2: fruits_lv2,
    lv3: fruits_lv3,
  },
  monster: {
    lv1: monster_lv1,
    lv2: monster_lv2,
    lv3: monster_lv3,
  },
  destination: {
    lv1: destination_lv1,
    lv2: destination_lv2,
    lv3: destination_lv3,
  },
  background: {
    lv1: BackgroundColor.Brown,
    lv2: BackgroundColor.Purple,
    lv3: BackgroundColor.Blue,
  }
};
class Level {
  tiles!: Terrain;
  checkpoint!: CheckPoint;
  fruits!: Fruits;
  monsters!: Monsters;
  healthbar!: HealthBar;
  character!: Character;
  level: number;

  constructor(level: number) {
    this.level = level;
  }

  init() {
    // bg
    const bg = new Background(config.background[`lv${this.level}`]);
    bg.init();

    // 地形
    this.tiles = new Terrain(config.map[`lv${this.level}`]);
    this.tiles.init();
    IC.register('tiles', this.tiles);

    // 起終點
    this.checkpoint = new CheckPoint(config.destination[`lv${this.level}`]);
    this.checkpoint.init();
    IC.register('checkpoint', this.checkpoint);

    // 水果
    this.fruits = new Fruits(config.fruits[`lv${this.level}`]);
    this.fruits.init();
    IC.register('fruits', this.fruits);

    // 怪物
    this.monsters = new Monsters(config.monster[`lv${this.level}`]);
    this.monsters.init();
    IC.register('monsters', this.monsters);

    // 血條
    this.healthbar = new HealthBar();
    this.healthbar.init();
    IC.register('healthbar', this.healthbar);

    // 角色
    this.character = new Character('blue-guy', CHARACTER.INITIAL_X, CHARACTER.INITIAL_Y);
    this.character.init();
  }

  destroy() {
    this.character.destroy();
    this.healthbar.destroy();
    this.monsters.destroy();
    this.fruits.destroy();
    this.checkpoint.destroy();
    this.tiles.destroy();
  }
}

export default Level;
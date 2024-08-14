import Character from '../components/Character.js';
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
  tiles!: Terrain;
  checkpoint!: CheckPoint;
  fruits!: Fruits;
  monsters!: Monsters;
  healthbar!: HealthBar;
  character!: Character;

  constructor() {
  }

  init() {
    // bg
    const bg = new Background(BackgroundColor.Brown);
    bg.init();

    // 地形
    this.tiles = new Terrain(map_lv1);
    this.tiles.init();
    IC.register('tiles', this.tiles);

    // 起終點
    this.checkpoint = new CheckPoint(destination_lv1);
    this.checkpoint.init();
    IC.register('checkpoint', this.checkpoint);

    // 水果
    this.fruits = new Fruits(fruits_lv1);
    this.fruits.init();
    IC.register('fruits', this.fruits);

    // 怪物
    this.monsters = new Monsters(monster_lv1);
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
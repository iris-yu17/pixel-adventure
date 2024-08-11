import Character from './components/Character.js';
import Background from './system/Background.js';
import Terrain from './system/Terrain.js';
import { level1 } from './constants/map.js';
import Fruit from './components/Fruit.js';
import { fruits_lv1 } from './constants/fruit.js';
import { TILE } from './constants/config.js';

const bg = new Background('Gray');
bg.init();

const map = new Terrain(level1);
map.init();
const platforms = map.getPlatforms();

const blueGuy = new Character('blue-guy', 150, 304, platforms);
blueGuy.init();

for (const item of fruits_lv1) {
  const { name, x, y } = item;
  const fruit = new Fruit(name, x * TILE.SIZE, y * TILE.SIZE);
  fruit.init();
}



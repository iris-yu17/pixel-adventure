import Character from './components/Character.js';
import Background from './system/Background.js';
import Terrain from './system/Terrain.js';
import { level1 } from './constants/map.js';
import { fruits_lv1 } from './constants/fruit.js';
import Fruits from './system/Fruits.js';

const bg = new Background('Gray');
bg.init();

const map = new Terrain(level1);
map.init();
const tiles = map.getTiles();

const fruitsMap = new Fruits(fruits_lv1);
fruitsMap.init();
const fruits = fruitsMap.getFruits();

const blueGuy = new Character('blue-guy', 150, 304, tiles, fruits);
blueGuy.init();

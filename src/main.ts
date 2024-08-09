import Character from './components/Character.js';
import Background from './system/Background.js';
import Terrain from './system/Terrain.js';
import { level1 } from './constants/map.js';

const bg = new Background('Gray');
bg.init();

const map = new Terrain(level1);
map.init();
const platforms = map.getPlatforms();

const blueGuy = new Character('blue-guy', 150, 304, platforms);
blueGuy.init();



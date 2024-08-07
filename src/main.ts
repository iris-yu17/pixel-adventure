import Character from './components/Character.js';
import Background from './system/Background.js';
import Terrain from './system/Terrain.js';
import { level1 } from './constants/map.js';

const blueGuy = new Character('blue-guy', 300, 300);
blueGuy.init();

const bg = new Background('Gray');
bg.init();

const frame = new Terrain(level1);
frame.create()


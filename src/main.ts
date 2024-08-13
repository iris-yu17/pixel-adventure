import Character from './components/Character.js';
import Background from './system/Background.js';
import Terrain from './system/Terrain.js';
import { level1 } from './constants/map.js';
import { fruits_lv1 } from './constants/fruit.js';
import { monster_lv1 } from './constants/monster.js';
import Fruits from './system/Fruits.js';
import Monsters from './system/Monsters.js';
import HealthBar from './components/HealthBar';
import CheckPoint from './components/CheckPoint.js';
import IC from './system/InstanceContainer.js';
import BackgroundColor from './types/background.js';

const bg = new Background(BackgroundColor.Brown);
bg.init();

const tiles = new Terrain(level1);
tiles.init();
IC.register('tiles', tiles);

const fruits = new Fruits(fruits_lv1);
fruits.init();
IC.register('fruits', fruits);

const monsters = new Monsters(monster_lv1);
monsters.init();
IC.register('monsters', monsters);

const healthbar = new HealthBar();
healthbar.init();
IC.register('healthbar', healthbar);

const blueGuy = new Character('blue-guy', 10, 304);
blueGuy.init();

const checkpoint = new CheckPoint();
checkpoint.init();

import Character from './components/Character.js';
import Background from './components/Background.js';
import Terrain from './components/Terrain.js';
import { level1 } from './constants/map.js';
import { fruits_lv1 } from './constants/fruit.js';
import { monster_lv1 } from './constants/monster.js';
import Fruits from './components/Fruits.js';
import Monsters from './components/Monsters.js';
import HealthBar from './components/HealthBar';
import CheckPoint from './components/CheckPoint.js';
import IC from './components/InstanceContainer.js';
import BackgroundColor from './types/background.js';
import { CHARACTER } from './constants/config.js';

const bg = new Background(BackgroundColor.Brown);
bg.init();

const tiles = new Terrain(level1);
tiles.init();
IC.register('tiles', tiles);

const checkpoint = new CheckPoint({ x: 570, y: 130 });
checkpoint.init();
IC.register('checkpoint', checkpoint);

const fruits = new Fruits(fruits_lv1);
fruits.init();
IC.register('fruits', fruits);

const monsters = new Monsters(monster_lv1);
monsters.init();
IC.register('monsters', monsters);

const healthbar = new HealthBar();
healthbar.init();
IC.register('healthbar', healthbar);

const blueGuy = new Character('blue-guy', CHARACTER.INITIAL_X, CHARACTER.INITIAL_Y);
blueGuy.init();


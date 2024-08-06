import Character from './components/character.js';
import Background from './system/background.js';
import { KEY } from './types/key.js';

const blueGuy = new Character('blue-guy', 300, 300);
blueGuy.init();

const bg = new Background('Gray');
bg.init();
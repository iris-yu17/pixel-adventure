import Character from './components/character.js';
import { KEY } from './types/key.js';

const blueGuy = new Character('blue-guy', 100, 100);
blueGuy.init();

// 綁定鍵盤事件
window.addEventListener("keydown", (e) => {
  const { code } = e;
  if (code === KEY.ArrowRight || code === KEY.ArrowLeft) {
    blueGuy.move(code);
  }
});

window.addEventListener("keyup", (e) => {
  blueGuy.switchSprite();
});

// import './components/character/blueGuy-run';
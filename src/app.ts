import { Application } from 'pixi.js';
import { SCREEN } from './constants/config';

// 創建 pixi app
const app = new Application();

(async () => {
  await app.init({ background: '#1099bb', width: SCREEN.WIDTH, height: SCREEN.HEIGHT });

  // 放到 DOM 裡面
  document.querySelector('#screen')?.appendChild(app.canvas);
})();

export { app };
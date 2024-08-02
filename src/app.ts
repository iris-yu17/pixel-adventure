import { Application } from 'pixi.js';

// 創建 pixi app
const app = new Application();

// init pixi app
await app.init({ background: '#1099bb', resizeTo: window });

// 放到 DOM 裡面
document.querySelector('#app')?.appendChild(app.canvas);

export { app };
import { Assets, Texture, AnimatedSprite } from 'pixi.js';
import { app } from './../../app';

const promise = Assets.load('/assets/characters/blue-guy/run-right.json');

promise.then(() => {
  // 創建一個 array 來存放 texture
  const sushiTextureArray = [];

  for (let i = 1; i < 12; i++) {
    // 轉為 texture 並放入 array
    sushiTextureArray.push(Texture.from(`run_${i}.png`));
  }

  // 轉為 AnimatedSprite
  const blueGuyRun = new AnimatedSprite(sushiTextureArray);

  // 設置位置, 動畫速度
  blueGuyRun.position.set(500, 100);
  blueGuyRun.animationSpeed = 0.25;

  // 動畫開始
  blueGuyRun.play();

  // 加到舞台
  app.stage.addChild(blueGuyRun);
});
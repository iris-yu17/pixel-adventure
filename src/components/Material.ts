import { Assets, Sprite, Texture } from "pixi.js";
import { app } from "../app";

class Material {
  frameNo: number;
  x: number;
  y: number;

  constructor(frameNo: number, x: number, y: number) {
    this.frameNo = frameNo;
    this.x = x;
    this.y = y;
  }

  async create() {
    await Assets.load('/assets/material/material.json');

    const material = Sprite.from(Texture.from(`${this.frameNo}.png`));

    material.position.set(this.x, this.y);
    app.stage.addChild(material);
  }
}

export default Material;
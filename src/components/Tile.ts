import { Assets, Sprite, Texture } from "pixi.js";
import { app } from "../app";

class Tile {
  frameNo: number;
  x: number;
  y: number;

  constructor(frameNo: number, x: number, y: number) {
    this.frameNo = frameNo;
    this.x = x;
    this.y = y;
  }

  async create() {
    await Assets.load('/assets/tile/tile.json');

    const tile = Sprite.from(Texture.from(`${this.frameNo}.png`));

    tile.position.set(this.x, this.y);
    tile.anchor.set(0.5, 0.5);
    app.stage.addChild(tile);
  }
}

export default Tile;
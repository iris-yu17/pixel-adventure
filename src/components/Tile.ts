import { Assets, Sprite, Texture } from "pixi.js";
import { app } from "../app";
import { Z_INDEX } from "../constants/config";

class Tile {
  frameNo: number;
  x: number;
  y: number;
  tile: Sprite;

  constructor(frameNo: number, x: number, y: number) {
    this.frameNo = frameNo;
    this.x = x;
    this.y = y;
  }

  async create() {
    await Assets.load('/assets/tile/tile.json');

    this.tile = Sprite.from(Texture.from(`${this.frameNo}.png`));

    this.tile.position.set(this.x, this.y);
    this.tile.anchor.set(0.5, 0.5);
    this.tile.zIndex = Z_INDEX.TILE;
    app.stage.addChild(this.tile);
  }

  getX() {
    return this.tile.position.x;
  }

  getY() {
    return this.tile.position.y;
  }
}

export default Tile;
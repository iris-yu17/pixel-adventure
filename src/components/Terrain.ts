import Tile from "./Tile";
import { TILE } from "../constants/config";

export type TileType = {
  x: number,
  y: number,
};

class Terrain {
  map: number[][];
  tiles: Tile[] = [];

  constructor(map: number[][]) {
    this.map = map;
  }

  async init() {
    const tilePromises = [];

    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const frameNo = this.map[y][x];

        if (frameNo !== 0) {
          const xPosition = TILE.SIZE / 2 + x * TILE.SIZE;
          const yPosition = TILE.SIZE / 2 + y * TILE.SIZE;

          const tile = new Tile(frameNo, xPosition, yPosition);
          tilePromises.push(tile.create().then(() => this.tiles.push(tile)));
        }
      }
    }

    await Promise.all(tilePromises);
  }

  getTiles() {
    return this.tiles;
  }

  destroy() {
    this.tiles.forEach((tile) => {
      tile.destroy();
    });
  }
}

export default Terrain;
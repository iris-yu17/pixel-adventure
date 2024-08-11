import Tile from "../components/Tile";
import { TILE } from "../constants/config";

export type TileType = {
  x: number,
  y: number,
};

class Terrain {
  map: number[][];
  tiles: TileType[] = [{ x: 0, y: 0 }];

  constructor(map: number[][]) {
    this.map = map;
  }

  init() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const frameNo = this.map[y][x];

        const xPosition = TILE.SIZE / 2 + x * TILE.SIZE;
        const yPosition = TILE.SIZE / 2 + y * TILE.SIZE;

        if (frameNo !== 0) {
          // render 地形
          const tile = new Tile(frameNo, xPosition, yPosition);
          tile.create();

          // 產生平台資料
          this.tiles.push({
            x: xPosition,
            y: yPosition
          });
        }
      }
    }
  }

  getTiles() {
    return this.tiles;
  }
}

export default Terrain;
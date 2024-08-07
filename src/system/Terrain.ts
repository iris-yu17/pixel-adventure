import Material from "../components/Material";
import { TILE } from "../constants/config";

class Terrain {
  map: Array<[]>;
  constructor(map: Array<[]>) {
    this.map = map;
  }

  create() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const frameNo = this.map[y][x];
        if (frameNo !== 0) {
          const material = new Material(frameNo, x * TILE.SIZE, y * TILE.SIZE);
          material.create();
        }
      }
    }

  }
}

export default Terrain;
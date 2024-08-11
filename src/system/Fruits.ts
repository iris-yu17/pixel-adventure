import Fruit from "../components/Fruit";
import { TILE } from "../constants/config";
import { FruitType } from "../components/Fruit";

class Fruits {
  map: FruitType[];
  fruitsArray: Fruit[] = [];

  constructor(map: FruitType[]) {
    this.map = map;
  }

  init() {
    for (const item of this.map) {
      const { name, x, y } = item;
      const fruit = new Fruit(name, x * TILE.SIZE, y * TILE.SIZE);
      this.fruitsArray.push(fruit);
      fruit.init();
    }
  }

  getFruits() {
    return this.fruitsArray;
  }
}

export default Fruits;
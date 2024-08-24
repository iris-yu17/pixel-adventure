import Fruit from "./Fruit";
import { TILE } from "../constants/config";
import { FruitType } from "./Fruit";
import IC from "./InstanceContainer";
import IcEnum from "../types/instanceContainer";

class Fruits {
  map: FruitType[];
  fruitsArray: Fruit[] = [];
  fruitCount: number;
  showDestination: Function;

  constructor(map: FruitType[]) {
    this.map = map;
    this.fruitCount = map.length;

    const checkpoint = IC.get(IcEnum.Checkpoint);
    this.showDestination = checkpoint?.showFlag.bind(checkpoint);
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

  updateFruitCount() {
    this.fruitCount--;
    if (this.fruitCount === 0) {
      this.showDestination();
    }
  }

  destroy() {
    this.fruitsArray.forEach((fruit) => {
      fruit.destroy();
    });
  }
}

export default Fruits;
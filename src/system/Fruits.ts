import Fruit from "../components/Fruit";
import { TILE } from "../constants/config";
import { FruitType } from "../components/Fruit";
import IC from "./InstanceContainer";

class Fruits {
  map: FruitType[];
  fruitsArray: Fruit[] = [];
  fruitCount: number;
  showDestination: Function;

  constructor(map: FruitType[]) {
    this.map = map;
    this.fruitCount = map.length;

    const checkpoint = IC.get('checkpoint');
    this.showDestination = checkpoint.showFlag.bind(checkpoint);
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
}

export default Fruits;
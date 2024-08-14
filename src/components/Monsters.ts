import Monster from "./Monster";
import { CHARACTER } from "../constants/config";

class Monsters {
  // map: FruitType[];
  monsterArray: Set<Monster> = new Set();

  constructor(map) {
    this.map = map;
  }

  init() {
    for (const item of this.map) {
      const { name, x, y, moveRange } = item;
      const monster = new Monster(name, x * CHARACTER.SIZE, y * CHARACTER.SIZE, moveRange * CHARACTER.SIZE);
      this.monsterArray.add(monster);
      monster.init();
    }
  }

  getMonsters() {
    return this.monsterArray;
  }

  destroy() {
    this.monsterArray.forEach((monster) => {
      monster.destroy();
    });
  }
}

export default Monsters;
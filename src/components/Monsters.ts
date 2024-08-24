import Monster from "./Monster";
import { CHARACTER } from "../constants/config";
import MONSTER from "../types/monster";

type MonsterType = {
  name: MONSTER,
  x: number,
  y: number,
  moveRange: number;
};

class Monsters {
  map: MonsterType[];
  monsterArray: Set<Monster> = new Set();

  constructor(map: MonsterType[]) {
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
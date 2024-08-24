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

  async init() {
    const monsterPromises = this.map.map(({ name, x, y, moveRange }) => {
      const monster = new Monster(name, x * CHARACTER.SIZE, y * CHARACTER.SIZE, moveRange * CHARACTER.SIZE);
      this.monsterArray.add(monster);
      return monster.init();
    });

    await Promise.all(monsterPromises);
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
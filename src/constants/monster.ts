import MONSTER from "../types/monster";

const monster_opening = [
  {
    name: MONSTER.Chicken,
    x: 9.5,
    y: 10.5,
    moveRange: 15
  },
];

const monster_lv1 = [
  {
    name: MONSTER.Chicken,
    x: 12,
    y: 3.5,
    moveRange: 3
  },
  {
    name: MONSTER.Mushroom,
    x: 6.5,
    y: 9.5,
    moveRange: 2.5
  },
  {
    name: MONSTER.Mushroom,
    x: 2.5,
    y: 4,
    moveRange: 1
  },
  {
    name: MONSTER.Bird,
    x: 13,
    y: 6,
    moveRange: 6
  }
];

export { monster_lv1, monster_opening };
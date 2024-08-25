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
    x: 12.25,
    y: 3.5,
    moveRange: 3.5,
  },
  {
    name: MONSTER.Mushroom,
    x: 6.25,
    y: 9.5,
    moveRange: 2.5,
  },
];

const monster_lv2 = [
  {
    name: MONSTER.Chicken,
    x: 15.5,
    y: 10,
    moveRange: 3
  },
  {
    name: MONSTER.Mushroom,
    x: 15,
    y: 4.5,
    moveRange: 3
  },
  {
    name: MONSTER.Bird,
    x: 6,
    y: 2.5,
    moveRange: 5
  },
];

const monster_lv3 = [
  {
    name: MONSTER.Mushroom,
    x: 14.5,
    y: 10,
    moveRange: 6
  },
  {
    name: MONSTER.Chicken,
    x: 4.75,
    y: 3,
    moveRange: 3
  },
  {
    name: MONSTER.Bird,
    x: 15,
    y: 6.5,
    moveRange: 5
  },
];



export { monster_lv1, monster_opening, monster_lv2, monster_lv3 };
const SCREEN = {
  WIDTH: 608,
  HEIGHT: 368,
};

const TEXT = {
  WIDTH: 8,
  HEIGHT: 10
};

const CHARACTER = {
  SIZE: 32,
  HALF_SIZE: 16,
  OFFSET_X: 4,
  OFFSET_Y: 4
};

const SPEED = {
  CHARACTER_RUN: 2,
  CHARACTER_JUMP: 2
};

const PHYSICS = {
  GRAVITY: 0.8,
  POWER: 12,
};

const TILE = {
  SIZE: 16,
  HALF_SIZE: 8,
  X_COUNT: 38,
  Y_COUNT: 23,
  GROUND_BASE_Y: 336
};


export { SPEED, PHYSICS, SCREEN, CHARACTER, TILE, TEXT };
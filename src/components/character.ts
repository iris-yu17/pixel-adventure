import { Assets, Texture, AnimatedSprite, Ticker } from 'pixi.js';
import { app } from '../app';
import { KEY } from '../types/key';
import { PHYSICS, SPEED, CHARACTER, TILE } from '../constants/config';
import { TileType } from '../system/Terrain';
import Fruit from '../components/Fruit';

enum Action {
  Idle = 'idle',
  Run = 'run',
  Jump = 'jump'
}

class Character {
  name: string;
  x: number;
  y: number;
  jumpAt: number;
  facingRight: boolean = true;
  textures: {
    idle: Texture[],
    run: Texture[],
    jump: Texture[],
  } = {
      idle: [],
      run: [],
      jump: [],
    };
  currentAction: Action = Action.Idle;
  avatar!: AnimatedSprite;
  pressedKeys: Set<KEY> = new Set();
  ticker: Ticker = new Ticker();
  isJumping: boolean = false;
  jumpVelocity: number = 0;
  tiles: TileType[] = [];
  fruits: Fruit[] = [];

  constructor(name: string, x: number, y: number, tiles: TileType[], fruits: Fruit[]) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.jumpAt = y;
    this.tiles = tiles;
    this.fruits = fruits;
  }

  checkCollision(tile: TileType) {
    // 計算角色的實際邊界
    const charLeft = this.x - CHARACTER.HALF_SIZE + CHARACTER.OFFSET_X;
    const charRight = this.x + CHARACTER.HALF_SIZE - CHARACTER.OFFSET_X;
    const charTop = this.y - CHARACTER.HALF_SIZE;
    const charBottom = this.y + CHARACTER.HALF_SIZE;

    // 計算 tile 的實際邊界
    const tileLeft = tile.x - TILE.HALF_SIZE;
    const tileRight = tile.x + TILE.HALF_SIZE;
    const tileTop = tile.y - TILE.HALF_SIZE;
    const tileBottom = tile.y + TILE.HALF_SIZE;;

    // 碰撞檢測
    const rightHit = charRight > tileLeft;
    const leftHit = charLeft < tileRight;
    const bottomHit = charBottom > tileTop;
    const topHit = charTop < tileBottom;

    return rightHit && leftHit && bottomHit && topHit;
  }

  getBottomTiles(tiles: TileType[]) {
    const arr = [];
    for (const tile of tiles) {
      if (Math.abs(tile.x - this.x) < CHARACTER.HALF_SIZE && tile.y > this.y) {
        arr.push(tile);
      }
    }
    return arr;
  }

  // 四周九宮格範圍的 tiles
  getNearbyTiles() {
    const arr = [];
    for (const tile of this.tiles) {
      if (Math.abs(tile.x - this.x) < CHARACTER.SIZE && Math.abs(tile.y - this.y) < CHARACTER.SIZE) {
        arr.push(tile);
      }
    }
    return arr;
  }

  async init() {
    await Assets.load(`/assets/characters/${this.name}/idle.json`);
    await Assets.load(`/assets/characters/${this.name}/run.json`);
    await Assets.load(`/assets/characters/${this.name}/jump.json`);

    // create textures
    this.createTexture(Action.Idle, 11);
    this.createTexture(Action.Run, 12);
    this.createTexture(Action.Jump, 6);

    // create avatar
    this.avatar = new AnimatedSprite(this.textures.idle);
    this.avatar.animationSpeed = 0.35;
    this.avatar.position.set(this.x, this.y);
    this.avatar.anchor.set(0.5, 0.5);
    this.avatar.loop = true;
    this.avatar.play();

    app.stage.addChild(this.avatar);

    this.addListener();

    this.ticker.add(this.move, this);
    this.ticker.start();
  }

  turnFace() {
    const scaleX = this.facingRight ? 1 : -1;
    this.avatar.scale.x = scaleX;
  }

  handleTextureChange() {
    switch (true) {
      case this.pressedKeys.has(KEY.ArrowUp):
        this.switchTexture(Action.Jump);
        break;
      case this.pressedKeys.has(KEY.ArrowLeft) || this.pressedKeys.has(KEY.ArrowRight):
        this.switchTexture(Action.Run);
        break;
      default:
        this.switchTexture(Action.Idle);
        break;
    }
  }

  move(delta: Ticker) {
    const { deltaTime } = delta;
    const nearbyTiles = this.getNearbyTiles();

    this.handleTextureChange();

    // 方向
    if (this.pressedKeys.has(KEY.ArrowRight)) {
      this.facingRight = true;
      this.x += SPEED.CHARACTER_RUN * deltaTime;
    }

    if (this.pressedKeys.has(KEY.ArrowLeft)) {
      this.facingRight = false;
      this.x -= SPEED.CHARACTER_RUN * deltaTime;
    }

    if (this.pressedKeys.has(KEY.ArrowUp) && !this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -PHYSICS.POWER;
      this.jumpAt = this.y;
    }

    // 碰撞
    for (let tile of nearbyTiles) {
      if (this.checkCollision(tile)) {
        const overlapX = Math.min(
          // 角色右邊緣超過 tile 左邊緣的距離
          this.x + CHARACTER.HALF_SIZE - tile.x + TILE.HALF_SIZE,
          // tile 右邊緣超過角色左邊緣的距離
          tile.x + TILE.HALF_SIZE - (this.x - CHARACTER.HALF_SIZE)
        );
        const overlapY = Math.min(
          this.y + CHARACTER.HALF_SIZE - tile.y + TILE.HALF_SIZE,
          tile.y + TILE.HALF_SIZE - (this.y - CHARACTER.HALF_SIZE)
        );

        // 判斷碰撞主要發生在水平方向還是垂直方向
        if (overlapX < overlapY) {
          // 水平碰撞
          if (this.x < tile.x) {
            this.x = tile.x - TILE.HALF_SIZE - CHARACTER.HALF_SIZE;
          } else {
            this.x = tile.x + TILE.HALF_SIZE + CHARACTER.HALF_SIZE;
          }
        } else {
          // 垂直碰撞
          if (this.y < tile.y) {
            this.y = tile.y - TILE.HALF_SIZE - CHARACTER.HALF_SIZE;
            this.isJumping = false;
            this.jumpVelocity = 0;
          } else {
            this.y = tile.y + TILE.HALF_SIZE + CHARACTER.HALF_SIZE;
          }
        }
      }
    }

    const bottomTiles = this.getBottomTiles(nearbyTiles);
    if (bottomTiles.length === 0) {
      this.isJumping = true;
      this.jumpAt = TILE.GROUND_BASE_Y;
    }

    // 跳躍
    if (this.isJumping) {
      // 應用重力
      this.jumpVelocity += PHYSICS.GRAVITY;

      // 更新 Y 坐標
      this.y += this.jumpVelocity * deltaTime;

      // 若落地
      if (this.y >= this.jumpAt) {
        this.y = this.jumpAt;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }

    this.cellectFruit();
    this.turnFace();
    this.avatar.position.set(this.x, this.y);
  }

  cellectFruit() {
    for (const fruit of this.fruits) {
      if (this.checkCollision(fruit)) {
        fruit.collected();
      }
    }
  }

  switchTexture(action: Action = Action.Idle) {
    if (this.currentAction === action) return;
    this.currentAction = action;
    this.avatar.textures = this.textures[action];
    this.avatar.play();
  }

  onKeyDown(e: KeyboardEvent) {
    const { code } = e;

    if (code === KEY.ArrowRight || code === KEY.ArrowLeft || code === KEY.ArrowUp) {
      this.pressedKeys.add(code as KEY);
    }
  }

  onKeyUp(e: KeyboardEvent) {
    const { code } = e;

    this.pressedKeys.delete(code as KEY);
  }

  addListener() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  createTexture(action: Action, frame: number) {
    const textureArray = [];
    for (let i = 1; i <= frame; i++) {
      textureArray.push(Texture.from(`${action}_${i}.png`));
    }
    this.textures[action] = textureArray;
  }
}

export default Character;
import { Assets, Texture, AnimatedSprite, Ticker } from 'pixi.js';
import { app } from '../app';
import { KEY } from '../types/key';
import { PHYSICS, SPEED, SCREEN, CHARACTER } from '../constants/config';

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

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.jumpAt = y;
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

    if (this.pressedKeys.has(KEY.ArrowRight)) {
      this.facingRight = true;

      if (this.x > SCREEN.WIDTH - CHARACTER.SIZE / 2) return;
      this.x += SPEED.CHARACTER_RUN * deltaTime;
    }

    if (this.pressedKeys.has(KEY.ArrowLeft)) {
      this.facingRight = false;

      if (this.x < CHARACTER.SIZE / 2) return;
      this.x -= SPEED.CHARACTER_RUN * deltaTime;
    }

    if (this.pressedKeys.has(KEY.ArrowUp) && !this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -PHYSICS.POWER;
      this.jumpAt = this.y;
    }

    if (this.isJumping) {
      // 應用重力
      this.jumpVelocity += PHYSICS.GRAVITY * deltaTime;

      // 更新 Y 坐標
      this.y += this.jumpVelocity * deltaTime;

      // 檢查是否落地
      if (this.y >= this.jumpAt) {
        this.y = this.jumpAt!;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }

    this.turnFace();
    this.avatar.position.set(this.x, this.y);
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

    this.handleTextureChange();
  }

  onKeyUp(e: KeyboardEvent) {
    const { code } = e;

    this.pressedKeys.delete(code as KEY);

    this.handleTextureChange();
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
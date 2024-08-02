import { Assets, Texture, AnimatedSprite, Sprite, Container } from 'pixi.js';
import { app } from './../app';
import { KEY } from '../types/key';
import { SPEED } from '../constants/config';

class Character {
  name: string;
  x: number;
  y: number;
  container: Container;
  idleSprite!: AnimatedSprite;
  runSprite!: AnimatedSprite;
  currentSprite!: AnimatedSprite;
  facingRight: boolean;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.container = new Container();
    this.facingRight = true;
  }

  async init() {
    await Assets.load(`/assets/characters/${this.name}/idle.json`);
    await Assets.load(`/assets/characters/${this.name}/run.json`);

    this.idleSprite = this.createAnimatedSprite('idle', 11);
    this.runSprite = this.createAnimatedSprite('run', 12);

    this.container.position.set(this.x, this.y);

    this.currentSprite = this.idleSprite;
    this.container.addChild(this.currentSprite);
    app.stage.addChild(this.container);
  }

  createAnimatedSprite(action: string, frame: number) {
    const textureArray = [];

    for (let i = 1; i <= frame; i++) {
      textureArray.push(Texture.from(`${action}_${i}.png`));
    }

    const sprite = new AnimatedSprite(textureArray);

    sprite.animationSpeed = 0.25;
    sprite.position.set(0, 0);
    sprite.anchor.set(0.5);
    sprite.play();

    sprite.eventMode = 'dynamic';

    return sprite;
  }

  switchSprite(newSprite: AnimatedSprite = this.idleSprite) {
    this.turnFace();
    this.container.removeChild(this.currentSprite);
    this.currentSprite = newSprite;
    this.container.addChild(this.currentSprite);
  }

  turnFace() {
    const scaleX = this.facingRight ? 1 : -1;
    this.currentSprite.scale.x = scaleX;
  }

  move(direction: KEY) {
    switch (direction) {
      case KEY.ArrowRight:
        this.facingRight = true;
        this.switchSprite(this.runSprite);
        this.x += SPEED.CHARACTER_RUN;
        break;
      case KEY.ArrowLeft:
        this.facingRight = false;
        this.switchSprite(this.runSprite);
        this.x -= SPEED.CHARACTER_RUN;
        break;

      default:
        break;
    }

    this.turnFace();
    this.container.position.x = this.x;
  }
}

export default Character;
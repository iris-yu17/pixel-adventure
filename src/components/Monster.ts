import { Assets, Container, AnimatedSprite, Texture, Ticker } from "pixi.js";
import MONSTER from "../types/monster";
import { app } from "../app";
import { SCREEN } from "../constants/config";


const FRAME = {
  MONSTER: {
    [MONSTER.Chicken]: 14,
    [MONSTER.Mushroom]: 16,
    [MONSTER.Bird]: 9,
    [MONSTER.Duck]: 10,
  },
  HIT: 5,
};

class Monster {
  name: MONSTER;
  monster!: AnimatedSprite;
  monsterHit!: AnimatedSprite;
  container: Container = new Container();
  x: number;
  y: number;
  moveRange: number;
  movedPixels: number = 0;
  facingRight: boolean = Math.random() < 0.5;
  moveTicker: Ticker = new Ticker();

  constructor(name: MONSTER, x: number, y: number, moveRange: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.moveRange = moveRange;
  }

  async init() {
    await Assets.load(`/assets/monsters/${this.name}/hit.json`);
    await Assets.load(`/assets/monsters/${this.name}/run.json`);

    this.createRunSprite();
    this.createHitSprite();

    // create container
    this.container = new Container();
    this.container.position.set(this.x, this.y);
    this.container.addChild(this.monster);
    app.stage.addChild(this.container);
  }

  createRunSprite() {
    const textureArray = [];

    for (let i = 1; i <= FRAME.MONSTER[this.name]; i++) {
      textureArray.push(Texture.from(`${this.name}_run_${i}.png`));
    }

    this.monster = new AnimatedSprite(textureArray);
    this.monster.animationSpeed = 0.35;
    this.monster.anchor.set(0.5, 0.5);
    this.monster.play();

    this.container.addChild(this.monster);
    this.move();
    this.trunFace();
  }

  createHitSprite() {
    const textureArray = [];

    for (let i = 1; i <= FRAME.HIT; i++) {
      textureArray.push(Texture.from(`${this.name}_hit_${i}.png`));
    }

    this.monsterHit = new AnimatedSprite(textureArray);
    this.monsterHit.animationSpeed = 0.35;
    this.monsterHit.anchor.set(0.5, 0.5);
  }

  move() {
    this.moveTicker.add(({ deltaTime }) => {
      const direction = this.facingRight ? 1 : -1;
      this.container.x += 1 * direction * deltaTime;
      this.movedPixels += 1 * direction * deltaTime;

      if (this.movedPixels >= this.moveRange / 2 || this.movedPixels <= -this.moveRange / 2) {
        this.trunFace();
      }
    });
    this.moveTicker.start();
  }

  trunFace() {
    this.monster.scale.x = this.facingRight ? 1 : -1;
    this.facingRight = !this.facingRight;
  }

  hit() {
    this.container.removeChild(this.monster);
    this.container.addChild(this.monsterHit);
    this.monsterHit.play();
    this.monsterHit.loop = false;
    this.removeFromStage();
  }

  removeFromStage() {
    const ticker = new Ticker();
    ticker.add(({ deltaTime }) => {
      this.container.y += 5 * deltaTime;
      this.container.rotation += 0.05 * deltaTime;
      if (this.container.y > SCREEN.HEIGHT) {
        ticker.stop();
        this.container.removeFromParent();
        this.monster.destroy();
        this.monsterHit.destroy();
        this.moveTicker.stop();
      }
    });
    ticker.start();
  }


  getX() {
    return this.container.position.x;
  }

  getY() {
    return this.container.position.y;
  }
}

export default Monster;
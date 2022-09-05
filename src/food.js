import Config from "./config.js";
import { getRandomInt } from "./function.js";

export default class Food {
  constructor(width, height) {
    this.config = new Config();
    this.body = { x: 0, y: 0, color: "red" };
    this._width = width || this.config.sizeCell;
    this._height = height || this.config.sizeCell;
    this.randomPosition();
  }

  randomPosition() {
    this.body.x = getRandomInt(0, this.config.sizeGame / this.config.sizeCell);
    this.body.y = getRandomInt(0, this.config.sizeGame / this.config.sizeCell);
  }

  draw(context) {
    context.fillStyle = this.body.color;
    context.fillRect(
      this.body.x * this._width + 1,
      this.body.y * this._height + 1,
      this.config.sizeFood - 1,
      this.config.sizeFood - 1
    );
  }

  setCoords() {
    this.randomPosition();
  }

  getCoords() {
    return this.body;
  }
}

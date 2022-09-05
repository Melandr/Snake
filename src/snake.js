import Config from "./src/config.js";

export default class Snake {
  constructor(width, height, direction) {
    this.config = new Config();
    this._width = width || this.config.sizeCell;
    this._height = height || this.config.sizeCell;
    this.direction = direction || "right";
    this._speed = 1;
    this.body = [
      { x: 2, y: 2, color: "green" }, //head
      { x: 1, y: 2, color: "orange" }, //body
    ];

    this.moveKeys = this.moveKeys.bind(this);
    this.control();
  }

  get snakeLength() {
    return this.body.length;
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
  }

  update(food, canvas) {
    //Движение змейки
    if (this.direction == "right") {
      this.body.unshift({ x: this.body[0].x, y: this.body[0].y, color: "green" });
      this.body[0].x++;
      this.body[1].color = "orange";
    } else if (this.direction == "down") {
      this.body.unshift({ x: this.body[0].x, y: this.body[0].y, color: "green" });
      this.body[0].y++;
      this.body[1].color = "orange";
    } else if (this.direction == "left") {
      this.body.unshift({ x: this.body[0].x, y: this.body[0].y, color: "green" });
      this.body[0].x--;
      this.body[1].color = "orange";
    } else if (this.direction == "top") {
      this.body.unshift({ x: this.body[0].x, y: this.body[0].y, color: "green" });
      this.body[0].y--;
      this.body[1].color = "orange";
    }
    //удаляем хвост змейки
    this.body.pop();

    //проверяем на совпадение с едой
    if (this.body[0].x === food.body.x && this.body[0].y === food.body.y) {
      this.body.push(this.body[this.body.length - 1]);
      food.randomPosition();
    }
    //увеличиваем скорость змейки
    if (this.speed <= this.config.speedUpLimit) {
      this.speed = Math.floor(this.snakeLength / 2 + 1);
    }

    //проверяем на совпадение со стенками
    this.body.forEach((item) => {
      if (item.x >= canvas.element.width / this.config.sizeCell) item.x = 0;
      else if (item.x < 0) item.x = canvas.element.width / this.config.sizeCell;
      if (item.y >= canvas.element.height / this.config.sizeCell) item.y = 0;
      else if (item.y < 0) item.y = canvas.element.width / this.config.sizeCell;
    });

    //проверяем на столкновение головы с туловищем змейки
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
        this.death();
        food.randomPosition();
        this.speed = 1;
      }
    }
  }

  draw(context) {
    // Рисуем змейку
    for (let i = 0; i < this.body.length; ++i) {
      context.fillStyle = this.body[i].color;
      context.fillRect(
        this.body[i].x * this._width + 1,
        this.body[i].y * this._height + 1,
        this.config.sizeCell - 1,
        this.config.sizeCell - 1
      );
    }
  }

  control() {
    document.addEventListener("keydown", this.moveKeys);
  }

  moveKeys(e) {
    //Останавливаем событие, отменяем его действие по умолчанию.
    //На пример, при нажатии на стрелочку вверх мог произойти scroll, но он не произойдет, так как мы его отменили
    e.preventDefault();
    // Если нажата стрелочка вправо
    if (e.key == "ArrowRight" && this.direction !== "left") {
      this.direction = "right"; // Поменяет направление направо 39
    }
    // Если нажата стрелочка вниз
    if (e.key == "ArrowDown" && this.direction !== "top") {
      this.direction = "down"; // Поменяет направление вниз 40
    }
    // Если нажата стрелочка налево
    if (e.key == "ArrowLeft" && this.direction !== "right") {
      this.direction = "left"; // Поменяет направление налево 37
    }
    // Если нажата стрелочка верх
    if (e.key == "ArrowUp" && this.direction !== "down") {
      this.direction = "top"; // Поменяет направление верх 38
    }
  }

  death() {
    this.body = [
      { x: 2, y: 2, color: "green" }, //head
      { x: 1, y: 2, color: "orange" }, //body
    ];
  }
}

import Config from "./config.js";

class Canvas {
  constructor(container) {
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");

    this.config = new Config();
    this.element.width = this.config.sizeGame;
    this.element.height = this.config.sizeGame;

    container.appendChild(this.element);
  }
}

export class CanvasGrid extends Canvas {
  constructor(container) {
    super(container);

    this.element.setAttribute("id", "grid-area");
    this.cellWidth = this.config.sizeCell;
    this.cellHeight = this.config.sizeCell;

    this.drawGrid();
  }

  drawGrid() {
    this.context.save();
    for (let x = 0.5; x <= this.element.width; x += this.cellWidth) {
      if (x == 1) continue;
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.element.height);
    }

    for (var y = 0.5; y < this.element.height; y += this.cellHeight) {
      if (y == 1) continue;
      this.context.moveTo(0, y);
      this.context.lineTo(this.element.width, y);
    }
    // настройка стилей линии.
    this.context.lineWidth = 1;
    this.context.strokeStyle = "green";
    // context.lineJoin = "bevel";
    this.context.stroke();

    // восстанавливаем прежнее состояние контекста.
    this.context.restore();
  }
}

export class CanvasGame extends Canvas {
  constructor(container) {
    super(container);

    this.element.setAttribute("id", "game-area");
  }
}

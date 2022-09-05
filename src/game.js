import Snake from "./src/snake.js";
import Food from "./src/food.js";
import Timer from "./src/timer.js";
import { CanvasGrid, CanvasGame } from "./src/canvas.js";

class Game {
  constructor(container) {
    this.gridField = new CanvasGrid(container);
    this.gameField = new CanvasGame(container);
    this.snake = new Snake();
    this.food = new Food();
    this.status = "stopped"; //stopped, game, paused
  }

  update() {
    this.snake.update(this.food, this.gameField);
  }

  draw() {
    this.gameField.context.clearRect(0, 0, this.gameField.element.width, this.gameField.element.height);

    this.snake.draw(this.gameField.context);
    this.food.draw(this.gameField.context);
  }
}
const game = new Game(document.querySelector(".canvas"));
const gameTimer = new Timer(GameLoop, 1000 - (game.snake.speed + 10) * 50);
gameTimer.clearInterval();

const speedOutput = document.querySelector("#gameSpeed");
const lengthOutput = document.querySelector("#snakeLength");
const startButton = document.querySelector("#startGame");

// document.addEventListener("DOMContentLoaded", drawGrid);
startButton.addEventListener("click", function () {
  if ((game.status = "stopped")) {
    game.status = "game";
    // gameTimer = setInterval(GameLoop, 1000 - (game.snake.speed + 10) * 50);
    gameTimer.setInterval(1000 - (game.snake.speed + 10) * 50);
  }
});

document.addEventListener("keydown", (e) => {
  //Если нажата клавиша Esc
  if (e.key == "Escape" && game.status === "game") {
    game.status = "paused";
    gameTimer.clearInterval();
    document.removeEventListener("keydown", game.snake.moveKeys);
  } else if (e.key == "Escape" && game.status === "paused") {
    game.status = "game";
    gameTimer.setInterval(1000 - (game.snake.speed + 10) * 50);
    document.addEventListener("keydown", game.snake.moveKeys);
  }
});

function GameLoop() {
  game.update();
  game.draw();
  speedOutput.textContent = game.snake.speed;
  lengthOutput.textContent = game.snake.snakeLength;
  gameTimer.setInterval(1000 - (game.snake.speed + 10) * 50);
}

import {
  Number
} from "https://deno.land/x/cliffy@v0.20.1/prompt/mod.ts";

import {
  keypress
} from "https://deno.land/x/cliffy@v0.24.2/keypress/mod.ts";

import { game, solve, Game } from "./index.ts"

const length = await Number.prompt({
  message: "Enter the length of the board:",
  default: 5
});

let currentGame = game(length);
let currentMove = 0;

function print(game: Game) {
  const result = solve(game).map(x => x == -length ? "" : x).map(x => x.toString().padStart(4, " "));
  console.log()
  console.log("%c" + result.join(" | "), "color: gray");
  console.log(game.state
    .map(x => x === 1 ? "X" : "O")
    .map((x, i) => i === currentMove ? "*" + x : x)
    .map(x => x.padStart(4, " "))
    .join(" | ")
  );
  console.log()
}

while (!currentGame.gameOver()) {
  console.clear()
  print(currentGame);
  const event = await keypress();
  if (event.key == "return") {
    currentGame = currentGame.play(currentMove);
  } else if (event.key == "left") {
    currentMove = Math.max(0, currentMove - 1);
  } else if (event.key == "right") {
    currentMove = Math.min(currentGame.size - 1, currentMove + 1);
  }

  if (event.ctrlKey && event.key == "d") {
    Deno.exit(99);
  }

  if (event.ctrlKey && event.key == "c") {
    Deno.exit(0);
  }
}

console.log("Game won!")
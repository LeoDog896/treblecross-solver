import {
  Number
} from "https://deno.land/x/cliffy@v0.20.1/prompt/mod.ts";

import { game, solve, Game } from "./index.ts"

function print(game: Game) {
  console.log(`[ ${game.state.map(x => x === 1 ? "X" : "*").join(" ")} ]`)
}

const length = await Number.prompt({
  message: "Enter the length of the board:",
  default: 5
});

let currentGame = game(length);

while (!currentGame.gameOver()) {
  print(currentGame);
  const move = await Number.prompt({
    message: "Enter a move:",
    validate: (x) => {
      const num = parseInt(x)
      return num >= 0 && num < length && currentGame.canPlay(num)
    }
  });
  currentGame = currentGame.play(move);
}
export interface Game {
  state: number[];
  size: number;
  amountPlayed: number;
  play(x: number | number[]): Game;
  isWinningMove(x: number): boolean;
  gameOver(): boolean;
  canPlay(x: number): boolean;
}

/**
 * Utility function to easily create a new game.
 * @param size The width of the treblecross board.
 * @param state The state of the board (0 is non-filled, 1 is filled).
 */
export function game(size: number, state = new Array(size).fill(0)): Game {
  return {
    state,
    size,
    amountPlayed: state.filter((x) => x === 1).length,
    play(x: number | number[]): Game {
      if (typeof x === "number") {
        // return the same game but with the given move played
        return game(size, state.map((s, i) => i === x ? 1 : s));
      } else {
        return game(size, state.map((s, i) => x.includes(i) ? 1 : s));
      }
    },
    isWinningMove(x: number): boolean {
      const checkedState = this.play(x).state;
      for (let i = 0; i < size; i++) {
        if (
          checkedState[i] === 1 && checkedState[i + 1] === 1 &&
          checkedState[i + 2] === 1
        ) {
          return true;
        }
      }
      return false;
    },
    gameOver(): boolean {
      for (let i = 0; i < size; i++) {
        if (state[i] === 1 && state[i + 1] === 1 && state[i + 2] === 1) {
          return true;
        }
      }
      return false;
    },
    canPlay(x: number): boolean {
      return state[x] === 0;
    },
  };
}

/**
 * Solve a game using the negamax algorithm. Returns a list of numbers determining the best move via score. The higher the score, the better the move.
 * @param game The game to solve
 * @returns A list of numbers with the score of each slot.
 */
export function solve(game: Game): number[] {
  return game.state.map((_, x) => {
    if (game.canPlay(x) && game.isWinningMove(x)) {
      return (game.size + 1 - game.amountPlayed) / 2;
    }

    if (game.canPlay(x)) {
      const newGame = game.play(x);
      return -solve(newGame).reduce((a, b) => Math.max(a, b), -Infinity);
    }

    return -game.size;
  });
}

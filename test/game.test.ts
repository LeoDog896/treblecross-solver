import {
  assert,
  assertEquals,
  assertFalse,
} from "https://deno.land/std@0.149.0/testing/asserts.ts";
import { game } from "../index.ts";

Deno.test("Setting pieces up works", () => {
  assertEquals(game(5).play(0).state, [1, 0, 0, 0, 0]);
  assertEquals(game(5).play(1, 2).state, [0, 1, 1, 0, 0]);
});

Deno.test("Don't fall for simple win conditions", () => {
  assertFalse(game(5).play(0, 1, 3, 4).gameOver());
});

Deno.test("General wins work", () => {
  assert(game(3).play(0, 1, 2).gameOver());
  assert(game(6).play(3, 4, 5).gameOver());
});

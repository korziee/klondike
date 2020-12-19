import { Card } from "@cards-js/common";
import test from "ava";
import { AcesUpGame } from "./AcesUpGame";

test("it should deal four cards to the tableau when the game begins", (t) => {
  const game = new AcesUpGame();

  game.deal();

  t.deepEqual(game.tableau.piles[0].getCards().length, 1);
  t.deepEqual(game.tableau.piles[1].getCards().length, 1);
  t.deepEqual(game.tableau.piles[2].getCards().length, 1);
  t.deepEqual(game.tableau.piles[3].getCards().length, 1);
});

test("it should only deal one card at a time when the game has just started and the user hasn't got a raw of differing suits", (t) => {
  const game = new AcesUpGame();
  game.deal();

  // make the third pile empty
  game.tableau.piles[2].setCards([]);

  game.draw();

  game.tableau.piles.forEach((pile) => t.is(pile.getCards().length, 1));
});

test("it should deal 4 cards at once if the user has already completed the pre start", (t) => {
  const game = new AcesUpGame();
  game.deal();

  game.tableau.piles[0].setCards([new Card().create("Clubs", "Ace", true)]);
  game.tableau.piles[1].setCards([new Card().create("Hearts", "Ace", true)]);
  game.tableau.piles[2].setCards([new Card().create("Spades", "Ace", true)]);
  game.tableau.piles[3].setCards([new Card().create("Diamonds", "Ace", true)]);

  game.draw();

  game.tableau.piles.forEach((pile) => t.is(pile.getCards().length, 2));
});

test("it should not allow a card to be removed unless there is a higher rank of the same suit uncovered in the tableau", (t) => {});

test("it should allow a card to be moved to an empty space", (t) => {});

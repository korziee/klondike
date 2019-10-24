import test from "ava";
import { Card } from "./Card";
import { Foundation } from "./Foundation";

// test all of the foundation piles here

// HeartsFoundationPile validations under here
test.only("can only add incrementing hearts to the HeartsFoundationPile", t => {
  const foundation = new Foundation();
  let cardAdded = foundation.addCard(new Card("Hearts", "7", false));
  t.false(cardAdded);
  cardAdded = foundation.addCard(new Card("Hearts", "Ace", false));
  t.true(cardAdded);
  cardAdded = foundation.addCard(new Card("Hearts", "2", false));
  t.true(cardAdded);
  cardAdded = foundation.addCard(new Card("Hearts", "3", false));
  t.true(cardAdded);
  cardAdded = foundation.addCard(new Card("Spades", "4", false));
  t.false(cardAdded);
});

test.only("can remove cards from the HeartsFoundationPile", t => {
  const foundation = new Foundation();
  foundation.addCard(new Card("Hearts", "Ace", false));
  foundation.addCard(new Card("Hearts", "2", false));
  t.is(foundation.getPileForSuit("Hearts").getCards().length, 2);
  let cardRemoved = foundation.removeCard(new Card("Hearts", "2", false));
  t.true(cardRemoved);
  t.is(foundation.getPileForSuit("Hearts").getCards().length, 1);
});

test.only("cannot remove a card from the HeartsFoundationPile if there are no cards in the pile", t => {
  const foundation = new Foundation();
  let cardRemoved = foundation.removeCard(new Card("Hearts", "7", false));
  t.false(cardRemoved);
});

// test the foundation class here

test("removeCard() actually removes a card from the pile", t => {});

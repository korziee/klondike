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

// test the foundation class here

import test from "ava";
import { TableauPile } from "./TableauPile";
import { Card } from "@cards-js/common";

test("the constructor should turn up the card on the on the top of the stack", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Clubs", "5", false),
    new Card("Clubs", "2", false),
    new Card("Clubs", "Ace", false),
  ];
  const tableauPile = new TableauPile(cards);
  t.is(tableauPile.getCards()[3].getUpturned(), true);
});

test("setCards() should turn up the card on the top of the stack", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Clubs", "5", false),
    new Card("Clubs", "2", false),
    new Card("Clubs", "Ace", false),
  ];
  const tableauPile = new TableauPile([]);
  tableauPile.setCards(cards);
  t.is(tableauPile.getCards()[3].getUpturned(), true);
});

test("cannot remove cards that are not 'upturned'", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Clubs", "5", false),
    new Card("Clubs", "2", false),
    new Card("Clubs", "Ace", true),
  ];
  const tableauPile = new TableauPile(cards);

  // shouldn't matter which order the function receives it in, aslong as they are in order and upturned,etc
  const canRemoveCards = tableauPile.canUserRemoveCards([cards[2], cards[3]]);
  t.false(canRemoveCards);
  tableauPile.removeCards([cards[2], cards[3]]);
  t.is(tableauPile.getCards().length, 4);
});

test("cannot shuffle a tableua pile", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Diamonds", "2", false),
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "8", false),
    new Card("Spades", "9", false),
    new Card("Spades", "King", true),
  ];
  const tableauPile = new TableauPile(cards);
  t.throws(() => {
    tableauPile.shuffle();
  });
  cards.forEach((c, i) => {
    t.deepEqual(tableauPile.getCards()[i], c);
  });
});

/**
 * This ensures that a person cant move the whole pile, only the alternating cards on the pile
 */
test("cannot remove cards that are not alternating", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Diamonds", "3", false),
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "3", true),
    new Card("Diamonds", "2", true),
    new Card("Spades", "Ace", true),
  ];
  const tableauPile = new TableauPile(cards);

  let canRemoveCards;

  // this is fine, these cards are all alternating
  canRemoveCards = tableauPile.canUserRemoveCards([
    cards[cards.length - 1],
    cards[cards.length - 2],
    cards[cards.length - 3],
  ]);

  t.true(canRemoveCards);

  // the last card
  canRemoveCards = tableauPile.canUserRemoveCards([
    cards[cards.length - 1],
    cards[cards.length - 2],
    cards[cards.length - 3],
    cards[cards.length - 4], // this card is not alternating, should not be able to remove
  ]);

  t.false(canRemoveCards);
});

/**
 * Test that you cannot just remove card 1, 6, 10, you must remove card 1,2,3....
 */
test("cannot remove cards that are not sequential", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Diamonds", "2", false),
    new Card("Diamonds", "4", false),
    new Card("Clubs", "3", true),
    new Card("Diamonds", "2", true),
    new Card("Spades", "Ace", true),
  ];
  const tableauPile = new TableauPile(cards);

  // this should be false, because we have skipped removed the 3rd of Clubs
  const canRemoveCards = tableauPile.canUserRemoveCards([
    cards[6],
    cards[5],
    cards[3],
  ]);

  t.false(canRemoveCards);
});

test("after removal of cards, the card on top of the stack is upturned", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", true),
    new Card("Diamonds", "2", true),
    new Card("Spades", "Ace", true),
  ];
  const tableauPile = new TableauPile(cards);

  // first assert that it isn't upturned
  t.is(tableauPile.getCards()[2].getUpturned(), false);

  tableauPile.removeCards([cards[5], cards[3], cards[4]]);

  t.is(tableauPile.getCards()[2].getUpturned(), true);
});

test("cannot add cards that are not alternating and sequential", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", false),
    new Card("Diamonds", "2", false),
    new Card("Spades", "8", true),
  ];
  const tableauPile = new TableauPile(cards);

  const canAddCards = tableauPile.canUserAddCards([
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Hearts", "8", false),
  ]);

  t.false(canAddCards);
});

test("cannot add cards that are not alternating and sequential #2", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", false),
    new Card("Diamonds", "2", false),
    new Card("Spades", "8", true),
  ];
  const tableauPile = new TableauPile(cards);

  const canAddCards = tableauPile.canUserAddCards([
    new Card("Hearts", "9", true),
  ]);

  t.false(canAddCards);
});

test("cannot add cards even if it just one card", (t) => {
  const tableauPile = new TableauPile([
    new Card("Spades", "King", false),
    new Card("Hearts", "Queen", false),
    new Card("Spades", "Jack", false),
    new Card("Diamonds", "King", true),
  ]);

  const cardToPlace = new Card("Hearts", "4", true);
  t.is(tableauPile.canUserAddCards([cardToPlace]), false);
});

test("cannot add cards that are not alternating and sequential even if the first card is sequential and alternating", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", false),
    new Card("Diamonds", "2", false),
    new Card("Spades", "8", true),
  ];
  const tableauPile = new TableauPile(cards);

  const canAddCards = tableauPile.canUserAddCards([
    new Card("Hearts", "7", true),
    new Card("Hearts", "6", true),
    new Card("Hearts", "5", true),
  ]);

  t.false(canAddCards);
});

test("cannot add cards that are not all upturned", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", false),
    new Card("Diamonds", "2", false),
    new Card("Spades", "8", true),
  ];
  const tableauPile = new TableauPile(cards);

  const canAddCards = tableauPile.canUserAddCards([
    new Card("Hearts", "7", false),
    // should fail, even though one card is upturned
    new Card("Spades", "6", true),
    new Card("Hearts", "5", false),
  ]);

  t.false(canAddCards);
});

test("cannot add cards that are all the same suit", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", false),
    new Card("Diamonds", "2", false),
    new Card("Spades", "8", true),
  ];
  const tableauPile = new TableauPile(cards);

  const canAddCards = tableauPile.canUserAddCards([
    new Card("Hearts", "7", true),
    new Card("Hearts", "6", true),
    new Card("Hearts", "5", true),
  ]);

  t.false(canAddCards);
});

test("only kings can be placed on an empty TableauPile", (t) => {
  const tableauPile = new TableauPile([]);

  let canAddCards;

  canAddCards = tableauPile.canUserAddCards([new Card("Hearts", "7", true)]);
  t.false(canAddCards);
  canAddCards = tableauPile.canUserAddCards([
    new Card("Hearts", "Queen", true),
  ]);
  t.false(canAddCards);
  canAddCards = tableauPile.canUserAddCards([new Card("Hearts", "Ace", true)]);
  t.false(canAddCards);
  canAddCards = tableauPile.canUserAddCards([new Card("Hearts", "King", true)]);
  t.true(canAddCards);
});

test("any suit of kings can be placed on an empty TableauPile", (t) => {
  const tableauPile = new TableauPile([]);

  let canAddCards;
  canAddCards = tableauPile.canUserAddCards([new Card("Hearts", "King", true)]);
  t.true(canAddCards);
  canAddCards = tableauPile.canUserAddCards([new Card("Spades", "King", true)]);
  t.true(canAddCards);
  canAddCards = tableauPile.canUserAddCards([new Card("Clubs", "King", true)]);
  t.true(canAddCards);
  canAddCards = tableauPile.canUserAddCards([
    new Card("Diamonds", "King", true),
  ]);
  t.true(canAddCards);
});

test("can remove cards that are sequential and alternating suit", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Diamonds", "3", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", true),
    new Card("Diamonds", "2", true),
    new Card("Spades", "Ace", true),
  ];
  const tableauPile = new TableauPile(cards);

  tableauPile.removeCards([cards[6], cards[5], cards[4]]);

  t.is(tableauPile.getCards().length, cards.length - 3);

  t.deepEqual(
    tableauPile.getCards()[tableauPile.getCards().length - 1],
    // should also be upturned
    new Card("Spades", "10", true)
  );
});

test("can add cards to the pile if they are alternating and sequential", (t) => {
  const tableauPile = new TableauPile([]);

  const cardsToAdd = [
    new Card("Hearts", "King", true),
    new Card("Clubs", "Queen", true),
    new Card("Hearts", "Jack", true),
    new Card("Clubs", "10", true),
    new Card("Hearts", "9", true),
  ];

  const canAddCards = tableauPile.canUserAddCards(cardsToAdd);
  t.true(canAddCards);
  tableauPile.addCards(cardsToAdd);
  t.deepEqual(tableauPile.getCards(), cardsToAdd);
});

test("addCards() adds card to the pile in the correct order", (t) => {
  const tableauPile = new TableauPile([]);

  const cardsToAdd = [
    new Card("Hearts", "King", true),
    new Card("Clubs", "Queen", true),
    new Card("Hearts", "Jack", true),
    new Card("Clubs", "10", true),
    new Card("Hearts", "9", true),
  ];

  tableauPile.addCards(cardsToAdd);

  cardsToAdd.forEach((card, i) => {
    t.deepEqual(tableauPile.getCards()[i], card);
  });
});

test("removeCards() is order agnostic", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Spades", "10", false),
    new Card("Clubs", "3", true),
    new Card("Diamonds", "2", true),
    new Card("Spades", "Ace", true),
  ];
  const tableauPile = new TableauPile(cards);

  tableauPile.removeCards([cards[3], cards[5], cards[4]]);

  t.is(tableauPile.getCards().length, cards.length - 3);
});

test("addCards() is order agnostic", (t) => {
  const tableauPile = new TableauPile([]);

  const cardsToAdd = [
    new Card("Clubs", "10", true),
    new Card("Clubs", "Queen", true),
    new Card("Hearts", "9", true),
    new Card("Hearts", "Jack", true),
    new Card("Hearts", "King", true),
  ];

  tableauPile.addCards(cardsToAdd);

  t.deepEqual(tableauPile.getCards(), [
    new Card("Hearts", "King", true),
    new Card("Clubs", "Queen", true),
    new Card("Hearts", "Jack", true),
    new Card("Clubs", "10", true),
    new Card("Hearts", "9", true),
  ]);

  t.is(tableauPile.getCards().length, 5);
});

test("Cannot remove cards that do not exist on the pile", (t) => {
  const cards = [
    new Card("Clubs", "9", false),
    new Card("Hearts", "5", false),
    new Card("Diamonds", "2", false),
    new Card("Diamonds", "4", false),
    new Card("Clubs", "3", true),
    new Card("Diamonds", "2", true),
    new Card("Spades", "Ace", true),
  ];
  const tableauPile = new TableauPile(cards);

  const canRemoveCards = tableauPile.canUserRemoveCards([
    cards[6],
    cards[5],
    // hearts of 4 doesn't exist
    new Card("Hearts", "4", true),
  ]);

  t.false(canRemoveCards);
});

// propably don't need to do this at extends pile and does not overwrite the serialize/unserialize
// test("serialize() returns the correct data", t => {});

// test("unserialize() returns a FoundationPile with the correct data", t => {});

import test from "ava";
import { FoundationPile } from "./FoundationPile";
import { Card } from "./Card";

test("can only add incrementing cards of the same suit", t => {
  const foundationPile = new FoundationPile("Clubs");
  foundationPile.addCards([new Card("Clubs", "Ace", false)]);
  t.is(foundationPile.getCards().length, 1);
  foundationPile.addCards([new Card("Clubs", "2", false)]);
  t.is(foundationPile.getCards().length, 2);
  foundationPile.addCards([new Card("Clubs", "5", false)]);
  t.is(foundationPile.getCards().length, 2);
  foundationPile.addCards([new Card("Clubs", "3", false)]);
  t.is(foundationPile.getCards().length, 3);
  foundationPile.addCards([new Card("Hearts", "3", false)]);
  t.is(foundationPile.getCards().length, 3);
});

test("cannot add cards with a different suit to the suit configured", t => {
  const foundationPile = new FoundationPile("Clubs");
  foundationPile.addCards([new Card("Clubs", "Ace", false)]);
  foundationPile.addCards([new Card("Hearts", "2", false)]);
  foundationPile.addCards([new Card("Hearts", "10", false)]);
  foundationPile.addCards([new Card("Hearts", "Ace", false)]);
  foundationPile.addCards([new Card("Hearts", "3", false)]);
  t.is(foundationPile.getCards().length, 1);
});

test("Cannot remove card if it is a different suit", t => {
  const foundationPile = new FoundationPile("Clubs");
  foundationPile.addCards([
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "2", false)
  ]);
  const canRemoveCard = foundationPile.canRemoveCards([
    new Card("Hearts", "Ace", false)
  ]);
  t.is(canRemoveCard, false);
  foundationPile.removeCards([new Card("Hearts", "Ace", false)]);
  t.is(foundationPile.getCards().length, 2);
});

test("Cannot remove card if the pile is empty", t => {
  const foundationPile = new FoundationPile("Clubs");
  const canRemoveCard = foundationPile.canRemoveCards([
    new Card("Clubs", "Ace", false)
  ]);
  t.is(canRemoveCard, false);
  foundationPile.removeCards([new Card("Clubs", "Ace", false)]);
  t.is(foundationPile.getCards().length, 0);
});

test("Cannot remove more than one card at a time", t => {
  const foundationPile = new FoundationPile("Clubs");
  foundationPile.addCards([
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "2", false)
  ]);
  const canRemoveCards = foundationPile.canRemoveCards([
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "2", false)
  ]);
  t.is(canRemoveCards, false);
  foundationPile.removeCards([
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "2", false)
  ]);
  t.is(foundationPile.getCards().length, 2);
});

test("Cannot remove a card that is not on the top of the pile", t => {
  const foundationPile = new FoundationPile("Clubs");
  foundationPile.addCards([
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "2", false),
    new Card("Clubs", "3", false),
    new Card("Clubs", "4", false),
    new Card("Clubs", "5", false)
  ]);
  const canRemoveCard = foundationPile.canRemoveCards([
    new Card("Clubs", "2", false)
  ]);

  t.is(canRemoveCard, false);

  foundationPile.removeCards([new Card("Clubs", "2", false)]);

  t.is(foundationPile.getCards().length, 5);
});

// TODO - actually test removing smh

test("serialize returns correct suit", t => {
  const foundationPile = new FoundationPile("Clubs");
  foundationPile.addCards([
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "2", false),
    new Card("Clubs", "3", false)
  ]);
  const serialized = foundationPile.serialize();

  t.deepEqual(serialized.suit, "Clubs");
});

test("serialize returns the correct cards", t => {
  const foundationPile = new FoundationPile("Clubs");
  const cards = [
    {
      suit: "Clubs",
      rank: "Ace",
      upturned: false
    },
    {
      suit: "Clubs",
      rank: "2",
      upturned: false
    },
    {
      suit: "Clubs",
      rank: "3",
      upturned: false
    }
  ];
  foundationPile.addCards(
    cards.map(c => new Card(c.suit as any, c.rank as any, c.upturned))
  );
  const serialized = foundationPile.serialize();

  const exists = serialized.cards.every(card => {
    // TODO - replace with deep equal
    const existsInArray = cards.find(c => card.rank === c.rank);
    return typeof existsInArray !== "undefined";
  });

  t.is(exists, true);
});

test("serialize returns the correct cards in the correct order", t => {
  const foundationPile = new FoundationPile("Clubs");
  const cards = [
    {
      suit: "Clubs",
      rank: "Ace",
      upturned: false
    },
    {
      suit: "Clubs",
      rank: "2",
      upturned: false
    },
    {
      suit: "Clubs",
      rank: "3",
      upturned: false
    }
  ];
  foundationPile.addCards(
    cards.map(c => new Card(c.suit as any, c.rank as any, c.upturned))
  );
  const serialized = foundationPile.serialize();

  const allAreInOrder = serialized.cards.every((card, i) => {
    // TODO - replace with deep equal
    return cards[i].rank === card.rank;
  });

  t.is(allAreInOrder, true);
});

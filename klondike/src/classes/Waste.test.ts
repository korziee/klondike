import test from "ava";
import { Waste } from "./Waste";
import { getRandomCards } from "@cards-js/common";

test("the constructor throws if all cards are not turned up", (t) => {
  const cards = getRandomCards(10).map((c) => {
    c.turnUp();
    return c;
  });
  cards[5].turnDown();
  t.throws(() => {
    const waste = new Waste(cards);
  });

  cards[5].turnUp();

  t.notThrows(() => {
    const waste = new Waste(cards);
  });
});

test("cards can be added once at a time", (t) => {
  const cards = getRandomCards(10).map((c) => {
    c.turnUp();
    return c;
  });

  const waste = new Waste([]);
  const canAddCards = waste.canUserAddCards([cards[1]]);
  t.true(canAddCards);
  waste.addCards([cards[1]]);
  t.deepEqual(waste.getCards(), [cards[1]]);
});

test("cards can be added three at a time", (t) => {
  const cards = getRandomCards(10).map((c) => {
    c.turnUp();
    return c;
  });

  const waste = new Waste([]);
  const canAddCards = waste.canUserAddCards([cards[1], cards[7]]);
  t.true(canAddCards);
  waste.addCards([cards[1], cards[7]]);
  t.deepEqual(waste.getCards(), [cards[1], cards[7]]);
});

test("only cards that are upturned can be added", (t) => {
  const cards = getRandomCards(10).map((c) => {
    c.turnUp();
    return c;
  });
  cards[1].turnDown();

  const waste = new Waste([]);
  t.false(waste.canUserAddCards([cards[1], cards[7]]));
  t.false(waste.canUserAddCards([cards[1]]));
  t.true(waste.canUserAddCards([cards[6]]));
});

test("only the top card can be removed", (t) => {
  const cards = getRandomCards(10).map((c) => {
    c.turnUp();
    return c;
  });

  const waste = new Waste(cards);
  t.false(waste.canUserRemoveCards([cards[1], cards[7]]));
  t.false(waste.canUserRemoveCards([cards[6]]));
  t.true(waste.canUserRemoveCards([cards[9]]));
});

test("serialize() returns the correct data", (t) => {
  const cards = getRandomCards(10).map((c) => {
    c.turnUp();
    return c;
  });
  const waste = new Waste(cards);
  t.deepEqual(
    waste.serialize().cards,
    cards.map((c) => c.serialize())
  );
});

test("unserialize() returns an instance of Waste ", (t) => {
  const cards = getRandomCards(10)
    .map((c) => {
      c.turnUp();
      return c;
    })
    .map((c) => c.serialize());
  const waste = Waste.unserialize({ cards });
  t.true(waste instanceof Waste);
});

test("unserialize() inserts the correct data", (t) => {
  const cards = getRandomCards(10).map((c) => {
    c.turnUp();
    return c;
  });
  const waste = Waste.unserialize({ cards: cards.map((c) => c.serialize()) });
  t.deepEqual(waste.getCards(), cards);
});

import test from "ava";
import { Card } from "./Card";

test("Can instanstiate the constructor", t => {
  new Card("Clubs", "1", false);
  t.pass();
});

test("getSuit() returns the correct suit", t => {
  const card = new Card("Hearts", "King", false);

  t.is(card.getSuit(), "Hearts");
});

test("getRank() returns the correct rank", t => {
  const card = new Card("Hearts", "King", false);

  t.is(card.getRank(), "King");
});

test("getUpturned() returns the correct value", t => {
  const card = new Card("Hearts", "King", false);

  t.is(card.getUpturned(), false);
});

test("turnUp() changes the upturned state", t => {
  const card = new Card("Hearts", "King", false);
  t.is(card.getUpturned(), false);
  card.turnUp();
  t.is(card.getUpturned(), true);
});

test("turnDown() changes the upturned state", t => {
  const card = new Card("Hearts", "King", true);
  t.is(card.getUpturned(), true);
  card.turnDown();
  t.is(card.getUpturned(), false);
});

test("calling turnDown() multiple times does not have any effect", t => {
  const card = new Card("Hearts", "King", true);
  t.is(card.getUpturned(), true);

  card.turnDown();
  t.is(card.getUpturned(), false);
  card.turnDown();
  t.is(card.getUpturned(), false);
  card.turnDown();
  t.is(card.getUpturned(), false);
  card.turnDown();
  t.is(card.getUpturned(), false);
  card.turnDown();
  t.is(card.getUpturned(), false);
});

test("calling turnUp() multiple times does not have any effect", t => {
  const card = new Card("Hearts", "King", false);
  t.is(card.getUpturned(), false);

  card.turnUp();
  t.is(card.getUpturned(), true);
  card.turnUp();
  t.is(card.getUpturned(), true);
  card.turnUp();
  t.is(card.getUpturned(), true);
  card.turnUp();
  t.is(card.getUpturned(), true);
  card.turnUp();
  t.is(card.getUpturned(), true);
});

test("serialize() returns the correct serialized state", t => {
  const card = new Card("Hearts", "King", true);
  t.deepEqual(card.serialize(), {
    suit: "Hearts",
    rank: "King",
    upturned: true
  });
});

test("unserialize() returns a working class with the right data", t => {
  const card = Card.unserialize({ rank: "5", suit: "Spades", upturned: true });
  t.is(card.getRank(), "5");
  t.is(card.getSuit(), "Spades");
  t.is(card.getUpturned(), true);
});

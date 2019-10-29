import test from "ava";
import { Stock } from "./Stock";
import { Card } from "./Card";
import { getRandomSuit } from "../helpers/getRandomSuit";
import { getRandomRank } from "../helpers/getRandomRank";

const getRandomCards = (amount: number): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < amount; i += 1) {
    const randomSuit = getRandomSuit();
    const randomRank = getRandomRank();
    cards.push(new Card(randomSuit, randomRank, false));
  }

  return cards;
};

test("the constructor throws if all cards are not turned down", t => {
  const cards = getRandomCards(10);
  cards[1].turnUp();
  t.throws(() => {
    const stock = new Stock(cards);
  });

  cards[1].turnDown();

  t.notThrows(() => {
    const stock = new Stock(cards);
  });
});

test("cards cannot be added, an error is thrown", t => {
  const cards = getRandomCards(10);
  const stock = new Stock(cards);

  t.throws(() => {
    stock.addCards([cards[2], cards[6]]);
  });
});

test("cards can be set", t => {
  const cards = getRandomCards(10);
  const stock = new Stock([]);

  t.is(stock.getCards().length, 0);

  stock.setCards(cards);

  t.deepEqual(stock.getCards(), cards);
});

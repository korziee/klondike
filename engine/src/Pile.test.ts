import test from "ava";
import { Pile } from "./Pile";
import { Card } from "./Card";
import { getRandomSuit } from "./helpers/getRandomSuit";
import { getRandomRank } from "./helpers/getRandomRank";

const getRandomCards = (amount: number): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < amount; i += 1) {
    const randomSuit = getRandomSuit();
    const randomRank = getRandomRank();
    cards.push(new Card(randomSuit, randomRank, Math.random() > 0.5));
  }

  return cards;
};

test("Can instanstiate the constructor", t => {
  const cards = getRandomCards(10);
  new Pile(cards);
  t.pass();
});

test("getCards() returns the cards passed to the class in the correct order", t => {
  const cards = getRandomCards(10);
  const pile = new Pile(cards);
  const cardsInPile = pile.getCards();

  cards.forEach((card, i) => t.is(card, cardsInPile[i]));
});

test("setCards() sets cards correctly", t => {
  const cards = getRandomCards(10);
  const pile = new Pile([]);

  t.is(pile.getCards().length, 0);
  pile.setCards([cards[0], cards[6]]);

  const cardsInPile = pile.getCards();

  t.is(cardsInPile[0], cards[0]);
  t.is(cardsInPile[1], cards[6]);
});

test("setCards() overwrites the existing cards", t => {
  const cards = getRandomCards(10);
  const pile = new Pile(cards);
  const cardsInPileBeforeSet = pile.getCards();
  cards.forEach((card, i) => t.is(card, cardsInPileBeforeSet[i]));

  const newCards = getRandomCards(10);
  pile.setCards(newCards);

  const cardsInPile = pile.getCards();

  newCards.forEach((card, i) => t.is(card, cardsInPile[i]));
});

test("addCards() adds cards", t => {
  const cards = getRandomCards(2);
  const pile = new Pile([]);

  pile.addCards(cards);

  const cardsInPile = pile.getCards();

  cards.forEach((card, i) => t.is(card, cardsInPile[i]));
});

test("addCards() adds to the exists cards", t => {
  const cards = getRandomCards(2);
  const pile = new Pile(cards);

  const additionalCards = getRandomCards(2);
  pile.addCards(additionalCards);

  const cardsInPile = pile.getCards();

  cards.forEach((card, i) => t.is(card, cardsInPile[i]));
  additionalCards.forEach((card, i) => t.is(card, cardsInPile[i + 2]));
});

test("removeCards() removes the correct amount of cards", t => {
  const cards = getRandomCards(50);
  const pile = new Pile(cards);

  t.is(pile.getCards().length, 50);

  pile.removeCards(5);

  t.is(pile.getCards().length, 45);
});

test("removeCards() removes cards from the top of the stack", t => {
  const cards = getRandomCards(10);
  const pile = new Pile(cards);
  pile.removeCards(2);
  const cardsInPile = pile.getCards();

  for (let i = 0; i < 8; i += 1) {
    t.is(cardsInPile[i], cards[i]);
  }
});

test("removeCards() returns the cards removed in the correct order", t => {
  const cards = getRandomCards(10);
  const pile = new Pile(cards);
  const removedCards = pile.removeCards(2);
  t.is(removedCards[0], cards[8]);
  t.is(removedCards[1], cards[9]);
});

test("clear() removes all cards", t => {
  const cards = getRandomCards(52);
  const pile = new Pile(cards);
  t.is(pile.getCards().length, 52);
  pile.clear();
  t.is(pile.getCards().length, 0);
});

test("clear() returns the cleared cards in the correct order", t => {
  const cards = getRandomCards(52);
  const pile = new Pile(cards);
  t.is(pile.getCards().length, 52);

  const clearedCards = pile.clear();
  t.is(pile.getCards().length, 0);

  cards.forEach((card, i) => t.is(card, clearedCards[i]));
});

// there is no hard and fast math in this test
// it just test that atleast 5 out of 52 cards, do not match the original
test("shuffle() shuffles the cards within the pile", t => {
  const cards = getRandomCards(52);
  const pile = new Pile(cards);

  pile.shuffle();

  const differentCount = pile
    .getCards()
    .map((c, i) => c === cards[i])
    .filter(r => r);

  t.true(differentCount.length < 5);
});

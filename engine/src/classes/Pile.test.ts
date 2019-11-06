import test from "ava";
import { Pile } from "./Pile";
import { Card } from "./Card";
import { getRandomSuit } from "../helpers/getRandomSuit";
import { getRandomRank } from "../helpers/getRandomRank";
import { getSerializedDeck } from "../helpers/getSerializedDeck";
import { shuffle } from "@korziee/helpers";
import * as _ from "lodash";

/**
 * Returns a pile with the abstract methods implemented
 */
const getPileForTesting = (cards: Card[]) => {
  class TestPile extends Pile {
    canRemoveCards() {
      return true;
    }
    canAddCards() {
      return true;
    }
    canSetCards() {
      return true;
    }
  }
  return new TestPile(cards);
};

const getRandomCards = (amount: number): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < amount; i += 1) {
    const randomSuit = getRandomSuit();
    const randomRank = getRandomRank();
    cards.push(new Card(randomSuit, randomRank, Math.random() > 0.5));
  }

  return cards;
};

const getDeckOfCards = (): Card[] => {
  return getSerializedDeck().map(c => new Card(c.suit, c.rank, c.upturned));
};

/**
 * Function can get expensive
 */
const getUniqueCards = (amount: number): Card[] => {
  if (amount > 52) {
    throw new Error("cannot generate more than 52 unique cards");
  }
  const shuffledDeck = _.shuffle(getDeckOfCards());
  return shuffledDeck.slice(0, amount);
};

test("Can instanstiate the constructor", t => {
  const cards = getRandomCards(10);
  getPileForTesting(cards);
  t.pass();
});

test("getCards() returns the cards passed to the class in the correct order", t => {
  const cards = getRandomCards(10);
  const pile = getPileForTesting(cards);
  const cardsInPile = pile.getCards();

  cards.forEach((card, i) => t.is(card, cardsInPile[i]));
});

test("setCards() sets cards correctly", t => {
  const cards = getRandomCards(10);
  const pile = getPileForTesting([]);

  t.is(pile.getCards().length, 0);
  pile.setCards([cards[0], cards[6]]);

  const cardsInPile = pile.getCards();

  t.is(cardsInPile[0], cards[0]);
  t.is(cardsInPile[1], cards[6]);
});

test("setCards() overwrites the existing cards", t => {
  const cards = getRandomCards(10);
  const pile = getPileForTesting(cards);
  const cardsInPileBeforeSet = pile.getCards();
  cards.forEach((card, i) => t.is(card, cardsInPileBeforeSet[i]));

  const newCards = getRandomCards(10);
  pile.setCards(newCards);

  const cardsInPile = pile.getCards();

  newCards.forEach((card, i) => t.is(card, cardsInPile[i]));
});

test("addCards() adds cards", t => {
  const cards = getRandomCards(2);
  const pile = getPileForTesting([]);

  pile.addCards(cards);

  const cardsInPile = pile.getCards();

  cards.forEach((card, i) => t.is(card, cardsInPile[i]));
});

test("addCards() adds to the exists cards", t => {
  const cards = getRandomCards(2);
  const pile = getPileForTesting(cards);

  const additionalCards = getRandomCards(2);
  pile.addCards(additionalCards);

  const cardsInPile = pile.getCards();

  cards.forEach((card, i) => t.is(card, cardsInPile[i]));
  additionalCards.forEach((card, i) => t.is(card, cardsInPile[i + 2]));
});

test("removeCards() removes the correct amount of cards", t => {
  const cards = getUniqueCards(50);

  const pile = getPileForTesting(cards);

  pile.removeCards([cards[10], cards[20], cards[30], cards[40]]);

  t.is(pile.getCards().length, 46);
});

test("removeCards() returns a true if the removal was achieved", t => {
  const cards = getUniqueCards(50);

  const pile = getPileForTesting(cards);

  const didRemove = pile.removeCards([
    cards[10],
    cards[20],
    cards[30],
    cards[40]
  ]);

  t.is(pile.getCards().length, 46);
  t.true(didRemove);
});

test("removeCards() returns false if the removal was unsuccesful", t => {
  const cards = getUniqueCards(50);

  class PileWithFailingValidation extends Pile {
    canRemoveCards() {
      return false;
    }
  }

  const pile = new PileWithFailingValidation(cards);

  const didRemove = pile.removeCards([
    cards[10],
    cards[20],
    cards[30],
    cards[40]
  ]);
  t.false(didRemove);
});

test("removeCards() ignores the 'upturned' state of a Card", t => {
  const cards = getDeckOfCards().map(c => {
    Math.random() > 0.5 ? c.turnUp() : c.turnDown();
    return c;
  });

  const pile = getPileForTesting(cards);

  pile.removeCards([cards[10], cards[20], cards[30], cards[40]]);

  t.is(pile.getCards().length, 48);
});

test("removeCards() removes the correct cards", t => {
  const cards = getDeckOfCards();

  const pile = getPileForTesting(cards);

  pile.removeCards([cards[10], cards[20], cards[30], cards[40]]);

  // deleted one, so it should shift down one!
  t.deepEqual(cards[11], pile.getCards()[10]);

  // deleted TWO, so it should shift down two!
  t.deepEqual(cards[22], pile.getCards()[20]);

  // deleted THREE, so it should shift down three!
  t.deepEqual(cards[33], pile.getCards()[30]);

  t.deepEqual(cards[44], pile.getCards()[40]);

  t.is(pile.getCards().length, 48);
});

test("clear() removes all cards", t => {
  const cards = getRandomCards(52);
  const pile = getPileForTesting(cards);
  t.is(pile.getCards().length, 52);
  pile.clear();
  t.is(pile.getCards().length, 0);
});

test("clear() returns the cleared cards in the correct order", t => {
  const cards = getRandomCards(52);
  const pile = getPileForTesting(cards);
  t.is(pile.getCards().length, 52);

  const clearedCards = pile.clear();
  t.is(pile.getCards().length, 0);

  cards.forEach((card, i) => t.is(card, clearedCards[i]));
});

test("serialize() returns the correct serialized state", t => {
  const cards = getRandomCards(5);
  const pile = getPileForTesting(cards);
  const serializedPile = pile.serialize();

  for (let i = 0; i < 5; i += 1) {
    t.deepEqual(serializedPile.cards[i], cards[i].serialize());
  }
});

test("unserialize() returns a working class with the right data", t => {
  const pile = Pile.unserialize({
    cards: [
      { rank: "5", suit: "Spades", upturned: true },
      { rank: "10", suit: "Hearts", upturned: true }
    ]
  });
  t.is(pile.getCards()[0].getRank(), "5");
  t.is(pile.getCards()[0].getSuit(), "Spades");
  t.is(pile.getCards()[1].getSuit(), "Hearts");
  t.is(pile.getCards()[1].getUpturned(), true);
});

test("canRemoveCards() throws if unimplemented", t => {
  t.throws(() => new Pile([]).canRemoveCards([]));
});

test("canAddCards() throws if unimplemented", t => {
  t.throws(() => new Pile([]).canAddCards([]));
});

test("canSetCards() throws if unimplemented", t => {
  t.throws(() => new Pile([]).canSetCards([]));
});

test("addCards() does not add cards if the validation fails", t => {
  class PileWithFailingValidation extends Pile {
    canAddCards() {
      return false;
    }
  }

  const pile = new PileWithFailingValidation([]);

  pile.addCards([new Card("Clubs", "Ace", false)]);
  pile.addCards([new Card("Clubs", "2", false)]);
  pile.addCards([new Card("Hearts", "Ace", false)]);

  t.is(pile.getCards().length, 0);
});

test("removeCards() does not remove cards if the validation fails", t => {
  class PileWithFailingValidation extends Pile {
    canRemoveCards() {
      return false;
    }
  }

  const pile = new PileWithFailingValidation([
    new Card("Clubs", "Ace", false),
    new Card("Clubs", "2", false)
  ]);

  pile.removeCards([new Card("Clubs", "Ace", false)]);
  pile.removeCards([new Card("Clubs", "2", false)]);

  t.is(pile.getCards().length, 2);
});
// there is no hard and fast math in this test
// it just test that atleast 10 out of 52 cards, do not match the original
test("shuffle() shuffles the cards within the pile", t => {
  const cards = getDeckOfCards();
  const pile = getPileForTesting(cards);

  pile.shuffle();

  const equalCount = pile.getCards().filter((c, i) => _.isEqual(c, cards[i]));

  t.true(equalCount.length < 10);
});

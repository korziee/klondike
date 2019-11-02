import test from "ava";
import { KlondikeGame, ISerializedKlondikeGame, IMove } from "./KlondikeGame";
import { Card } from "./Card";
import { getSerializedDeck } from "../helpers/getSerializedDeck";
import * as _ from "lodash";
import { TableauPile } from "./TableauPile";
import { Foundation } from "./Foundation";
import { FoundationPile } from "./FoundationPile";

const getEmptySerializedGame = (): ISerializedKlondikeGame => ({
  foundation: {
    clubs: {
      suit: "Clubs",
      cards: []
    },
    hearts: {
      suit: "Hearts",
      cards: []
    },
    diamonds: {
      suit: "Diamonds",
      cards: []
    },
    spades: {
      suit: "Spades",
      cards: []
    }
  },
  stock: {
    cards: []
  },
  history: [],
  waste: {
    cards: []
  },
  tableau: {
    piles: [
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] }
    ]
  }
});

test("getHistory() returns the correct history", t => {});
test("history is modified on every successful move", t => {});
test("getHistory() returns the correct history in order", t => {});
test("getHints() returns the correct hints if they exist", t => {});
test("getHints() returns null if no hints exist", t => {});

test("reset() returns all cards to the stock", t => {
  const game = new KlondikeGame();

  game.reset();

  t.is(game.stock.getCards().length, 52);
});

test("reset() shuffles all cards after they are in th stock", t => {
  const game = new KlondikeGame();

  let cardsInOrderCount = 0;

  const deckInOrder = getSerializedDeck();

  game.reset();

  game.stock.getCards().forEach((card, i) => {
    const equal = _.isEqual(card.serialize(), deckInOrder[i]);
    if (equal) {
      cardsInOrderCount += 1;
    }
  });

  t.true(cardsInOrderCount < 10);
});

// initial game state
test("7 tableau piles exist on the board", t => {
  const game = new KlondikeGame();
  for (let i = 1; i <= 7; i += 1) {
    t.true(game.tableau.getTableauPile(i) instanceof TableauPile);
  }
});
test("each tableau pile has the correct amount of cards at the beginning (1 for the 1st, 2 for the 2nd, etc)", t => {
  const game = new KlondikeGame();
  for (let i = 1; i <= 7; i += 1) {
    t.is(game.tableau.getTableauPile(i).getCards().length, i);
  }
});
test("4 foundation piles exist on the board", t => {
  const game = new KlondikeGame();
  t.true(game.foundation.getPileForSuit("Clubs") instanceof FoundationPile);
  t.true(game.foundation.getPileForSuit("Hearts") instanceof FoundationPile);
  t.true(game.foundation.getPileForSuit("Spades") instanceof FoundationPile);
  t.true(game.foundation.getPileForSuit("Diamonds") instanceof FoundationPile);
});

test("the foundation is empty at the beginning", t => {
  const game = new KlondikeGame();
  t.is(game.foundation.getPileForSuit("Clubs").getCards().length, 0);
  t.is(game.foundation.getPileForSuit("Hearts").getCards().length, 0);
  t.is(game.foundation.getPileForSuit("Spades").getCards().length, 0);
  t.is(game.foundation.getPileForSuit("Diamonds").getCards().length, 0);
});

test("the waste is empty at the beginning of the game", t => {
  const game = new KlondikeGame();
  t.is(game.waste.getCards().length, 0);
});

test("the stock has 24 cards in it the beginning", t => {
  const game = new KlondikeGame();
  t.is(game.stock.getCards().length, 24);
});

test("once the stock has been all pushed into the waste, the next time a move is made from the stock to the waste, the cards should be moved over to the stock again and the waste should be empty", t => {
  const gameState = getEmptySerializedGame();

  gameState.waste.cards.push({
    suit: "Clubs",
    rank: "Ace",
    upturned: true
  });

  gameState.stock.cards.push({
    suit: "Hearts",
    rank: "Queen",
    upturned: false
  });

  const game = KlondikeGame.unserialize(gameState);

  // now the stock is empty
  game.draw();
  t.is(game.waste.getCards().length, 2);
  t.is(game.stock.getCards().length, 0);

  // all the cards should be moved back into the stock
  game.draw();

  t.is(game.stock.getCards().length, 2);
  t.is(game.waste.getCards().length, 0);

  // the first card should be put into the waste
  game.draw();

  t.is(game.stock.getCards().length, 1);
  t.is(game.waste.getCards().length, 1);
});

test("cannot move a card to the waste from the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.tableau.piles[0].cards.push({
    suit: "Clubs",
    rank: "Ace",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "tableau",
    to: "waste",
    cards: [Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })],
    meta: {
      fromPile: 1
    }
  });

  t.false(canMakeMove);
});

test("cannot move a card to the waste from the foundation", t => {
  const gameState = getEmptySerializedGame();

  gameState.foundation.clubs.cards.push({
    suit: "Clubs",
    rank: "Ace",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "foundation",
    to: "waste",
    cards: [Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })]
  });

  t.false(canMakeMove);
});

test("cannot move a card to the stock from the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.tableau.piles[0].cards.push({
    suit: "Clubs",
    rank: "Ace",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "tableau",
    to: "stock",
    cards: [Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })],
    meta: {
      fromPile: 1
    }
  });

  t.false(canMakeMove);
});

test("cannot move a card to the stock from the waste", t => {
  const gameState = getEmptySerializedGame();

  gameState.waste.cards.push({ suit: "Clubs", rank: "Ace", upturned: true });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "waste",
    to: "stock",
    cards: [Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })]
  });

  t.false(canMakeMove);
});

test("cannot move a card to the stock from the foundation", t => {
  const gameState = getEmptySerializedGame();

  gameState.stock.cards.push({ suit: "Clubs", rank: "Ace", upturned: true });

  gameState.foundation.clubs.cards.push({
    suit: "Clubs",
    rank: "2",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "foundation",
    to: "stock",
    cards: [
      Card.unserialize({
        suit: "Clubs",
        rank: "2",
        upturned: true
      })
    ]
  });

  t.false(canMakeMove);
});

test("cannot move more than one card from the stock to the foundation", t => {
  const gameState = getEmptySerializedGame();

  gameState.stock.cards.push(
    { suit: "Clubs", rank: "2", upturned: false },
    { suit: "Clubs", rank: "Ace", upturned: true }
  );
  gameState.foundation.clubs.cards.push({
    suit: "Clubs",
    rank: "3",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "stock",
    to: "foundation",
    cards: [
      Card.unserialize({ suit: "Clubs", rank: "2", upturned: false }),
      Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })
    ]
  });

  t.false(canMakeMove);
});

test("cannot move more than one card from the stock to the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.stock.cards.push(
    { suit: "Clubs", rank: "2", upturned: false },
    { suit: "Clubs", rank: "Ace", upturned: true }
  );
  gameState.tableau.piles[0].cards.push({
    suit: "Hearts",
    rank: "3",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "stock",
    to: "tableau",
    cards: [
      Card.unserialize({ suit: "Clubs", rank: "2", upturned: false }),
      Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })
    ],
    meta: {
      toPile: 1
    }
  });

  t.false(canMakeMove);
});

test("cannot move more than one card from the foundation to the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.foundation.clubs.cards.push(
    { suit: "Clubs", rank: "2", upturned: true },
    { suit: "Clubs", rank: "Ace", upturned: true }
  );
  gameState.tableau.piles[0].cards.push({
    suit: "Hearts",
    rank: "3",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const canMakeMove = game.validateMove({
    from: "foundation",
    to: "tableau",
    cards: [
      Card.unserialize({ suit: "Clubs", rank: "2", upturned: true }),
      Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })
    ],
    meta: {
      toPile: 1
    }
  });

  t.false(canMakeMove);
});

// card moving tests
test("can move a card from the stock to the waste", t => {
  const gameState = getEmptySerializedGame();

  gameState.stock.cards.push({ suit: "Hearts", rank: "King", upturned: true });

  const game = KlondikeGame.unserialize(gameState);

  const move: IMove = {
    cards: [Card.unserialize({ suit: "Hearts", rank: "King", upturned: true })],
    from: "stock",
    to: "waste"
  };

  const canMakeMove = game.validateMove(move);

  t.true(canMakeMove);

  game.makeMove(move);

  t.deepEqual(
    game.waste.getCards()[0],
    Card.unserialize({ suit: "Hearts", rank: "King", upturned: true })
  );
});

test("can move a card from the waste to the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.waste.cards.push({ suit: "Hearts", rank: "King", upturned: true });

  const game = KlondikeGame.unserialize(gameState);

  const move: IMove = {
    cards: [Card.unserialize({ suit: "Hearts", rank: "King", upturned: true })],
    from: "waste",
    to: "tableau",
    meta: {
      toPile: 1
    }
  };

  const canMakeMove = game.validateMove(move);

  t.true(canMakeMove);

  game.makeMove(move);

  t.deepEqual(
    game.tableau.getTableauPile(1).getCards()[0],
    Card.unserialize({ suit: "Hearts", rank: "King", upturned: true })
  );
});

test("can move a card from the waste to the foundation", t => {
  const gameState = getEmptySerializedGame();

  gameState.waste.cards.push({ suit: "Hearts", rank: "Ace", upturned: true });

  const game = KlondikeGame.unserialize(gameState);

  const move: IMove = {
    cards: [Card.unserialize({ suit: "Hearts", rank: "Ace", upturned: true })],
    from: "waste",
    to: "foundation"
  };

  const canMakeMove = game.validateMove(move);

  t.true(canMakeMove);

  game.makeMove(move);

  t.deepEqual(
    game.foundation.getPileForSuit("Hearts").getCards()[0],
    Card.unserialize({ suit: "Hearts", rank: "Ace", upturned: true })
  );
});

test("can move a card from the tableau to the foundation", t => {
  const gameState = getEmptySerializedGame();

  gameState.tableau.piles[0].cards.push({
    suit: "Clubs",
    rank: "Ace",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const move: IMove = {
    cards: [Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })],
    from: "tableau",
    to: "foundation",
    meta: {
      fromPile: 1
    }
  };

  const canMakeMove = game.validateMove(move);

  t.true(canMakeMove);

  game.makeMove(move);

  t.deepEqual(
    game.foundation.getPileForSuit("Clubs").getCards()[0],
    Card.unserialize({ suit: "Clubs", rank: "Ace", upturned: true })
  );
});

test("can move a card from the tableau to the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.tableau.piles[0].cards.push({
    suit: "Clubs",
    rank: "5",
    upturned: true
  });
  gameState.tableau.piles[1].cards.push({
    suit: "Hearts",
    rank: "6",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const move: IMove = {
    cards: [Card.unserialize({ suit: "Clubs", rank: "5", upturned: true })],
    from: "tableau",
    to: "tableau",
    meta: {
      fromPile: 1,
      toPile: 2
    }
  };

  const canMakeMove = game.validateMove(move);

  t.true(canMakeMove);

  game.makeMove(move);

  t.deepEqual(
    game.tableau.getTableauPile(2).getCards()[1],
    Card.unserialize({ suit: "Clubs", rank: "5", upturned: true })
  );
});

test("can move multiple cards from the tableau to the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.tableau.piles[0].cards.push(
    { suit: "Clubs", rank: "5", upturned: true },
    { suit: "Hearts", rank: "4", upturned: true }
  );
  gameState.tableau.piles[1].cards.push({
    suit: "Hearts",
    rank: "6",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const move: IMove = {
    cards: [
      Card.unserialize({ suit: "Clubs", rank: "5", upturned: true }),
      Card.unserialize({ suit: "Hearts", rank: "4", upturned: true })
    ],
    from: "tableau",
    to: "tableau",
    meta: {
      fromPile: 1,
      toPile: 2
    }
  };

  const canMakeMove = game.validateMove(move);

  t.true(canMakeMove);

  game.makeMove(move);

  t.deepEqual(
    game.tableau.getTableauPile(2).getCards()[1],
    Card.unserialize({ suit: "Clubs", rank: "5", upturned: true })
  );
  t.deepEqual(
    game.tableau.getTableauPile(2).getCards()[2],
    Card.unserialize({ suit: "Hearts", rank: "4", upturned: true })
  );
});

test("can move a card from the foundation to the tableau", t => {
  const gameState = getEmptySerializedGame();

  gameState.tableau.piles[0].cards.push({
    suit: "Hearts",
    rank: "4",
    upturned: true
  });
  gameState.foundation.clubs.cards.push({
    suit: "Clubs",
    rank: "3",
    upturned: true
  });

  const game = KlondikeGame.unserialize(gameState);

  const move: IMove = {
    cards: [new Card("Clubs", "3", true)],
    from: "foundation",
    to: "tableau",
    meta: {
      fromPile: 1,
      toPile: 1
    }
  };

  const canMakeMove = game.validateMove(move);

  t.true(canMakeMove);

  game.makeMove(move);

  t.deepEqual(
    game.tableau.getTableauPile(1).getCards()[1],
    new Card("Clubs", "3", true)
  );
});

// unserialize and serialize
test("unserializing the saved game state, puts it back in the same state", t => {
  const serializedGame: ISerializedKlondikeGame = {
    foundation: {
      clubs: {
        suit: "Clubs",
        cards: [
          { suit: "Clubs", rank: "Ace", upturned: false },
          { suit: "Clubs", rank: "2", upturned: false },
          { suit: "Clubs", rank: "3", upturned: false }
        ]
      },
      hearts: {
        suit: "Hearts",
        cards: [
          { suit: "Hearts", rank: "Ace", upturned: false },
          { suit: "Hearts", rank: "2", upturned: false },
          { suit: "Hearts", rank: "3", upturned: false },
          { suit: "Hearts", rank: "4", upturned: false },
          { suit: "Hearts", rank: "5", upturned: false }
        ]
      },
      diamonds: {
        suit: "Diamonds",
        cards: [
          { suit: "Diamonds", rank: "Ace", upturned: false },
          { suit: "Diamonds", rank: "2", upturned: false },
          { suit: "Diamonds", rank: "3", upturned: false },
          { suit: "Diamonds", rank: "4", upturned: false },
          { suit: "Diamonds", rank: "5", upturned: false },
          { suit: "Diamonds", rank: "6", upturned: false },
          { suit: "Diamonds", rank: "7", upturned: false },
          { suit: "Diamonds", rank: "8", upturned: false }
        ]
      },
      spades: {
        suit: "Spades",
        cards: [
          { suit: "Spades", rank: "Ace", upturned: false },
          { suit: "Spades", rank: "2", upturned: false }
        ]
      }
    },
    stock: {
      cards: [
        {
          suit: "Spades",
          rank: "10",
          upturned: false
        },
        {
          suit: "Spades",
          rank: "6",
          upturned: false
        },
        {
          suit: "Spades",
          rank: "7",
          upturned: false
        },
        {
          suit: "Spades",
          rank: "8",
          upturned: false
        },
        {
          suit: "Clubs",
          rank: "6",
          upturned: false
        },
        {
          suit: "Clubs",
          rank: "Jack",
          upturned: false
        },
        {
          suit: "Hearts",
          rank: "8",
          upturned: false
        },
        {
          suit: "Spades",
          rank: "4",
          upturned: false
        },
        {
          suit: "Clubs",
          rank: "8",
          upturned: false
        },
        {
          suit: "Clubs",
          rank: "5",
          upturned: false
        },
        {
          suit: "Spades",
          rank: "5",
          upturned: false
        },
        {
          suit: "Spades",
          rank: "Queen",
          upturned: false
        },
        {
          suit: "Hearts",
          rank: "Queen",
          upturned: false
        }
      ]
    },
    history: [],
    waste: {
      cards: [
        {
          suit: "Diamonds",
          rank: "King",
          upturned: true
        },
        {
          suit: "Hearts",
          rank: "7",
          upturned: true
        },
        {
          suit: "Spades",
          rank: "3",
          upturned: true
        },
        {
          suit: "Spades",
          rank: "Jack",
          upturned: true
        }
      ]
    },
    tableau: {
      piles: [
        // empty pile
        { cards: [] },
        {
          cards: [
            {
              suit: "Diamonds",
              rank: "9",
              upturned: false
            },
            {
              suit: "Clubs",
              rank: "9",
              upturned: true
            }
          ]
        },
        // empty pile
        { cards: [] },
        {
          cards: [
            {
              suit: "Spades",
              rank: "9",
              upturned: false
            },
            {
              suit: "Hearts",
              rank: "Jack",
              upturned: false
            },
            {
              suit: "Diamonds",
              rank: "10",
              upturned: false
            },
            {
              suit: "Clubs",
              rank: "4",
              upturned: true
            }
          ]
        },
        {
          cards: [
            {
              suit: "Spades",
              rank: "King",
              upturned: false
            },
            {
              suit: "Hearts",
              rank: "10",
              upturned: false
            },
            {
              suit: "Hearts",
              rank: "King",
              upturned: true
            }
          ]
        },
        {
          cards: [
            {
              suit: "Clubs",
              rank: "Queen",
              upturned: false
            },
            {
              suit: "Clubs",
              rank: "10",
              upturned: false
            },
            {
              suit: "Diamonds",
              rank: "Jack",
              upturned: true
            }
          ]
        },
        {
          cards: [
            {
              suit: "Hearts",
              rank: "6",
              upturned: false
            },
            {
              suit: "Diamonds",
              rank: "Queen",
              upturned: false
            },
            {
              suit: "Hearts",
              rank: "9",
              upturned: false
            },
            {
              suit: "Clubs",
              rank: "7",
              upturned: false
            },
            {
              suit: "Clubs",
              rank: "King",
              upturned: true
            }
          ]
        }
      ]
    }
  };

  const game = KlondikeGame.unserialize(serializedGame);

  // validate the waste is correct an in order!
  game.waste.serialize().cards.forEach((card, i) => {
    t.deepEqual(card, serializedGame.waste.cards[i]);
  });

  // validate the stock
  game.stock.serialize().cards.forEach((card, i) => {
    t.deepEqual(card, serializedGame.stock.cards[i]);
  });

  // validate the tableau
  game.tableau.serialize().piles.forEach((pile, i) => {
    pile.cards.forEach((card, j) => {
      t.deepEqual(card, serializedGame.tableau.piles[i].cards[j]);
    });
  });

  // validate the foundation
  Object.keys(serializedGame.foundation).forEach((suit, i) => {
    serializedGame.foundation[suit].cards.forEach((card, j) => {
      t.deepEqual(card, game.foundation.serialize()[suit].cards[j]);
    });
  });
});

// // hard to test as the game state is random, we could test the history?
// test.only("serializing returns the anticipated state", t => {
//   const game = new KlondikeGame();

//   game.start();

//   const
// });

import test from "ava";
import { KlondikeGame, ISerializedKlondikeGame } from "./KlondikeGame";
import { Card } from "./Card";

test("getHistory() returns the correct history", t => {});
test("history is modified on every successful move", t => {});
test("getHistory() returns the correct history in order", t => {});
test("getHints() returns the correct hints if they exist", t => {});
test("getHints() returns null if no hints exist", t => {});

test("reset() returns all cards to the stock", t => {});
test("reset() shuffles all cards after they are in th stock", t => {});

// initial game state
test("Before the cards are dealt, they are shufled within the stock", t => {});
test("7 tableau piles exist on the board", t => {});
test("the first tableau pile has one card at the beginning", t => {});
test("the second tableau pile has two cards at the beginning", t => {});
test("the third tableau pile has three cards at the beginning", t => {});
test("the fourth tableau pile has fourth cards at the beginning", t => {});
test("the fifth tableau pile has five cards at the beginning", t => {});
test("the sixth tableau pile has six cards at the beginning", t => {});
test("the seventh tableau pile has seven cards at the beginning", t => {});
test("4 foundtion piles exist on the board", t => {});
test("the foundation is empty at the beginning", t => {});
test("the waste is empty at the beginning of the game", t => {});
test("the stock has 24 cards in it the beginning", t => {});
test("the tableau has a collective 28 cards in it the beginning", t => {});
test("There are only 52 cards in the entire game state at any given time", t => {});
test("once the stock has been all pushed into the waste, the next time a move is made from the stock to the waste, the cards should be moved over to the stock again and the waste should be empty", t => {});

// validate move tests
test("cannot move a non sequential card to the foundation", t => {});
test("cannot move a card to the waste from the tableau", t => {});
test("cannot move a card to the waste from the foundation", t => {});
test("cannot move a card to the stock from the tableau", t => {});
test("cannot move a card to the stock from the waste", t => {});
test("cannot move a card to the stock from the foundation", t => {});
test("cannot move a card between the stock <-> waste if there are no cards in either", t => {});
test("cannot move more than one card from the stock to the foundation", t => {});
test("cannot move more than one card from the stock to the tableau", t => {});
test("cannot move more than one card from the foundation to the tableau", t => {});

// card moving tests
test("can move a card from the stock to the waste", t => {});
test("can move a card from the waste to the tableau", t => {});
test("can move a card from the waste to the foundation", t => {});
test("can move a card from the tableau to the foundation", t => {});
test("can move a card from the tableau to the tableau", t => {});
test("can move multiple cards from the tableau to the tableau", t => {});
test("can move a card from the foundation to the tableau", t => {});

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

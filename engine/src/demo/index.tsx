import { KlondikeGame, IMove } from "../classes/KlondikeGame";
import { Card } from "../classes/Card";

const game = KlondikeGame.unserialize({
  history: [],
  tableau: {
    piles: [
      {
        cards: [
          {
            suit: "Diamonds",
            rank: "3",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Spades",
            rank: "Ace",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "6",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Diamonds",
            rank: "Ace",
            upturned: false
          },
          {
            suit: "Clubs",
            rank: "7",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "9",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Hearts",
            rank: "Ace",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "10",
            upturned: false
          },
          {
            suit: "Spades",
            rank: "3",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "8",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Diamonds",
            rank: "4",
            upturned: false
          },
          {
            suit: "Clubs",
            rank: "5",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "Jack",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "2",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "7",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Hearts",
            rank: "Jack",
            upturned: false
          },
          {
            suit: "Clubs",
            rank: "8",
            upturned: false
          },
          {
            suit: "Clubs",
            rank: "6",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "7",
            upturned: false
          },
          {
            suit: "Clubs",
            rank: "Queen",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "4",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Clubs",
            rank: "King",
            upturned: false
          },
          {
            suit: "Clubs",
            rank: "2",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "2",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "Queen",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "9",
            upturned: false
          },
          {
            suit: "Spades",
            rank: "9",
            upturned: false
          },
          {
            suit: "Spades",
            rank: "7",
            upturned: true
          }
        ]
      }
    ]
  },
  foundation: {
    hearts: {
      cards: [],
      suit: "Hearts"
    },
    spades: {
      cards: [],
      suit: "Spades"
    },
    diamonds: {
      cards: [],
      suit: "Diamonds"
    },
    clubs: {
      cards: [],
      suit: "Clubs"
    }
  },
  waste: {
    cards: []
  },
  stock: {
    cards: [
      {
        suit: "Clubs",
        rank: "3",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "Jack",
        upturned: false
      },
      {
        suit: "Diamonds",
        rank: "5",
        upturned: false
      },
      {
        suit: "Hearts",
        rank: "Queen",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "10",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "4",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "5",
        upturned: false
      },
      {
        suit: "Clubs",
        rank: "9",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "2",
        upturned: false
      },
      {
        suit: "Clubs",
        rank: "10",
        upturned: false
      },
      {
        suit: "Clubs",
        rank: "4",
        upturned: false
      },
      {
        suit: "Diamonds",
        rank: "King",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "6",
        upturned: false
      },
      {
        suit: "Hearts",
        rank: "5",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "King",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "Queen",
        upturned: false
      },
      {
        suit: "Clubs",
        rank: "Ace",
        upturned: false
      },
      {
        suit: "Hearts",
        rank: "3",
        upturned: false
      },
      {
        suit: "Diamonds",
        rank: "10",
        upturned: false
      },
      {
        suit: "Hearts",
        rank: "8",
        upturned: false
      },
      {
        suit: "Diamonds",
        rank: "6",
        upturned: false
      },
      {
        suit: "Clubs",
        rank: "Jack",
        upturned: false
      },
      {
        suit: "Spades",
        rank: "8",
        upturned: false
      },
      {
        suit: "Hearts",
        rank: "King",
        upturned: false
      }
    ]
  }
});

const move: IMove = {
  from: "tableau",
  to: "tableau",
  cards: [new Card("Hearts", "6", true)],
  meta: {
    fromPile: 2,
    toPile: 7
  }
};

game.makeMove(move);

// game.validateMove(move);

// console.log(game.validateMove(move));

console.log(JSON.stringify(game, null, 2));

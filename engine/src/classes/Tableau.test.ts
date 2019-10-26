import test from "ava";
import { Tableau, ISerializedTableau } from "./Tableau";
import { TableauPile } from "./TableauPile";
import { Card } from "./Card";

test("getTableauPile() returns the correct pile", t => {
  const foundationPiles = [
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Clubs", "Queen", false),
      new Card("Clubs", "Ace", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ])
  ];
  const tableau = new Tableau(foundationPiles);

  const [pile1, pile4] = [tableau.getTableauPile(1), tableau.getTableauPile(4)];

  pile1.getCards().forEach((c, i) => {
    t.deepEqual(foundationPiles[0].getCards()[i], c);
  });

  pile4.getCards().forEach((c, i) => {
    t.deepEqual(foundationPiles[3].getCards()[i], c);
  });
});

test("getTableauPile() throws if is asked for a pile that does not exist", t => {
  const foundationPiles = [
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Clubs", "Queen", false),
      new Card("Clubs", "Ace", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ])
  ];
  const tableau = new Tableau(foundationPiles);

  // no-op
  tableau.getTableauPile(1);

  t.throws(() => {
    tableau.getTableauPile(100);
  });
});

test("addCardAnywhere() will check all TableauPiles for a place to put the card", t => {
  const foundationPiles = [
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Hearts", "5", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Spades", "8", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "Ace", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "2", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "3", true)
    ]),
    // CARD SHOULD GO HERE
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Clubs", "5", true)
    ])
  ];

  // we want to add a 4 of hearts to the tableau
  const tableau = new Tableau(foundationPiles);
  const cardToPlace = new Card("Hearts", "4", true);
  t.is(tableau.canAddCardAnywhere(cardToPlace), 6);
  tableau.addCardAnywhere(cardToPlace);
  t.deepEqual(tableau.getTableauPile(7).getCards()[4], cardToPlace);
});

test("if there are multiple places for a card to go, addCardAnywhere() uses the first", t => {
  const foundationPiles = [
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Spades", "5", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Spades", "8", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "Ace", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "2", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "3", true)
    ]),
    // CARD COULD GO HERE - but it should be in the second pile
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Clubs", "5", true)
    ])
  ];

  // we want to add a 4 of hearts to the tableau
  const tableau = new Tableau(foundationPiles);
  const cardToPlace = new Card("Hearts", "4", true);
  t.is(tableau.canAddCardAnywhere(cardToPlace), 1);
  tableau.addCardAnywhere(cardToPlace);
  t.deepEqual(tableau.getTableauPile(2).getCards()[4], cardToPlace);
});

test("serialize() returns the correct serial form", t => {
  const foundationPiles = [
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Clubs", "Queen", false),
      new Card("Clubs", "Ace", false),
      new Card("Diamonds", "King", true)
    ]),
    new TableauPile([
      new Card("Spades", "King", false),
      new Card("Hearts", "Queen", false),
      new Card("Spades", "Jack", false),
      new Card("Diamonds", "King", true)
    ])
  ];
  const tableau = new Tableau(foundationPiles);

  const serializedTableau = tableau.serialize();

  serializedTableau.piles.forEach((pile, i) => {
    t.deepEqual(pile, foundationPiles[i].serialize());
  });
});

test("unserialize() returns a valid Tableau", t => {
  const serializedTableau: ISerializedTableau = {
    piles: [
      {
        cards: [
          {
            suit: "Spades",
            rank: "King",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "Queen",
            upturned: false
          },
          {
            suit: "Spades",
            rank: "Jack",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "King",
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
            suit: "Spades",
            rank: "2",
            upturned: false
          },
          {
            suit: "Spades",
            rank: "Jack",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "Ace",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Spades",
            rank: "Jack",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "King",
            upturned: false
          },
          {
            suit: "Spades",
            rank: "King",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "Queen",
            upturned: true
          }
        ]
      },
      {
        cards: [
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
          },
          {
            suit: "Clubs",
            rank: "King",
            upturned: true
          }
        ]
      },
      {
        cards: [
          {
            suit: "Hearts",
            rank: "King",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "Queen",
            upturned: false
          },
          {
            suit: "Hearts",
            rank: "Jack",
            upturned: false
          },
          {
            suit: "Diamonds",
            rank: "King",
            upturned: true
          }
        ]
      }
    ]
  };

  const tableau = Tableau.unserialize(serializedTableau);

  // const serializedTableau = tableau.serialize();

  for (let i = 1; i <= 5; i += 1) {
    tableau
      .getTableauPile(i)
      .getCards()
      .forEach((card, j) => {
        t.deepEqual(card.serialize(), serializedTableau.piles[i - 1].cards[j]);
      });
  }
});

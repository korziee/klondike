import test from "ava";
import { Card } from "./Card";
import { Foundation, ISerializedFoundation } from "./Foundation";

test("removeCard() removes the card from the right pile", t => {
  const foundation = new Foundation();
  foundation.addCard(new Card("Clubs", "Ace", false));
  foundation.addCard(new Card("Clubs", "2", false));
  foundation.addCard(new Card("Clubs", "3", false));
  foundation.addCard(new Card("Hearts", "Ace", false));
  foundation.addCard(new Card("Hearts", "2", false));
  foundation.addCard(new Card("Hearts", "3", false));
  foundation.addCard(new Card("Spades", "Ace", false));
  foundation.addCard(new Card("Spades", "2", false));
  foundation.addCard(new Card("Spades", "3", false));
  foundation.addCard(new Card("Diamonds", "Ace", false));
  foundation.addCard(new Card("Diamonds", "2", false));
  foundation.addCard(new Card("Diamonds", "3", false));

  foundation.removeCard(new Card("Diamonds", "3", false));

  t.is(foundation.getPileForSuit("Diamonds").getCards().length, 2);
  t.is(foundation.getPileForSuit("Hearts").getCards().length, 3);
  t.is(foundation.getPileForSuit("Spades").getCards().length, 3);
  t.is(foundation.getPileForSuit("Clubs").getCards().length, 3);
  foundation.removeCard(new Card("Diamonds", "2", false));
  t.is(foundation.getPileForSuit("Diamonds").getCards().length, 1);
  t.is(foundation.getPileForSuit("Hearts").getCards().length, 3);
  t.is(foundation.getPileForSuit("Spades").getCards().length, 3);
  t.is(foundation.getPileForSuit("Clubs").getCards().length, 3);
});

test("addCard() adds the card to the right pile", t => {
  const foundation = new Foundation();
  foundation.addCard(new Card("Clubs", "Ace", false));
  foundation.addCard(new Card("Clubs", "2", false));
  foundation.addCard(new Card("Clubs", "3", false));

  t.is(foundation.getPileForSuit("Clubs").getCards().length, 3);
  t.is(foundation.getPileForSuit("Diamonds").getCards().length, 0);
  t.is(foundation.getPileForSuit("Hearts").getCards().length, 0);
  t.is(foundation.getPileForSuit("Spades").getCards().length, 0);
});

test("serialize() returns the expected data", t => {
  const foundation = new Foundation();
  foundation.addCard(new Card("Clubs", "Ace", true));
  foundation.addCard(new Card("Clubs", "2", true));
  foundation.addCard(new Card("Clubs", "3", true));
  foundation.addCard(new Card("Hearts", "Ace", true));
  foundation.addCard(new Card("Hearts", "2", true));
  foundation.addCard(new Card("Hearts", "3", true));
  foundation.addCard(new Card("Spades", "Ace", true));
  foundation.addCard(new Card("Spades", "2", true));
  foundation.addCard(new Card("Spades", "3", true));
  foundation.addCard(new Card("Diamonds", "Ace", true));
  foundation.addCard(new Card("Diamonds", "2", true));
  foundation.addCard(new Card("Diamonds", "3", true));
  const serializedFoundation = foundation.serialize();
  t.deepEqual(serializedFoundation, {
    clubs: {
      cards: [
        {
          rank: "Ace",
          suit: "Clubs",
          upturned: true
        },
        {
          rank: "2",
          suit: "Clubs",
          upturned: true
        },
        {
          rank: "3",
          suit: "Clubs",
          upturned: true
        }
      ],
      suit: "Clubs"
    },
    diamonds: {
      cards: [
        {
          rank: "Ace",
          suit: "Diamonds",
          upturned: true
        },
        {
          rank: "2",
          suit: "Diamonds",
          upturned: true
        },
        {
          rank: "3",
          suit: "Diamonds",
          upturned: true
        }
      ],
      suit: "Diamonds"
    },
    hearts: {
      cards: [
        {
          rank: "Ace",
          suit: "Hearts",
          upturned: true
        },
        {
          rank: "2",
          suit: "Hearts",
          upturned: true
        },
        {
          rank: "3",
          suit: "Hearts",
          upturned: true
        }
      ],
      suit: "Hearts"
    },
    spades: {
      cards: [
        {
          rank: "Ace",
          suit: "Spades",
          upturned: true
        },
        {
          rank: "2",
          suit: "Spades",
          upturned: true
        },
        {
          rank: "3",
          suit: "Spades",
          upturned: true
        }
      ],
      suit: "Spades"
    }
  });
});

test("unserialize() returns a Foundation class with the correct data", t => {
  const unserializedFoundation: ISerializedFoundation = {
    clubs: {
      cards: [
        {
          rank: "Ace",
          suit: "Clubs",
          upturned: true
        },
        {
          rank: "2",
          suit: "Clubs",
          upturned: true
        },
        {
          rank: "3",
          suit: "Clubs",
          upturned: true
        }
      ],
      suit: "Clubs"
    },
    diamonds: {
      cards: [
        {
          rank: "Ace",
          suit: "Diamonds",
          upturned: true
        },
        {
          rank: "2",
          suit: "Diamonds",
          upturned: true
        },
        {
          rank: "3",
          suit: "Diamonds",
          upturned: true
        }
      ],
      suit: "Diamonds"
    },
    hearts: {
      cards: [
        {
          rank: "Ace",
          suit: "Hearts",
          upturned: true
        },
        {
          rank: "2",
          suit: "Hearts",
          upturned: true
        },
        {
          rank: "3",
          suit: "Hearts",
          upturned: true
        }
      ],
      suit: "Hearts"
    },
    spades: {
      cards: [
        {
          rank: "Ace",
          suit: "Spades",
          upturned: true
        },
        {
          rank: "2",
          suit: "Spades",
          upturned: true
        },
        {
          rank: "3",
          suit: "Spades",
          upturned: true
        }
      ],
      suit: "Spades"
    }
  };

  const foundation = Foundation.unserialize(unserializedFoundation);
  const clubsFoundationPile = foundation.getPileForSuit("Clubs");
  const heartsFoundationPile = foundation.getPileForSuit("Hearts");
  const diamondsFoundationPile = foundation.getPileForSuit("Diamonds");
  const spadesFoundationPile = foundation.getPileForSuit("Spades");

  // clubs
  t.is(clubsFoundationPile.getCards().length, 3);
  t.deepEqual(clubsFoundationPile.serialize().cards[0], {
    rank: "Ace",
    suit: "Clubs",
    upturned: true
  });
  t.deepEqual(clubsFoundationPile.serialize().cards[1], {
    rank: "2",
    suit: "Clubs",
    upturned: true
  });
  t.deepEqual(clubsFoundationPile.serialize().cards[2], {
    rank: "3",
    suit: "Clubs",
    upturned: true
  });

  // hearts
  t.is(heartsFoundationPile.getCards().length, 3);
  t.deepEqual(heartsFoundationPile.serialize().cards[0], {
    rank: "Ace",
    suit: "Hearts",
    upturned: true
  });
  t.deepEqual(heartsFoundationPile.serialize().cards[1], {
    rank: "2",
    suit: "Hearts",
    upturned: true
  });
  t.deepEqual(heartsFoundationPile.serialize().cards[2], {
    rank: "3",
    suit: "Hearts",
    upturned: true
  });

  // spades
  t.is(spadesFoundationPile.getCards().length, 3);
  t.deepEqual(spadesFoundationPile.serialize().cards[0], {
    rank: "Ace",
    suit: "Spades",
    upturned: true
  });
  t.deepEqual(spadesFoundationPile.serialize().cards[1], {
    rank: "2",
    suit: "Spades",
    upturned: true
  });
  t.deepEqual(spadesFoundationPile.serialize().cards[2], {
    rank: "3",
    suit: "Spades",
    upturned: true
  });

  // diamonds
  t.is(diamondsFoundationPile.getCards().length, 3);
  t.deepEqual(diamondsFoundationPile.serialize().cards[0], {
    rank: "Ace",
    suit: "Diamonds",
    upturned: true
  });
  t.deepEqual(diamondsFoundationPile.serialize().cards[1], {
    rank: "2",
    suit: "Diamonds",
    upturned: true
  });
  t.deepEqual(diamondsFoundationPile.serialize().cards[2], {
    rank: "3",
    suit: "Diamonds",
    upturned: true
  });
});

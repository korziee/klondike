import { Card } from "@cards-js/common";
import test from "ava";
import { Move, ISerializedMove } from "./Move";

test("can unserialize", (t) => {
  const serializedMove: ISerializedMove = {
    cards: [
      {
        rank: "King",
        suit: "Hearts",
        upturned: true,
      },
    ],
    from: "foundation",
    to: "tableau",
    meta: {
      toPile: 2,
    },
  };

  const move = Move.unserialize(serializedMove);

  t.deepEqual(move.serialize(), serializedMove);
});

test("can serialize", (t) => {
  const serializedMove: ISerializedMove = {
    cards: [
      {
        rank: "King",
        suit: "Hearts",
        upturned: true,
      },
    ],
    from: "foundation",
    to: "tableau",
    meta: {
      toPile: 2,
    },
  };

  const move = new Move({
    cards: [new Card("Hearts", "King", true)],
    from: "foundation",
    to: "tableau",
    meta: {
      toPile: 2,
    },
  });

  t.deepEqual(move.serialize(), serializedMove);
});

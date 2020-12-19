import { ISerializable, ISerializedCard, Card } from "@cards-js/common";

export interface ISerializedMove {
  from: "tableau" | "foundation" | "waste" | "stock";
  to: "tableau" | "foundation" | "waste";
  cards: ISerializedCard[];
  meta?: {
    fromPile?: number;
    toPile?: number;
  };
}

export interface IMove extends ISerializable<Move, ISerializedMove> {
  from: "tableau" | "foundation" | "waste" | "stock";
  // you can never move cards to the stock!
  to: "tableau" | "foundation" | "waste";
  cards: Card[];
  meta?: {
    // used when moving cards from/to/between the tableua
    fromPile?: number;
    toPile?: number;
  };
}

export class Move implements IMove {
  public from: "tableau" | "foundation" | "waste" | "stock";
  public to: "tableau" | "foundation" | "waste";
  public cards: Card[];
  public meta?: { fromPile?: number; toPile?: number };

  constructor({
    from,
    to,
    cards,
    meta,
  }: {
    from: "tableau" | "foundation" | "waste" | "stock";
    to: "tableau" | "foundation" | "waste";
    cards: Card[];
    meta?: { fromPile?: number; toPile?: number };
  }) {
    this.from = from;
    this.to = to;
    this.cards = cards;
    this.meta = meta;
  }

  serialize(): ISerializedMove {
    return {
      cards: this.cards.map((c) => c.serialize()),
      from: this.from,
      to: this.to,
      meta: this.meta,
    };
  }

  static unserialize(serializedMove: ISerializedMove): Move {
    return new Move({
      from: serializedMove.from,
      to: serializedMove.to,
      cards: serializedMove.cards.map((c) => Card.unserialize(c)),
      meta: serializedMove.meta,
    });
  }
}

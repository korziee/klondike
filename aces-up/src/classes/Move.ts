import {
  Card,
  ISerializedCard,
  ISerializedPile,
  Serializable,
} from "@cards-js/common";
import { TableauPile } from "./TableauPile";

export interface ISerializedMove {
  from: "tableau" | "stock";
  to: "tableau" | "waste";
  card: ISerializedCard;
  meta?: {
    fromPile: ISerializedPile;
    toPile: ISerializedPile;
  };
}

export interface IMove {
  from: "tableau" | "stock";
  to: "tableau" | "waste";
  card: Card;
  meta?: {
    fromPile?: TableauPile;
    toPile?: TableauPile;
  };
}

export class Move extends Serializable implements IMove {
  from: "tableau" | "stock";
  to: "tableau" | "waste";
  card: Card;
  meta?: {
    fromPile?: TableauPile;
    toPile?: TableauPile;
  };

  create(move: IMove): Move {
    this.from = move.from;
    this.to = move.to;
    this.card = move.card;
    this.meta = move.meta;

    return this;
  }

  unserialize(move: ISerializedMove): Move {
    return this.create({
      from: move.from,
      to: move.to,
      card: new Card().unserialize(move.card),
      meta: {
        fromPile: move.meta.fromPile
          ? new TableauPile().unserialize(move.meta.fromPile)
          : null,
        toPile: move.meta.toPile
          ? new TableauPile().unserialize(move.meta.toPile)
          : null,
      },
    });
  }

  serialize(): ISerializedMove {
    return {
      from: this.from,
      to: this.to,
      card: this.card.serialize(),
      meta: {
        fromPile: this.meta?.fromPile?.serialize(),
        toPile: this.meta?.toPile?.serialize(),
      },
    };
  }
}

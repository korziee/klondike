import { TRank } from "../types/TRank";
import { TSuit } from "../types/TSuit";
import { Serializable } from "./Serializable";

export interface ISerializedCard {
  suit: TSuit;
  rank: TRank;
  upturned: boolean;
}

export interface ICard {
  getSuit(): TSuit;
  getRank(): TRank;
  getUpturned(): boolean;

  turnUp(): void;
  turnDown(): void;
}

/**
 * The Card class represents the building block for the game, the card!
 */
export class Card extends Serializable implements ICard {
  private suit: TSuit;
  private rank: TRank;
  private upturned: boolean;

  create(suit: TSuit, rank: TRank, upturned: boolean) {
    this.suit = suit;
    this.rank = rank;
    this.upturned = upturned;

    return this;
  }

  serialize(): ISerializedCard {
    return {
      suit: this.suit,
      rank: this.rank,
      upturned: this.upturned,
    };
  }

  unserialize({ rank, suit, upturned }: ISerializedCard): Card {
    const card = this.create(suit, rank, upturned);

    return card;
  }

  getSuit() {
    return this.suit;
  }

  getRank() {
    return this.rank;
  }

  getUpturned() {
    return this.upturned;
  }

  turnUp() {
    this.upturned = true;
  }

  turnDown() {
    this.upturned = false;
  }
}

const x = new Card().create("Clubs", "10", true);

const cc = new Card().unserialize(x.serialize());

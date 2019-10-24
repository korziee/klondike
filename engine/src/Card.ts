import { TRank } from "./types/TRank";
import { TSuit } from "./types/TSuit";
import { ISerializable } from "./types/ISerializable";

export interface ISerializedCard {
  suit: TSuit;
  rank: TRank;
  upturned: boolean;
}

export interface ICard extends ISerializable<Card, ISerializedCard> {
  getSuit(): TSuit;
  getRank(): TRank;
  getUpturned(): boolean;

  turnUp(): void;
  turnDown(): void;
}

/**
 * The Card class represents the building block for the game, the card!
 */
export class Card implements ICard {
  constructor(
    private suit: TSuit,
    private rank: TRank,
    private upturned: boolean
  ) {}

  serialize() {
    return {
      suit: this.suit,
      rank: this.rank,
      upturned: this.upturned
    };
  }

  static unserialize({ rank, suit, upturned }: ISerializedCard) {
    return new Card(suit, rank, upturned);
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

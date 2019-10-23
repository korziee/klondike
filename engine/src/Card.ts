import { TRank } from "./types/TRank";
import { TSuit } from "./types/TSuit";

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
export class Card implements ICard {
  constructor(
    private suit: TSuit,
    private rank: TRank,
    private upturned: boolean
  ) {}

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

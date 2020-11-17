import { ISerializable } from "../types/ISerializable";
import { Pile, ISerializedPile } from "./Pile";
import { Card } from "./Card";
import { TSuit } from "../types/TSuit";
import { FoundationPile, ISerializedFoundationPile } from "./FoundationPile";
import * as _ from "lodash";

export interface ISerializedFoundation {
  hearts: ISerializedFoundationPile;
  spades: ISerializedFoundationPile;
  diamonds: ISerializedFoundationPile;
  clubs: ISerializedFoundationPile;
}

export interface IFoundation
  extends ISerializable<Foundation, ISerializedFoundation> {
  getPiles(): Pile[];
  addCard(card: Card): void;
  removeCard(card: Card): void;
  getPileForSuit(suit: TSuit): Pile;
}

export class Foundation implements IFoundation {
  private hearts: FoundationPile = new FoundationPile("Hearts");
  private spades: FoundationPile = new FoundationPile("Spades");
  private diamonds: FoundationPile = new FoundationPile("Diamonds");
  private clubs: FoundationPile = new FoundationPile("Clubs");

  getPiles() {
    return [this.clubs, this.spades, this.diamonds, this.hearts];
  }

  getPileForSuit(suit: TSuit): FoundationPile {
    switch (suit) {
      case "Clubs":
        return this.clubs;
      case "Diamonds":
        return this.diamonds;
      case "Hearts":
        return this.hearts;
      case "Spades":
        return this.spades;
    }
  }

  addCard(card: Card): void {
    if (!this.getPileForSuit(card.getSuit()).canAddCards([card])) {
      return;
    }

    this.getPileForSuit(card.getSuit()).addCards([card]);
  }

  removeCard(card: Card): void {
    const suitFoundationPileClass = this.getPileForSuit(card.getSuit());

    if (!suitFoundationPileClass.canRemoveCards([card])) {
      return;
    }

    suitFoundationPileClass.removeCards([card]);
  }

  serialize() {
    return {
      hearts: this.hearts.serialize(),
      spades: this.spades.serialize(),
      clubs: this.clubs.serialize(),
      diamonds: this.diamonds.serialize(),
    };
  }

  static unserialize(data: ISerializedFoundation) {
    const foundation = new Foundation();

    foundation.spades = FoundationPile.unserialize({
      cards: data.spades.cards,
      suit: data.spades.suit,
    });

    foundation.hearts = FoundationPile.unserialize({
      cards: data.hearts.cards,
      suit: data.hearts.suit,
    });

    foundation.clubs = FoundationPile.unserialize({
      cards: data.clubs.cards,
      suit: data.clubs.suit,
    });

    foundation.diamonds = FoundationPile.unserialize({
      cards: data.diamonds.cards,
      suit: data.diamonds.suit,
    });

    return foundation;
  }
}

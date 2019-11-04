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
  addCard(card: Card): void;
  removeCard(card: Card): void;
  getPileForSuit(suit: TSuit): Pile;
}

export class Foundation implements IFoundation {
  private hearts: FoundationPile = new FoundationPile("Hearts");
  private spades: FoundationPile = new FoundationPile("Spades");
  private diamonds: FoundationPile = new FoundationPile("Diamonds");
  private clubs: FoundationPile = new FoundationPile("Clubs");

  getPileForSuit(suit: TSuit): FoundationPile {
    const suitFoundationPileClass = this[suit.toLowerCase()] as FoundationPile;
    return suitFoundationPileClass;
  }

  addCard(card: Card): void {
    const suit = card.getSuit().toLowerCase();
    const suitFoundationPileClass = this[suit] as FoundationPile;

    if (!suitFoundationPileClass.canAddCards([card])) {
      return;
    }

    suitFoundationPileClass.addCards([card]);
  }

  removeCard(card: Card): void {
    const suit = card.getSuit().toLowerCase();

    const suitFoundationPileClass = this[suit] as FoundationPile;

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
      diamonds: this.diamonds.serialize()
    };
  }

  static unserialize(data: ISerializedFoundation) {
    const foundation = new Foundation();

    const suits = Object.values(data).map(s => s.suit) as TSuit[];

    suits.forEach((suit: TSuit) => {
      foundation[suit.toLowerCase()] = FoundationPile.unserialize({
        cards: data[suit.toLowerCase()].cards,
        suit: suit
      });
    });

    return foundation;
  }
}

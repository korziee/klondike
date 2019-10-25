import { ISerializable } from "../types/ISerializable";
import { Pile, ISerializedPile } from "./Pile";
import { Card } from "./Card";
import { TSuit } from "../types/TSuit";
import { FoundationPile, ISerializedFoundationPile } from "./FoundationPile";

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

  getPileForSuit(suit: TSuit): Pile {
    const suitFoundationPileClass = this[suit.toLowerCase()] as Pile;
    return suitFoundationPileClass;
  }

  addCard(card: Card): void {
    const suit = card.getSuit().toLowerCase();
    const suitFoundationPileClass = this[suit] as Pile;

    if (!suitFoundationPileClass.canAddCards([card])) {
      return;
    }

    suitFoundationPileClass.addCards([card]);
  }

  removeCard(card: Card): void {
    const suit = card.getSuit().toLowerCase();

    const suitFoundationPileClass = this[suit] as Pile;

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
    Object.keys(data).forEach((suit: TSuit) => {
      foundation[suit] = FoundationPile.unserialize({
        cards: data[suit].cards,
        suit: suit
      });
    });

    return foundation;
  }
}

import { Pile, ISerializedPile } from "./Pile";
import { Card } from "./Card";
import { ISerializable } from "../types/ISerializable";

export interface ISerializedWaste extends ISerializedPile {}

export interface IWaste extends ISerializable<Waste, ISerializedWaste> {}

export class Waste extends Pile implements IWaste {
  static validateCards(cards: Card[]): void {
    const allAreUpturned = cards.every(c => c.getUpturned() === true);
    if (!allAreUpturned) {
      throw new Error("Cannot add/set cards that are not upturned");
    }
  }

  static unserialize({ cards }): Waste {
    const unserializedCards = cards.map(c => Card.unserialize(c));
    return new Waste(unserializedCards);
  }

  constructor(cards: Card[]) {
    Waste.validateCards(cards);
    super(cards);
  }

  canAddCards(cards: Card[]) {
    try {
      Waste.validateCards(cards);
    } catch (e) {
      return false;
    }

    return true;
  }

  canSetCards(cards: Card[]) {
    try {
      Waste.validateCards(cards);
    } catch (e) {
      return false;
    }

    return true;
  }

  canRemoveCards(cards: Card[]) {
    if (cards.length > 1) {
      console.warn(
        "Cannot remove more than one card from the waste at any given time"
      );
      return false;
    }
    const cardsInWaste = this.getCards();

    const cardOnTopOfWaste = cardsInWaste[cardsInWaste.length - 1];

    if (
      !(
        cards[0].getRank() === cardOnTopOfWaste.getRank() &&
        cards[0].getSuit() === cardOnTopOfWaste.getSuit()
      )
    ) {
      console.log("Cannot remove card that is not on the top of the waste");
      return false;
    }
    return true;
  }
}

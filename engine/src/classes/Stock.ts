import { Pile, ISerializedPile } from "./Pile";
import { Card } from "./Card";
import { ISerializable } from "../types/ISerializable";

export interface ISerializedStock extends ISerializedPile {}

export interface IStock extends ISerializable<Stock, ISerializedStock> {}

export class Stock extends Pile implements IStock {
  static validateCards(cards: Card[]): void {
    const allAreUpturned = cards.every(c => c.getUpturned() === false);
    if (!allAreUpturned) {
      throw new Error(
        "All cards in the Stock must be turned down before adding!"
      );
    }
  }
  constructor(cards: Card[]) {
    Stock.validateCards(cards);
    super(cards);
  }

  static unserialize({ cards }: ISerializedStock) {
    const unserializedCards = cards.map(c => Card.unserialize(c));
    return new Stock(unserializedCards);
  }

  canAddCards(cards: Card[]): boolean {
    throw new Error(
      "Cannot add cards to the stock, they must be set using `setCards`"
    );
  }

  canRemoveCards(cards: Card[]) {
    if (cards.length > 1) {
      console.warn("cannot remove more than one card from the stock at a time");
      return false;
    }
    return true;
  }

  canSetCards(cards: Card[]) {
    try {
      Stock.validateCards(cards);
    } catch (e) {
      return false;
    }
    return true;
  }
}

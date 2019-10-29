import { Pile } from "./Pile";
import { Card } from "./Card";

export class Stock extends Pile {
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

  canAddCards(cards: Card[]): boolean {
    throw new Error(
      "Cannot add cards to the stock, they must be set using `setCards`"
    );
  }

  canRemoveCards(cards: Card[]) {
    // HACK - replace with actual logic
    return true;
  }

  canSetCards(cards: Card[]) {
    Stock.validateCards(cards);
    return true;
  }
}

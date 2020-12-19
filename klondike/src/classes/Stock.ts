import { Card } from "@cards-js/common/src/classes/Card";
import { Pile, ISerializedPile } from "@cards-js/common/src/classes/Pile";

export class Stock extends Pile {
  static validateCards(cards: Card[]): void {
    const allAreUpturned = cards.every((c) => c.getUpturned() === false);
    if (!allAreUpturned) {
      throw new Error(
        "All cards in the Stock must be turned down before adding!"
      );
    }
  }

  create(cards: Card[]) {
    Stock.validateCards(cards);
    super.create(cards);
    return this;
  }

  unserialize({ cards }: ISerializedPile): Stock {
    const unserializedCards = cards.map((c) => new Card().unserialize(c));

    return this.create(unserializedCards);
  }

  canUserAddCards(): boolean {
    throw new Error(
      "Cannot add cards to the stock, they must be set using `setCards`"
    );
  }

  canUserRemoveCards(cards: Card[]) {
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

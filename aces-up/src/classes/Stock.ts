import { Card, ISerializedPile, Pile } from "@cards-js/common";

export class Stock extends Pile {
  create(cards: Card[]) {
    this.validate(cards);
    super.create(cards);

    return this;
  }

  /**
   * Removes the top four cards in the stock and returns them
   */
  removeTopFourCards(): Card[] {
    return [
      this.removeTopCard(),
      this.removeTopCard(),
      this.removeTopCard(),
      this.removeTopCard(),
    ];
  }

  unserialize({ cards }: ISerializedPile): Stock {
    return this.create(cards.map((c) => new Card().unserialize(c)));
  }

  validate(cards: Card[]) {
    const allAreTurnedDown = cards.every((c) => c.getUpturned() === false);

    if (!allAreTurnedDown) {
      throw new Error("Cannot add or set cards that are not turned down");
    }
  }

  canUserRemoveCards(cards: Card[]) {
    if (cards.length > 1) {
      return {
        valid: false,
        message:
          "Cannot remove more than one card from the Stock at any given time",
      };
    }

    return { valid: true };
  }

  canUserAddCards(cards: Card[]) {
    return {
      valid: false,
      message: "Cannot add cards to the Stock at any given time",
    };
  }
}

import { Card, ISerializedPile, Pile } from "@cards-js/common";

export class Waste extends Pile {
  create(cards: Card[]) {
    this.validate(cards);
    super.create(cards);

    return this;
  }

  unserialize({ cards }: ISerializedPile): Waste {
    return this.create(cards.map((c) => new Card().unserialize(c)));
  }

  validate(cards: Card[]) {
    const allAreUpturned = cards.every((c) => c.getUpturned() === true);

    if (!allAreUpturned) {
      throw new Error("Cannot add or set cards that are not upturned");
    }
  }

  canUserRemoveCards() {
    return {
      valid: false,
      message: "can't remove cards from the waste in Aces Up",
    };
  }

  canUserAddCards(cards: Card[]) {
    if (cards.length > 1) {
      return {
        valid: false,
        message: "Cannot add more than one card to the waste at any given time",
      };
    }

    return { valid: true };
  }
}

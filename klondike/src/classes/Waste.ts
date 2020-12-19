import { ISerializedPile, Pile, Card } from "@cards-js/common";

export class Waste extends Pile {
  static validateCards(cards: Card[]): void {
    const allAreUpturned = cards.every((c) => c.getUpturned() === true);
    if (!allAreUpturned) {
      throw new Error("Cannot add/set cards that are not upturned");
    }
  }

  create(cards: Card[]) {
    Waste.validateCards(cards);
    super.create(cards);

    return this;
  }

  unserialize({ cards }: ISerializedPile): Waste {
    const unserializedCards = cards.map((c) => new Card().unserialize(c));
    return this.create(unserializedCards);
  }

  canUserAddCards(cards: Card[]) {
    try {
      Waste.validateCards(cards);
    } catch (e) {
      return false;
    }

    return true;
  }

  // TODO: remove all canSetCards calls
  canSetCards(cards: Card[]) {
    try {
      Waste.validateCards(cards);
    } catch (e) {
      return false;
    }

    return true;
  }

  canUserRemoveCards(cards: Card[]) {
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

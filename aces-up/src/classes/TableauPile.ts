import {
  Pile,
  Card,
  ISerializedPile,
  areCardsMatching,
} from "@cards-js/common";

export class TableauPile extends Pile {
  create(cards: Card[]) {
    super.create(cards);

    return this;
  }

  unserialize({ cards }: ISerializedPile): TableauPile {
    return this.create(cards.map((c) => new Card().unserialize(c)));
  }

  canUserAddCards(cards: Card[]) {
    if (cards.length > 1) {
      return {
        valid: false,
        message: "Cannot add more than one card to a pile at any given time",
      };
    }

    if (this.getCards().length !== 0) {
      return {
        valid: false,
        message: "Cannot add a card to a non empty pile",
      };
    }

    return {
      valid: true,
    };
  }

  canUserRemoveCards(cards: Card[]) {
    if (cards.length > 1) {
      return {
        valid: false,
        message:
          "Cannot remove more than one card from a pile at any given time",
      };
    }

    if (!areCardsMatching(cards[0], this.getTopCard())) {
      return {
        valid: false,
        message:
          "Cannot remove any card other than the top card of the stack from a Tableau Pile",
      };
    }

    return {
      valid: true,
    };
  }
}

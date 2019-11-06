import { ISerializable } from "../types/ISerializable";
import { Pile, ISerializedPile, IPile } from "./Pile";
import { Card } from "./Card";
import {
  sortCardsBySequence,
  getCardNumericalRank
} from "../helpers/sortCardsBySequence";
import { TSuit } from "../types/TSuit";

const isAlternating = (
  cardA: Card,
  cardB: Card
): { error?: string; ok: boolean } => {
  const cardAColour = getColourForSuit(cardA.getSuit());
  const cardBColour = getColourForSuit(cardB.getSuit());

  if (cardAColour === cardBColour) {
    return {
      ok: false,
      error: "card colours are equal"
    };
  }

  const cardANumericalRank = getCardNumericalRank(cardA.getRank());
  const cardBNumericalRank = getCardNumericalRank(cardB.getRank());

  if (cardANumericalRank === cardBNumericalRank) {
    return {
      ok: false,
      error: "card numerical rank is the same"
    };
  }

  if (cardANumericalRank - cardBNumericalRank !== 1) {
    return {
      ok: false,
      error: "cards are not alternating rank"
    };
  }

  return {
    ok: true
  };
};

const getColourForSuit = (suit: TSuit): "black" | "red" => {
  if (suit === "Clubs") {
    return "black";
  }

  if (suit === "Diamonds") {
    return "red";
  }

  if (suit === "Hearts") {
    return "red";
  }

  if (suit === "Spades") {
    return "black";
  }
};

// export interface ISerializedTableauPile {
//   // cards: ISerializedCard[];
// }

export interface ITableauPile
  extends ISerializable<TableauPile, ISerializedPile> {}

export class TableauPile extends Pile implements ITableauPile {
  constructor(cards: Card[]) {
    // ensure that the first card is ALWAYS turned up
    super(cards);
    this.turnUpTopCard();
  }

  private turnUpTopCard() {
    const cards = this.getCards();
    if (cards.length < 1) {
      return;
    }
    cards[cards.length - 1].turnUp();
  }

  private getCardInPile(cardToFind: Card) {
    return this.getCards().find(
      c =>
        c.getRank() === cardToFind.getRank() &&
        c.getSuit() === cardToFind.getSuit()
    );
  }

  shuffle() {
    throw new Error("Cannot shuffle a TableauPile");
  }

  setCards(cards: Card[]) {
    // turn up top card
    super.setCards(cards);
    this.turnUpTopCard();
  }

  // TODO
  // overwrite - this is a bit hacky as it calls canRemoveCards twice!
  // the solution is to make the generic class Pile, return a boolean if it was successful
  removeCards(cards: Card[]): void {
    const canRemoveCards = this.canRemoveCards(cards);
    super.removeCards(cards);
    if (canRemoveCards) {
      this.turnUpTopCard();
    }
  }

  // TODO - same boat as removeCards
  addCards(cards: Card[]) {
    const sortedCards = sortCardsBySequence(cards, "descending");
    super.addCards(sortedCards);
  }

  canSetCards(cards: Card[]): boolean {
    return true;
  }

  canAddCards(cards: Card[]): boolean {
    const sortedCards = sortCardsBySequence(cards, "descending");
    const cardsInPile = this.getCards();

    if (cardsInPile.length === 0 && sortedCards[0].getRank() !== "King") {
      console.warn("Cannot add non King card as first item on Pile");
      return false;
    }

    let lastCardThroughLoop;

    // validates that they are all alternating
    for (const cardToAdd of sortedCards) {
      if (cardToAdd.getUpturned() === false) {
        console.warn("Cannot add cards as atleast one card is not upturned");
        return false;
      }
      // first card in the loop, set it and continue
      if (typeof lastCardThroughLoop === "undefined") {
        lastCardThroughLoop = cardToAdd;
        continue;
      }
      const cardsAreAlternating = isAlternating(lastCardThroughLoop, cardToAdd);
      if (!cardsAreAlternating.ok) {
        console.warn(cardsAreAlternating.error);
        return false;
      }
      lastCardThroughLoop = cardToAdd;
    }

    // early return because there are no cards in the pile, and we have already validated that everything is alternating
    if (cardsInPile.length === 0 && sortedCards[0].getRank() === "King") {
      return true;
    }
    const cardsAreAlternating = isAlternating(
      cardsInPile[cardsInPile.length - 1],
      sortedCards[0]
    );

    if (!cardsAreAlternating.ok) {
      console.log(
        "Card on top of tableau pile does not alternate with the first card to add"
      );
      return false;
    }

    return true;
  }

  canRemoveCards(cards: Card[]): boolean {
    if (this.getCards().length < 1) {
      console.warn("There are no cards in the pile to remove");
      return false;
    }

    const sortedCards = sortCardsBySequence(cards, "ascending");

    let lastCardThroughLoop: Card;

    // for loop because we might want to early break, can't do that in a forEach loop
    for (const cardToRemove of sortedCards) {
      const matchingCardInPile = this.getCardInPile(cardToRemove);
      if (typeof matchingCardInPile === "undefined") {
        console.warn("Cannot remove card if it does not exist in the pile");
        return false;
      }
      if (matchingCardInPile.getUpturned() === false) {
        console.warn("Cannot remove cards as atleast one card is not upturned");
        return false;
      }
      // first card in the loop, set it and continue
      if (typeof lastCardThroughLoop === "undefined") {
        lastCardThroughLoop = cardToRemove;
        continue;
      }

      const cardsAreAlternating = isAlternating(
        cardToRemove,
        lastCardThroughLoop
      );

      if (!cardsAreAlternating.ok) {
        console.warn(cardsAreAlternating.error);
        return false;
      }

      lastCardThroughLoop = cardToRemove;
    }

    // if nothing in the for loop failed, we are okay to add the cards
    return true;
  }

  static unserialize(unserializedData: ISerializedPile): TableauPile {
    return new TableauPile(
      unserializedData.cards.map(c => Card.unserialize(c))
    );
  }
}

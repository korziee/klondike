import { Pile, ISerializedPile } from "./Pile";
import { TSuit } from "../types/TSuit";
import { Card } from "./Card";
import { getNextRankForCurrentRank } from "../helpers/getNextRankForRank";

export interface ISerializedFoundationPile extends ISerializedPile {
  suit: TSuit;
}

/**
 * The FoundationPile is to be used within a Foundation.
 *
 * It extends a Pile, and applies validation rules for a Klondike "Foundation"
 */
export class FoundationPile extends Pile {
  constructor(private suit: TSuit) {
    super([]);
  }

  serialize(): ISerializedFoundationPile {
    return {
      ...super.serialize(),
      suit: this.suit
    };
  }

  static unserialize({
    cards,
    suit
  }: ISerializedFoundationPile): FoundationPile {
    const pile = super.unserialize({ cards });
    const foundationPile = new FoundationPile(suit);
    foundationPile.setCards(pile.getCards());
    return foundationPile;
  }

  // this method overwrites
  canSetCards() {
    return true;
  }

  canRemoveCards(cards: Card[]): boolean {
    const cardsInPile = this.getCards();
    const cardOnTopOfPile = cardsInPile[cardsInPile.length - 1];
    if (cards.length > 1) {
      console.warn(
        "Cannot remove more than one card from the foundation pile at a time"
      );
      return false;
    }
    if (cards[0].getSuit() !== this.suit) {
      console.warn("Cannot remove card of a different suit");
      return false;
    }
    if (this.getCards().length === 0) {
      console.warn("The pile is empty, cannot remove cards");
      return false;
    }

    if (cards[0].getRank() !== cardOnTopOfPile.getRank()) {
      console.warn(
        "Cannot remove card as it is not equal to the card at the top of pile"
      );
      return false;
    }

    return true;
  }

  canAddCards(cards: Card[]): boolean {
    // early exit if not all same suit, not performant but easy to read!
    const allCardsAreCorrectSuit = cards.every(c => c.getSuit() === this.suit);
    if (!allCardsAreCorrectSuit) {
      return false;
    }

    const cardsInPile = this.getCards();
    const cardOnTopOfStack = cardsInPile[cardsInPile.length - 1];
    let lastCardInLoop = cardOnTopOfStack;

    // now that we know each card is the same suit, we only need to make sure that they are incrementing
    for (const card of cards) {
      // the foundation pile for this suit is empty,
      if (typeof lastCardInLoop === "undefined") {
        // first card must be an Ace
        if (card.getRank() === "Ace") {
          lastCardInLoop = card;
          continue;
        }
        // if not, return false for this validation function
        return false;
      }
      const nextRank = getNextRankForCurrentRank(lastCardInLoop.getRank());
      if (card.getRank() !== nextRank) {
        // break out of the loop early here as we cannot add all the cards!
        return false;
      }
      lastCardInLoop = card;
    }

    return true;
  }
}

import { Card } from "../classes/Card";
import { TRank } from "../types/TRank";

export const getCardNumericalRank = (rank: TRank): number => {
  if (rank === "King") {
    return 13;
  }

  if (rank === "Queen") {
    return 12;
  }

  if (rank === "Jack") {
    return 11;
  }

  if (rank === "Ace") {
    return 1;
  }

  return parseInt(rank, 10);
};

/**
 * Sorts cards in descending order!
 * Does so by sequencing them by rank and suit, e.g. red king, black queen, red jack, etc...
 *
 * @note this does guarantee the order if cards being sorted are not correctly alternating
 */
export const sortCardsBySequence = (
  cards: Card[],
  order: "descending" | "ascending"
): Card[] => {
  const sortedCards: Card[] = [];

  // king, queen, jack...etc
  cards.forEach(card => {
    // no need to sort
    if (sortedCards.length === 0) {
      sortedCards.push(card);
      return;
    }

    const rank = card.getRank();
    const suit = card.getSuit();
    const cardNumericalRank = getCardNumericalRank(rank);

    const lastSortedCard = sortedCards[sortedCards.length - 1];
    const lastSortedCardNumericalRank = getCardNumericalRank(
      lastSortedCard.getRank()
    );

    // if its a lower rank, just add it.
    // if they are the same rank, add it.
    // if they are the same rank, but a different suit, something has gone wrong, so add it, as the validations using this method should fail
    if (cardNumericalRank <= lastSortedCardNumericalRank) {
      sortedCards.push(card);
      return;
    }

    // need to keep climbing up the tree until we find a card that is either the same or less than this card.
    // when climbing, if we find something that is the same, we just insert it AFTER the same card
    const match = sortedCards.findIndex(
      c => getCardNumericalRank(c.getRank()) <= cardNumericalRank
    );

    if (match !== -1) {
      // we found a match, we should splice in the value directly after.
      sortedCards.splice(match, 0, card);
      return;
    }

    // we are at the top of the stack, insert it at the beginning.

    sortedCards.unshift(card);
  });

  if (order === "ascending") {
    return sortedCards.reverse();
  }

  return sortedCards;
};

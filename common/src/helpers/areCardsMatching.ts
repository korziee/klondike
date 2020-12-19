import { Card } from "../classes/Card";

export function areCardsMatching(card1: Card, card2: Card): boolean {
  return (
    card1.getRank() === card2.getRank() && card1.getSuit() === card2.getSuit()
  );
}

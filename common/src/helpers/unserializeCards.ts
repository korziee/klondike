import { Card, ISerializedCard } from "../classes/Card";

export function unserializeCards(cards: ISerializedCard[]): Card[] {
  return cards.map((c) => new Card().create(c.suit, c.rank, c.upturned));
}

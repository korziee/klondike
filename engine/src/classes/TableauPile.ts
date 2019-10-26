import { ISerializable } from "../types/ISerializable";
import { Pile, ISerializedPile, IPile } from "./Pile";
import { Card } from "./Card";

export class TableauPile extends Pile {
  constructor(cards: Card[]) {
    super(cards);
  }

  canSetCards(cards: Card[]): boolean {}
  canAddCards(cards: Card[]): boolean {}
  canRemoveCards(cards: Card[]): boolean {}
}

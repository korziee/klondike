import { Pile } from "./Pile";
import { Card } from "./Card";

export class Stock extends Pile {
  canAddCards(cards: Card[]) {}
  canRemoveCards(cards: Card[]) {}
}

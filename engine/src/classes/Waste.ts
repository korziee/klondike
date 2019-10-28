import { Pile } from "./Pile";
import { Card } from "./Card";

export class Waste extends Pile {
  canAddCards(cards: Card[]) {}
  canRemoveCards(cards: Card[]) {}
}

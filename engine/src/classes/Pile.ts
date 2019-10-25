import { Card, ISerializedCard } from "./Card";
import { shuffle } from "@korziee/helpers";
import { ISerializable } from "../types/ISerializable";

export interface ISerializedPile {
  cards: ISerializedCard[];
}

export interface IPile extends ISerializable<Pile, ISerializedPile> {
  getCards(): Card[];
  setCards(cards: Card[]): void;
  addCards(cards: Card[]): void;
  removeCards(amount: number): Card[];
  clear(): Card[];
  shuffle(): void;

  // validation rules
  canRemoveCards(amount: number): boolean;
  canAddCards(cards: Card[]): boolean;
}

export class Pile implements IPile {
  constructor(private cards: Card[]) {}

  canRemoveCards(amount: number): boolean {
    throw new Error("Method is abstract, implemented method to use");
  }
  canAddCards(cards: Card[]): boolean {
    throw new Error("Method is abstract, implemented method to use");
  }

  serialize() {
    return {
      cards: this.cards.map(c => c.serialize())
    };
  }

  static unserialize({ cards }: ISerializedPile) {
    return new Pile(cards.map(c => Card.unserialize(c)));
  }

  getCards(): Card[] {
    return this.cards;
  }

  setCards(cards: Card[]): void {
    this.cards = cards;
  }

  addCards(cards: Card[]): void {
    this.cards.push(...cards);
  }

  removeCards(amount: number): Card[] {
    // we use slice over splice here as it does not mutate the original array.
    // it's alot more code, but less error prone!
    const cardsToBeRemoved = this.cards.slice(-amount);
    const cardsToSet = [];

    for (let i = 0; i < this.cards.length - amount; i += 1) {
      cardsToSet.push(this.cards[i]);
    }

    this.cards = cardsToSet;

    return cardsToBeRemoved;
  }

  clear(): Card[] {
    // get copy
    const cardsThatWereCleared = [...this.cards];
    this.cards = [];
    return cardsThatWereCleared;
  }

  /**
   * Uses the lodash method _.shuffle to shuffle the array.
   *
   * @note Lodash shuffle uses the fisher yates algoritm to shuffle
   */
  shuffle(): void {
    const shuffledCards = shuffle<Card>(this.cards);
    this.cards = shuffledCards;
  }
}

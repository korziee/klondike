import { Card } from "./Card";
import { shuffle } from "@korziee/helpers";

export interface IPile {
  getCards(): Card[];
  setCards(cards: Card[]): void;
  addCards(cards: Card[]): void;
  removeCards(amount: number): Card[];
  clear(): Card[];
  shuffle(): void;
}

export class Pile implements IPile {
  constructor(private cards: Card[]) {}

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

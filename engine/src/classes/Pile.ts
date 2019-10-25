import { Card, ISerializedCard } from "./Card";
import { shuffle } from "@korziee/helpers";
import { ISerializable } from "../types/ISerializable";
import * as _ from "lodash";

export interface ISerializedPile {
  cards: ISerializedCard[];
}

export interface IPile extends ISerializable<Pile, ISerializedPile> {
  getCards(): Card[];
  setCards(cards: Card[]): void;
  addCards(cards: Card[]): void;
  removeCards(cards: Card[]): void;
  clear(): Card[];
  shuffle(): void;

  // validation rules
  canRemoveCards(cards: Card[]): boolean;
  canAddCards(cards: Card[]): boolean;
  canSetCards(cards: Card[]): boolean;
}

export class Pile implements IPile {
  constructor(private cards: Card[]) {}

  canRemoveCards(cards: Card[]): boolean {
    throw new Error("Method is abstract, implement method to use");
  }
  canAddCards(cards: Card[]): boolean {
    throw new Error("Method is abstract, implement method to use");
  }
  canSetCards(cards: Card[]): boolean {
    throw new Error("Method is abstract, implement method to use");
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
    if (!this.canSetCards(cards)) {
      console.warn("Set cards validation failed");
      return;
    }
    this.cards = cards;
  }

  addCards(cards: Card[]): void {
    if (!this.canAddCards(cards)) {
      console.warn("Add cards validation failed");
      return;
    }

    this.cards.push(...cards);
  }

  removeCards(cards: Card[]): void {
    if (!this.canRemoveCards(cards)) {
      console.warn("Remove cards validation failed");
      return;
    }

    // find all cards that match the cards parameter and remove
    this.cards = this.cards.filter(card => {
      const isInRemoveList = cards.find(
        c => card.getRank() === c.getRank() && card.getSuit() === c.getSuit()
      );
      return !isInRemoveList;
    });
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

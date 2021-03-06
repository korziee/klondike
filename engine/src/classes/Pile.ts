import { Card, ISerializedCard } from "./Card";
import { shuffle } from "@korziee/helpers";
import { ISerializable } from "../types/ISerializable";

export interface ISerializedPile {
  cards: ISerializedCard[];
}

export interface IPile extends ISerializable<Pile, ISerializedPile> {
  getCards(): Card[];
  getTopCard(): Card | null;
  setCards(cards: Card[]): void;
  addCards(cards: Card[]): void;
  removeCards(cards: Card[]): boolean;
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
      cards: this.cards.map((c) => c.serialize()),
    };
  }

  static unserialize({ cards }: ISerializedPile) {
    return new Pile(cards.map((c) => Card.unserialize(c)));
  }

  getTopCard(): Card | null {
    const amountOfCards = this.cards.length;
    return amountOfCards > 0 ? this.cards[amountOfCards - 1] : null;
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

  /**
   * If the pile has duplicates, this will only the first card it finds on the stack (from the back)
   */
  removeCards(cards: Card[]): boolean {
    if (!this.canRemoveCards(cards)) {
      console.warn("Remove cards validation failed");
      return false;
    }

    let cardsRemovedCount = 0;

    // find all cards that match the cards parameter and remove
    this.cards = this.cards.filter((card) => {
      const isInRemoveList = cards.find(
        (c) => card.getRank() === c.getRank() && card.getSuit() === c.getSuit()
      );

      if (isInRemoveList) {
        cardsRemovedCount += 1;
      }

      return !isInRemoveList;
    });

    if (cardsRemovedCount !== cards.length) {
      console.warn(
        "An inequal amount of cards were removed, this likely means that the pile did not contain all of the cards that were asked to be removed"
      );
    }

    return true;
  }

  clear(): Card[] {
    // get copy
    const cardsThatWereCleared = [...this.cards];
    this.cards = [];
    return cardsThatWereCleared;
  }

  shuffle(): void {
    const shuffledCards = shuffle<Card>(this.cards);
    this.cards = shuffledCards;
  }
}

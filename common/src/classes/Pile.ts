import { Card, ISerializedCard } from "./Card";
import { shuffle } from "@korziee/helpers";
import { Serializable } from "./Serializable";

export interface ISerializedPile {
  cards: ISerializedCard[];
}

export interface IValidationResult {
  valid: boolean;
  /**
   * Explains why the validation failed
   */
  message?: string;
}

export interface IPile {
  getCards(): Card[];
  getTopCard(): Card | null;
  setCards(cards: Card[]): void;
  addCards(cards: Card[]): void;
  removeCards(cards: Card[]): boolean;
  clear(): Card[];
  shuffle(): void;

  // validation rules
  canUserRemoveCards(cards: Card[]): IValidationResult;
  canUserAddCards(cards: Card[]): IValidationResult;
}

export abstract class Pile extends Serializable implements IPile {
  private cards: Card[];

  create(cards: Card[]) {
    this.cards = cards;
  }

  abstract canUserRemoveCards(cards: Card[]): IValidationResult;
  abstract canUserAddCards(cards: Card[]): IValidationResult;

  serialize(): ISerializedPile {
    return {
      cards: this.cards.map((c) => c.serialize()),
    };
  }

  abstract unserialize(unserializedPile: any): any;

  getTopCard(): Card | null {
    const amountOfCards = this.cards.length;
    return amountOfCards > 0 ? this.cards[amountOfCards - 1] : null;
  }

  getCards(): Card[] {
    return this.cards;
  }

  setCards(cards: Card[]): void {
    this.cards = cards;
  }

  addCards(cards: Card[]): void {
    if (!this.canUserAddCards(cards)) {
      console.warn("Add cards validation failed");
      return;
    }

    this.cards.push(...cards);
  }

  removeTopCard(): Card | null {
    return this.cards.pop();
  }

  /**
   * If the pile has duplicates, this will only the first card it finds on the stack (from the back)
   */
  removeCards(cards: Card[]): boolean {
    if (!this.canUserRemoveCards(cards)) {
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

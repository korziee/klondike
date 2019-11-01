import { ISerializable } from "../types/ISerializable";
import { Card } from "./Card";
import { ISerializedFoundation } from "./Foundation";
import { ISerializedTableau } from "./Tableau";
import { ISerializedWaste } from "./Waste";
import { ISerializedStock } from "./Stock";

type GameLocation = "tableau" | "foundation" | "waste" | "stock";

// describes moving a card
export interface IMove {
  from: GameLocation;
  // you can never move cards to the stock!
  to: Omit<GameLocation, "stock">;
  cards: Card[];
  meta?: {
    // used when moving cards from/to/between the tableua
    pile?: number;
  };
}

export interface ISerializedKlondikeGame {
  history: IMove[];
  tableau: ISerializedTableau;
  foundation: ISerializedFoundation;
  waste: ISerializedWaste;
  stock: ISerializedStock;
  // probably score and other metrics when they are added!
}

export interface IKlondikeGame
  extends ISerializable<KlondikeGame, ISerializedKlondikeGame> {
  getHistory(): IMove[];
  getHints(): IMove[] | null;
  validateMove(move: IMove): boolean;
  makeMove(move: IMove): void;
  /**
   * Starts a new game by resetting the game state, filling out the tableau and
   * clearing the foundation.
   */
  start(): void;
  /**
   * Puts all the cards back into the stock and shuffles.
   */
  reset(): void;
}

export class KlondikeGame implements IKlondikeGame {
  serialize(): ISerializedKlondikeGame {
    return null;
  }
  static unserialize(serializedGame: ISerializedKlondikeGame) {}
  start() {}
  reset() {}
  validateMove(move: IMove): boolean {
    return null;
  }
  makeMove(move: IMove): void {}
  getHints(): IMove[] | null {
    return null;
  }
  getHistory(): IMove[] {
    return null;
  }
}

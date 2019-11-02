import { ISerializable } from "../types/ISerializable";
import { Card } from "./Card";
import { ISerializedFoundation, Foundation } from "./Foundation";
import { ISerializedTableau, Tableau } from "./Tableau";
import { ISerializedWaste, Waste } from "./Waste";
import { ISerializedStock, Stock } from "./Stock";

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
  history: IMove[];
  tableau: Tableau;
  foundation: Foundation;
  waste: Waste;
  stock: Stock;
}

export class KlondikeGame implements IKlondikeGame {
  public history: IMove[] = [];
  public tableau: Tableau;
  public foundation: Foundation;
  public waste: Waste;
  public stock: Stock;

  serialize(): ISerializedKlondikeGame {
    return {
      foundation: this.foundation.serialize(),
      history: this.history,
      stock: this.stock.serialize(),
      tableau: this.tableau.serialize(),
      waste: this.waste.serialize()
    };
  }
  static unserialize(serializedGame: ISerializedKlondikeGame): KlondikeGame {
    const game = new KlondikeGame();
    game.foundation = Foundation.unserialize(serializedGame.foundation);
    game.tableau = Tableau.unserialize(serializedGame.tableau);
    game.waste = Waste.unserialize(serializedGame.waste);
    game.stock = Stock.unserialize(serializedGame.stock);
    return game;
  }

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

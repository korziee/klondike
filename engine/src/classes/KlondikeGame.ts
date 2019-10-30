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
}

export class KlondikeGame implements IKlondikeGame {}

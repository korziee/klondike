import { ISerializable } from "../types/ISerializable";
import { Pile, ISerializedPile } from "./Pile";
import { Card } from "./Card";

// type GameLocation = "tableau" | "foundation" | "waste" | "stock";

// // describes moving a card
// export interface IMove {
//   from: GameLocation;
//   // you can never move cards to the stock!
//   to: Omit<GameLocation, "stock">;
//   cards: Card[];
//   meta?: {
//     // used when moving cards from/to/between the tableua
//     pile?: number;
//   };
// }

// export interface ISerializedKlondikeGame {
//   history: IMove[];
// }

// export interface IKlondikeGame
//   extends ISerializable<KlondikeGame, ISerializedKlondikeGame> {
//   getHistory(): IMove[];
//   getHint(): IMove | null;
// }

// export class KlondikeGame implements IKlondikeGame {}

// export interface IStock extends ISerializable<Stock, ISerializedPile> {}

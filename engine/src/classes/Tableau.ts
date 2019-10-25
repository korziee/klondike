// import { ISerializable } from "../types/ISerializable";
// import { Pile } from "./Pile";
// import { Card } from "./Card";

// export interface ISerializedTableau {
//   setPiles(piles: Pile[]): void;
//   /** non zero based (e.g. pile 1 will return the first pile!) */
//   getPile(pileNumber: number): void;

//   /**
//    * Magic method that adds a card to the first place possible on the tableau
//    */
//   addCardToTableau(card: Card): void;
//   /**
//    * Validation method for `addCardToTableau`
//    */
//   canAddCardToTableua(card: Card): boolean;

// }

// export interface ITableau extends ISerializable<Tableau, ISerializedTableau> {}

// export class Tableau implements ITableau {}

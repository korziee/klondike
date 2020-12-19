import { ISerializable, Card, ISerializedPile } from "@cards-js/common";

import { TableauPile } from "./TableauPile";

export interface ISerializedTableau {
  piles: ISerializedPile[];
}

export interface ITableau extends ISerializable<Tableau, ISerializedTableau> {
  /** non zero based (e.g. pile 1 will return the first pile!) */
  getTableauPile(pileNumber: number): TableauPile;

  /**
   * Magic method that adds a card to the first place possible on the tableau
   */
  addCardAnywhere(card: Card): void;

  /**
   * Validation method for `addCardAnywhere`
   *
   * return the index of the pile if it can be added, otherwise null!
   */
  canAddCardAnywhere(card: Card): number | null;

  getPiles(): TableauPile[];
}

export class Tableau implements ITableau {
  constructor(private piles: TableauPile[]) {}

  getPiles() {
    return this.piles;
  }

  /** non zero based (e.g. pile 1 will return the first pile!) */
  getTableauPile(pileNumber: number): TableauPile {
    const pile = this.piles[pileNumber - 1];
    if (typeof pile === "undefined") {
      throw new Error("Pile does not exist on the Tableau!");
    }
    return pile;
  }

  /**
   * Magic method that adds a card to the first place possible on the tableau
   */
  addCardAnywhere(card: Card): void {
    const pileToAddTo = this.canAddCardAnywhere(card);
    if (pileToAddTo === null) {
      console.warn("Cannot add card anywhere");
      return;
    }

    this.piles[pileToAddTo].addCards([card]);
    return;
  }

  /**
   * Validation method for `addCardAnywhere`
   */
  canAddCardAnywhere(card: Card): number | null {
    // go through each pile and try to add
    const canAdd = this.piles.findIndex((pile) => {
      return pile.canUserAddCards([card]);
    });

    if (canAdd === -1) {
      return null;
    }

    return canAdd;
  }

  static unserialize(serializedData: ISerializedTableau): Tableau {
    const piles = serializedData.piles.map((p) => TableauPile.unserialize(p));
    const tableau = new Tableau(piles);
    return tableau;
  }

  serialize(): ISerializedTableau {
    return {
      piles: this.piles.map((s) => s.serialize()),
    };
  }
}

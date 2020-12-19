import {
  Card,
  ISerializedPile,
  Pile,
  Serializable,
  unserializeCards,
} from "@cards-js/common";

import { TableauPile } from "./TableauPile";

export interface ISerializedTableau {
  piles: ISerializedPile[];
}

export class Tableau extends Serializable {
  piles: TableauPile[];

  private validate(piles: TableauPile[]) {
    if (piles.length !== 4) {
      throw new Error("There must be four piles in an Aces Up Tableau");
    }
  }

  create(piles: TableauPile[]) {
    this.validate(piles);
    this.piles = piles;

    return this;
  }
  /**
   * Given an array of cards (4 or less), this method will spread them across the tableau piles.
   */
  spreadCardsAcrossPiles(cards: Card[]): void {
    if (cards.length > 4) {
      throw new Error(
        "A maximum of four cards can be spread across the tableau piles"
      );
    }

    cards.forEach((card, pileIndex) => {
      this.piles[pileIndex].addCards([card]);
    });
  }

  /**
   * This method will check to see if there is a spread of 4 suits on the tableau
   */
  areTopCardsAllDifferentSuits(): boolean {
    const amountOfSuits = this.piles.reduce((suits, pile) => {
      // no cards on this pile, which means there is not an even spread of 4 unique suits.
      if (pile.getCards().length === 0) {
        return suits;
      }

      const pileSuit = pile.getTopCard().getSuit();

      if (suits.includes(pileSuit)) {
        return suits;
      }

      suits.push(pileSuit);
      return suits;
    }, []);

    return amountOfSuits.length === 4;
  }

  serialize(): ISerializedTableau {
    return {
      piles: this.piles.map((p) => p.serialize()),
    };
  }

  unserialize({ piles }: ISerializedTableau): Tableau {
    return this.create(
      piles.map((pile) => {
        return new TableauPile().create(unserializeCards(pile.cards));
      })
    );
  }
}

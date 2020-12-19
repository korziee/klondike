// TODO: work out why this is bugged
// import { shuffle } from "@korziee/helpers";
import {
  areCardsMatching,
  getSerializedDeck,
  ISerializedPile,
  IValidationResult,
  Serializable,
  unserializeCards,
} from "@cards-js/common";
import shuffle from "lodash.shuffle";
import { getCardNumericalRank } from "../helpers/getCardNumericalRank";
import { ISerializedMove, Move } from "./Move";
import { Stock } from "./Stock";
import { ISerializedTableau, Tableau } from "./Tableau";
import { TableauPile } from "./TableauPile";
import { Waste } from "./Waste";

export interface IHistory {
  move?: ISerializedMove;
  state: ISerializedAcesUpGame;
}

export interface ISerializedAcesUpGame {
  history: IHistory[];
  tableau: ISerializedTableau;
  waste: ISerializedPile;
  stock: ISerializedPile;
}

export interface IMoveValidationResult {
  valid: boolean;
  invalidMessage?: string;
}

export interface IAcesUpGame {
  /**
   * Validates whether or not a move can be made, will return an object that describes the validity and also optionally an invalid reason
   */
  validateMove(move: Move): IMoveValidationResult;

  draw(): void;

  /**
   * Undoes the last move in the history stack
   */
  undo(): boolean;

  makeMove(move: Move): void;

  /**
   * Starts the game and deals out the initial bunch of cards
   */
  deal(): void;

  // getAvailableMoves(): Move[] | null;

  tableau: Tableau;
  history: IHistory[];
  waste: Waste;
  stock: Stock;
}

export class AcesUpGame extends Serializable implements IAcesUpGame {
  /**
   * When the user starts a game, they might have multiple of the same suit on the tableau, and until the tableau has one of each suit, this is not considered done, and therefore they should only be drawing one card at a time.
   */
  private userHasFinishedPreStart = false;

  public history!: IHistory[];
  public tableau!: Tableau;
  public waste!: Waste;
  public stock!: Stock;

  validateMove(move: Move): IValidationResult {
    if (!areCardsMatching(move.meta.fromPile.getTopCard(), move.card)) {
      return {
        valid: false,
        message: "Cannot move card if it is not on the top of the pile",
      };
    }

    if (move.from === "tableau" && move.to === "waste") {
      // check if there are other cards lower
      const cardToRemoveRank = getCardNumericalRank(move.card.getRank());

      // check if any other pile has a card of the same suit but with a higher rank
      const higherRankedCardExistsInTableau = this.tableau.piles.some(
        (pile) => {
          const topCard = pile.getTopCard();

          if (!topCard || topCard.getSuit() !== move.card.getSuit()) {
            return false;
          }

          const topCardRank = getCardNumericalRank(topCard.getRank());

          return topCardRank > cardToRemoveRank;
        }
      );

      if (!higherRankedCardExistsInTableau) {
        return {
          valid: false,
          message:
            "There is no higher ranked card in the tableau of the same suit, cannot move to waste",
        };
      }
    }

    if (move.from === "tableau" && move.to === "tableau") {
      if (move.meta.toPile.getCards().length > 0) {
        return {
          valid: false,
          message: "Cannot move card to a non empty tableau pile",
        };
      }
    }

    return { valid: true };
  }

  makeMove(move: Move) {
    const validationResult = this.validateMove(move);

    if (!validationResult.valid) {
      console.warn(validationResult.message);
      return;
    }

    this.history.push({
      move: move.serialize(),
      state: this.serialize(),
    });

    if (move.from === "tableau" && move.to === "waste") {
      const removedCard = move.meta.fromPile.removeTopCard();

      this.waste.addCards([removedCard]);
      return;
    }

    if (move.from === "tableau" && move.to === "tableau") {
      const cardToMove = move.meta.fromPile.removeTopCard();

      move.meta.toPile.setCards([cardToMove]);
      return;
    }
  }

  /**
   * Undoes the previous move
   *
   * @returns Boolean dictating whether or not the undo was successful
   */
  undo(): boolean {
    // using history, we need to look at the last move, and set the state back using the ovveride `set` methods
    if (this.history.length === 0) {
      return false;
    }

    const lastMove = this.history[this.history.length - 1];

    const { history, stock, tableau, waste } = new AcesUpGame().unserialize(
      lastMove.state
    );

    this.stock = stock;
    this.history = history;
    this.tableau = tableau;
    this.waste = waste;

    this.history.pop();

    return true;
  }

  draw() {
    if (!this.userHasFinishedPreStart) {
      const tableauIsFull = this.tableau.piles.every(
        (pile) => pile.getCards().length > 0
      );

      if (this.tableau.areTopCardsAllDifferentSuits() || tableauIsFull) {
        this.userHasFinishedPreStart = true;
      }
    }

    if (!this.userHasFinishedPreStart) {
      // find empty pile and put card.
      const card = this.stock.removeTopCard();
      const pile = this.tableau.piles.find((p) => p.getCards().length === 0);

      card.turnUp();
      pile.addCards([card]);

      this.history.push({
        state: this.serialize(),
      });

      return;
    }

    this.history.push({
      state: this.serialize(),
    });

    this.tableau.spreadCardsAcrossPiles(
      this.stock.removeTopFourCards().map((c) => {
        c.turnUp();
        return c;
      })
    );
  }

  deal() {
    this.history = [];
    this.stock = new Stock().create(
      shuffle(unserializeCards(getSerializedDeck()))
    );

    this.tableau = new Tableau().create([
      new TableauPile().create([]),
      new TableauPile().create([]),
      new TableauPile().create([]),
      new TableauPile().create([]),
    ]);

    this.waste = new Waste().create([]);

    // add four cards to the tableau to start off
    this.tableau.spreadCardsAcrossPiles(
      this.stock.removeTopFourCards().map((c) => {
        c.turnUp();
        return c;
      })
    );
  }

  unserialize(game: ISerializedAcesUpGame): AcesUpGame {
    this.tableau = new Tableau().unserialize(game.tableau);
    this.history = game.history;
    this.stock = new Stock().unserialize(game.stock);
    this.waste = new Waste().unserialize(game.waste);

    return this;
  }

  serialize() {
    return {
      history: this.history,
      tableau: this.tableau.serialize(),
      waste: this.waste.serialize(),
      stock: this.stock.serialize(),
    };
  }
}

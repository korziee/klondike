import { ISerializable } from "../types/ISerializable";
import { Card } from "./Card";
import { ISerializedFoundation, Foundation } from "./Foundation";
import { ISerializedTableau, Tableau } from "./Tableau";
import { ISerializedWaste, Waste } from "./Waste";
import { ISerializedStock, Stock } from "./Stock";
import { TableauPile } from "./TableauPile";
import { FoundationPile } from "./FoundationPile";
import * as _ from "lodash";
import { getSerializedDeck } from "../helpers/getSerializedDeck";

type GameLocation = "tableau" | "foundation" | "waste" | "stock";

// describes moving a card
export interface IMove {
  from: GameLocation;
  // you can never move cards to the stock!
  to: "tableau" | "foundation" | "waste";
  cards: Card[];
  meta?: {
    // used when moving cards from/to/between the tableua
    fromPile?: number;
    toPile?: number;
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

export interface IMoveValidationResult {
  valid: boolean;
  invalidMessage?: string;
}

export interface IKlondikeGame
  extends ISerializable<KlondikeGame, ISerializedKlondikeGame> {
  getHistory(): IMove[];
  getHints(): IMove[] | null;
  validateMove(move: IMove): IMoveValidationResult;

  // returns a boolean denoting whether or not an actual draw was made
  draw(): boolean;

  makeMove(move: IMove): void;

  deal(): void;
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

  draw(): boolean {
    // if there are no cards in the stock or waste, we cannot draw
    if (
      this.stock.getCards().length === 0 &&
      this.waste.getCards().length === 0
    ) {
      return false;
    }

    // stock is empty, we need to transfer all of the cards from the waste into the stock
    if (this.stock.getCards().length === 0) {
      const cardsInWaste = this.waste.getCards();
      const cardsInWasteTurnedDown = cardsInWaste.map(c => {
        c.turnDown();
        return c;
      });
      this.waste.setCards([]);
      this.stock.setCards(cardsInWasteTurnedDown);
      // this was technically a move, so we return true
      return true;
    }

    // TODO: might be nice to have a helper on pile that pops the card off the top of the stack
    // as this will be a repeated pattern.
    const topOfStockCard = this.stock.getCards()[
      this.stock.getCards().length - 1
    ];
    this.stock.removeCards([topOfStockCard]);

    // turn it up before we add it to the waste!
    topOfStockCard.turnUp();

    this.waste.addCards([topOfStockCard]);

    return true;
  }

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

  /**
   * Resets the game state and deals the cards out
   */
  deal() {
    this._reset();

    const shuffledCards = _.shuffle(getSerializedDeck()).map(
      c => new Card(c.suit, c.rank, c.upturned)
    );

    // sets up the tableau
    for (let i = 1; i <= 7; i += 1) {
      const cardsToSet = shuffledCards.splice(0, i);
      cardsToSet[cardsToSet.length - 1].turnUp();
      this.tableau.getTableauPile(i).setCards(cardsToSet);
    }

    // set the cards on the stock
    this.stock.setCards(shuffledCards);
  }

  // is only public for testing purposes
  _reset() {
    this.tableau = new Tableau([
      new TableauPile([]),
      new TableauPile([]),
      new TableauPile([]),
      new TableauPile([]),
      new TableauPile([]),
      new TableauPile([]),
      new TableauPile([])
    ]);
    this.foundation = new Foundation();
    this.waste = new Waste([]);
    this.stock = new Stock([]);
  }

  validateMove(move: IMove): IMoveValidationResult {
    const returner = (valid: boolean, invalidMessage?: string) => ({
      valid,
      invalidMessage
    });

    const specificGameValidations = () => {
      // @ts-ignore
      if (move.to === "stock") {
        return returner(false, "cards cannot be moved to the stock");
      }

      if (typeof move.cards === "undefined" || move.cards.length === 0) {
        return returner(false, "must provide cards within the move");
      }

      if (move.from === "foundation" && move.to === "foundation") {
        return returner(false, "cannot move cards between the foundation");
      }

      if (move.to === "waste" && move.from !== "stock") {
        return returner(
          false,
          "cards can only be moved into the waste from the stock"
        );
      }

      if (move.to === "tableau" && typeof move.meta.toPile === "undefined") {
        return returner(
          false,
          "if moving to the tableau, you must specify the pile you want to move to"
        );
      }

      return returner(true);
    };

    const validateMovesToTableau = (): IMoveValidationResult => {
      // validate that tableau pile
      const canAddCardsToTableauPile = this.tableau
        .getTableauPile(move.meta.toPile)
        .canAddCards(move.cards);

      if (!canAddCardsToTableauPile) {
        return returner(
          false,
          `cannot add those cards to tableau pile: ${move.meta.toPile}`
        );
      }

      return returner(true);
    };

    const validateMovesToWaste = (): IMoveValidationResult => {
      if (!this.waste.canAddCards(move.cards)) {
        return returner(false, "cannot add these specific cards to the waste");
      }
      return returner(true);
    };

    const validateMovesToFoundation = (): IMoveValidationResult => {
      if (
        !this.foundation
          .getPileForSuit(move.cards[0].getSuit())
          .canAddCards(move.cards)
      ) {
        return returner(
          false,
          "cannot add these specific cards to the foundation"
        );
      }
      return returner(true);
    };

    const validateMovesFromWaste = (): IMoveValidationResult => {
      if (!this.waste.canRemoveCards(move.cards)) {
        return returner(false, "cannot remove these cards from the waste");
      }

      return returner(true);
    };

    const validateMovesFromStock = (): IMoveValidationResult => {
      if (!this.stock.canRemoveCards(move.cards)) {
        return returner(false, "cannot remove these cards from the stock");
      }

      return returner(true);
    };

    const validateMovesFromTableau = (): IMoveValidationResult => {
      if (
        !this.tableau
          .getTableauPile(move.meta.fromPile)
          .canRemoveCards(move.cards)
      ) {
        return returner(
          false,
          "cannot remove these specific cards from the tableau pile"
        );
      }

      return returner(true);
    };

    const validateMovesFromFoundation = (): IMoveValidationResult => {
      if (
        !this.foundation
          .getPileForSuit(move.cards[0].getSuit())
          .canRemoveCards(move.cards)
      ) {
        return returner(
          false,
          "cannot remove these specific cards from the foundation"
        );
      }
      return returner(true);
    };

    const validationLookupTable = {
      waste: {
        from: validateMovesFromWaste,
        to: validateMovesToWaste
      },
      stock: {
        from: validateMovesFromStock
      },
      tableau: {
        from: validateMovesFromTableau,
        to: validateMovesToTableau
      },
      foundation: {
        from: validateMovesFromFoundation,
        to: validateMovesToFoundation
      }
    };

    // do the initial validations
    const genericValidations = specificGameValidations();

    if (!genericValidations.valid) {
      return genericValidations;
    }

    // do the specific move to/from/between validations
    const moveFromValidation = validationLookupTable[move.from].from();
    const moveToValidation = validationLookupTable[move.to].to();

    if (!moveFromValidation.valid) {
      return moveFromValidation;
    }

    if (!moveToValidation.valid) {
      return moveToValidation;
    }

    return returner(true);
  }

  makeMove(move: IMove): void {
    const moveValidation = this.validateMove(move);
    if (!moveValidation.valid) {
      return;
    }
    if (move.from === "foundation" && move.to === "tableau") {
      this.foundation
        .getPileForSuit(move.cards[0].getSuit())
        .removeCards(move.cards);
      this.tableau.getTableauPile(move.meta.toPile).addCards(move.cards);
      return;
    }
    if (move.from === "waste") {
      this.waste.removeCards(move.cards);
      if (move.to === "tableau") {
        this.tableau.getTableauPile(move.meta.toPile).addCards(move.cards);
      }
      if (move.to === "foundation") {
        this.foundation.addCard(move.cards[0]);
      }
      return;
    }
    if (move.from === "tableau") {
      this.tableau.getTableauPile(move.meta.fromPile).removeCards(move.cards);
      if (move.to === "tableau") {
        this.tableau.getTableauPile(move.meta.toPile).addCards(move.cards);
      }
      if (move.to === "foundation") {
        this.foundation.addCard(move.cards[0]);
      }
      return;
    }

    throw Error("Unknown move!");
  }

  getHints(): IMove[] | null {
    return null;
  }

  getHistory(): IMove[] {
    return null;
  }
}

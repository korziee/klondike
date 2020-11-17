import { ISerializable } from "../types/ISerializable";
import { Card } from "./Card";
import { ISerializedFoundation, Foundation } from "./Foundation";
import { ISerializedTableau, Tableau } from "./Tableau";
import { ISerializedWaste, Waste } from "./Waste";
import { ISerializedStock, Stock } from "./Stock";
import { TableauPile } from "./TableauPile";
import { getSerializedDeck } from "../helpers/getSerializedDeck";
import { ISerializedMove, Move } from "./Move";
import * as _ from "lodash";

export interface IHistory {
  move: ISerializedMove;
  state: ISerializedKlondikeGame;
}

export interface ISerializedKlondikeGame {
  history: IHistory[];
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

export interface ICanMoveCardAnywhereResult extends IMoveValidationResult {
  to?: "tableau" | "foundation";
  toPile?: number;
}

export interface IFindCardResult {
  location: "stock" | "waste" | "tableau" | "foundation";
  locationPile?: number;
}

export interface IKlondikeGame
  extends ISerializable<KlondikeGame, ISerializedKlondikeGame> {
  getHistory(): IHistory[];
  getHints(): Move[] | null;
  validateMove(move: Move): IMoveValidationResult;

  // returns a boolean denoting whether or not an actual draw was made
  draw(): boolean;

  canDrawCard(): boolean;

  // undo's the last move in the history!
  undo(): void;

  makeMove(move: Move): void;

  deal(): void;

  canMoveCardsAnywhere(cards: Card[]): ICanMoveCardAnywhereResult;

  moveCardsAnywhere(cards: Card[]): ICanMoveCardAnywhereResult;

  getAvailableMoves(): Move[] | null;

  history: IHistory[];
  tableau: Tableau;
  foundation: Foundation;
  waste: Waste;
  stock: Stock;
}

export class KlondikeGame implements IKlondikeGame {
  public history: IHistory[] = [];
  public tableau: Tableau;
  public foundation: Foundation;
  public waste: Waste;
  public stock: Stock;

  private findCardInGame(card: Card): IFindCardResult {
    const isInStock = this.stock
      .getCards()
      .find((c) => _.isEqual(c.serialize(), card.serialize()));
    if (isInStock) {
      return {
        location: "stock",
      };
    }
    const isInWaste = this.waste
      .getCards()
      .find((c) => _.isEqual(c.serialize(), card.serialize()));
    if (isInWaste) {
      return {
        location: "waste",
      };
    }
    const isInFoundation = this.foundation
      .getPileForSuit(card.getSuit())
      .getCards()
      .find((c) => _.isEqual(c.serialize(), card.serialize()));
    if (isInFoundation) {
      return {
        location: "foundation",
      };
    }
    for (let i = 1; i <= 7; i += 1) {
      const isInTableau = this.tableau
        .getTableauPile(i)
        .getCards()
        .find((c) => _.isEqual(c.serialize(), card.serialize()));

      if (isInTableau) {
        return {
          location: "tableau",
          locationPile: i,
        };
      }
    }

    throw new Error("cannot find card in game!");
  }

  public getAvailableMoves(): Move[] {
    const moves: Move[] = [];

    const topOfWaste = this.waste.getTopCard();

    this.foundation.getPiles().forEach((pile) => {
      // can move the card from the top of the waste pile to either; foundation
      if (topOfWaste) {
        if (pile.canAddCards([topOfWaste])) {
          moves.push(
            new Move({ from: "waste", to: "foundation", cards: [topOfWaste] })
          );
        }
      }

      // can move the card from the foundation to the tableau
      const topCardOfPile = pile.getTopCard();

      if (topCardOfPile) {
        const canAdd = this.tableau.canAddCardAnywhere(topCardOfPile);

        console.log("from foundation tableau", topCardOfPile, canAdd);

        if (canAdd !== -1) {
          moves.push(
            new Move({
              from: "foundation",
              to: "tableau",
              cards: [topCardOfPile],
              meta: {
                toPile: canAdd,
              },
            })
          );
        }
      }
    });

    this.tableau.getPiles().forEach((pile, pileIndex) => {
      if (topOfWaste) {
        // can move the card from the top of the waste pile to either; foundation or tableau
        if (pile.canAddCards([topOfWaste])) {
          moves.push(
            new Move({
              from: "waste",
              to: "tableau",
              cards: [topOfWaste],
              meta: {
                toPile: pileIndex + 1,
              },
            })
          );
        }
      }

      const movableCards = pile.getMovableGroupsOfCards();

      movableCards.forEach((cards) => {
        if (cards.length === 1) {
          // can move a single card from the tableau to the foundation
          const canAddToFoundation = this.foundation
            .getPileForSuit(cards[0].getSuit())
            .canAddCards(cards);

          if (canAddToFoundation) {
            moves.push(
              new Move({
                cards: cards,
                from: "tableau",
                to: "foundation",
                meta: {
                  fromPile: pileIndex + 1,
                },
              })
            );
          }
        }

        // can move an array of cards from the tableau to the tableau
        this.tableau.getPiles().forEach((pileToMoveTo, pileToMoveToIndex) => {
          if (pileToMoveToIndex === pileIndex) {
            return;
          }

          if (pileToMoveTo.canAddCards(cards)) {
            moves.push(
              new Move({
                from: "tableau",
                to: "tableau",
                cards: cards,
                meta: {
                  fromPile: pileIndex + 1,
                  toPile: pileToMoveToIndex + 1,
                },
              })
            );
          }
        });
      });
    });

    return moves;
  }

  canMoveCardsAnywhere(cards: Card[]): ICanMoveCardAnywhereResult {
    if (typeof cards === "undefined" || cards.length < 1) {
      return {
        invalidMessage: "Cannot move cards if no cards are passed",
        valid: false,
      };
    }

    // can only add one card to foundation at a time
    if (cards.length === 1) {
      const canAddToFoundation = this.foundation
        .getPileForSuit(cards[0].getSuit())
        .canAddCards(cards);
      if (canAddToFoundation) {
        return {
          to: "foundation",
          valid: true,
        };
      }
    }

    for (let i = 1; i <= 7; i += 1) {
      const canAdd = this.tableau.getTableauPile(i).canAddCards(cards);
      // will return true on the first pile
      if (canAdd) {
        return {
          to: "tableau",
          toPile: i,
          valid: true,
        };
      }
    }

    return {
      invalidMessage: "cannot add to either the tableau or foundation",
      valid: false,
    };
  }

  moveCardsAnywhere(cards: Card[]): ICanMoveCardAnywhereResult {
    const canMove = this.canMoveCardsAnywhere(cards);

    if (!canMove.valid) {
      return canMove;
    }

    // this is not tested well enough here
    this.history.push({
      move: null,
      state: this.serialize(),
    });

    const cardsToRemove = cards.map(this.findCardInGame);

    cardsToRemove.forEach((c) => {
      switch (c.location) {
        case "stock":
          this.stock.removeCards(cards);
          break;
        case "waste":
          this.waste.removeCards(cards);
          break;
        case "foundation":
          this.foundation.getPileForSuit(cards[0].getSuit()).removeCards(cards);
          break;
        case "tableau":
          this.tableau.getTableauPile(c.locationPile).removeCards(cards);
          break;
        default:
          break;
      }
    });

    if (canMove.to === "tableau") {
      this.tableau.getTableauPile(canMove.toPile).addCards(cards);
    }
    if (canMove.to === "foundation") {
      this.foundation.getPileForSuit(cards[0].getSuit()).addCards(cards);
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

    const {
      foundation,
      history,
      stock,
      tableau,
      waste,
    } = KlondikeGame.unserialize(lastMove.state);

    this.foundation = foundation;
    this.stock = stock;
    this.history = history;
    this.tableau = tableau;
    this.waste = waste;

    this.history.pop();

    return true;
  }

  canDrawCard(): boolean {
    if (
      this.stock.getCards().length === 0 &&
      this.waste.getCards().length === 0
    ) {
      return false;
    }

    return true;
  }

  draw(): boolean {
    // if there are no cards in the stock or waste, we cannot draw
    if (!this.canDrawCard()) {
      return false;
    }

    // add this into the history so that user's can undo this
    this.history.push({
      move: null,
      state: this.serialize(),
    });

    // stock is empty, we need to transfer all of the cards from the waste into the stock
    if (this.stock.getCards().length === 0) {
      const cardsInWaste = this.waste.getCards();
      const cardsInWasteTurnedDown = cardsInWaste
        .map((c) => {
          c.turnDown();
          return c;
        })
        .reverse(); // we reverse the cards because we have been pushing onto the stack in the stock
      this.waste.setCards([]);
      this.stock.setCards(cardsInWasteTurnedDown);
      // this was technically a move, so we return true
      return true;
    }

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
      waste: this.waste.serialize(),
    };
  }
  static unserialize(serializedGame: ISerializedKlondikeGame): KlondikeGame {
    const game = new KlondikeGame();
    game.foundation = Foundation.unserialize(serializedGame.foundation);
    game.tableau = Tableau.unserialize(serializedGame.tableau);
    game.waste = Waste.unserialize(serializedGame.waste);
    game.stock = Stock.unserialize(serializedGame.stock);
    game.history = serializedGame.history;
    return game;
  }

  /**
   * Resets the game state and deals the cards out
   */
  deal() {
    this._reset();

    const shuffledCards = _.shuffle(getSerializedDeck()).map(
      (c) => new Card(c.suit, c.rank, c.upturned)
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
      new TableauPile([]),
    ]);
    this.foundation = new Foundation();
    this.waste = new Waste([]);
    this.stock = new Stock([]);
    this.history = [];
  }

  validateMove(move: Move): IMoveValidationResult {
    const returner = (valid: boolean, invalidMessage?: string) => ({
      valid,
      invalidMessage,
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
        to: validateMovesToWaste,
      },
      stock: {
        from: validateMovesFromStock,
      },
      tableau: {
        from: validateMovesFromTableau,
        to: validateMovesToTableau,
      },
      foundation: {
        from: validateMovesFromFoundation,
        to: validateMovesToFoundation,
      },
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

  makeMove(move: Move): void {
    const moveValidation = this.validateMove(move);
    if (!moveValidation.valid) {
      return;
    }

    this.history.push({
      move: move.serialize(),
      state: this.serialize(),
    });

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

  getHints(): Move[] | null {
    return null;
  }

  getHistory(): IHistory[] {
    return this.history;
  }
}

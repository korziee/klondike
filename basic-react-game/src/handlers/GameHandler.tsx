import React, { useState, useRef, useCallback } from "react";
import { KlondikeGame, Move } from "engine/lib/";
import { ICardPileCard } from "../components/CardPile";
import { Card } from "engine/lib/classes/Card";
import { TSuit } from "engine/lib/types/TSuit";
import { useKeyPress } from "../hooks/useKeyPress";
import * as _ from "lodash";
import { GameContext, IGameContext } from "../contexts/GameContext";

interface ISelectedCard {
  card: Card;
  from: "tableau" | "foundation" | "waste";
  fromPile?: number;
}

/**
 * What this handler needs to:
 *
 * Needs to interract with the KlondikeGame class
 * on any "move", it should force a re-render
 */
export const GameHandler: React.FC = ({ children }) => {
  // suit, rank
  const [selectedCard, setSelectedCard] = useState<ISelectedCard | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const gameRef = useRef(new KlondikeGame());
  const escapePressed = useKeyPress("Escape");

  const clearSelectedCard = () => setSelectedCard(null);

  if (escapePressed && selectedCard !== null) {
    clearSelectedCard();
  }

  // eslint-disable-next-line
  const [force, setForce] = React.useState<number>(0);

  const forceRender = () => {
    setForce(f => f + 1);
  };

  const start = useCallback(() => {
    gameRef.current.deal();
    // start the game
    setGameStarted(true);
    forceRender();
  }, []);

  const undo = useCallback(() => {
    gameRef.current.undo();
    clearSelectedCard();
    forceRender();
  }, []);

  const draw = useCallback(() => {
    if (!gameStarted) {
      return;
    }
    gameRef.current.draw();
    clearSelectedCard();
    forceRender();
  }, [gameStarted]);

  const onEmptyPileClicked = (
    from: "tableau" | "foundation" | "waste" | "stock",
    pile?: number
  ) => {
    if (from === "stock") {
      draw();
      return;
    }
    if (from === "waste") {
      // clicking on an empty waste is always a no-op
      return;
    }
    // if nothing is selected, this is a noop
    if (!selectedCard) {
      return;
    }

    // need to consider moving cards from the tableau to an empty tableau,
    let cards;

    if (selectedCard.from === "tableau") {
      const cardsInTableau = gameRef.current.tableau
        .getTableauPile(selectedCard.fromPile!)
        .getCards();

      const indexOfCardSelected = cardsInTableau.findIndex(
        card =>
          selectedCard.card.getSuit() === card.getSuit() &&
          selectedCard.card.getRank() === card.getRank()
      );

      const cardsToMove = cardsInTableau.slice(
        indexOfCardSelected,
        cardsInTableau.length
      );

      cards = cardsToMove;
    } else {
      cards = [selectedCard.card];
    }

    const move = new Move({
      from: selectedCard.from,
      to: from,
      cards,
      meta: {
        fromPile: selectedCard.fromPile,
        toPile: pile
      }
    });

    const canMakeMove = gameRef.current.validateMove(move);

    if (!canMakeMove.valid) {
      clearSelectedCard();
      return;
    }

    gameRef.current.makeMove(move);
    clearSelectedCard();
  };

  const onCardSelected = (
    card: Card,
    from: "tableau" | "foundation" | "waste",
    fromPile?: number
  ) => {
    // if true, this is the first card to be selected, not a move
    if (selectedCard === null) {
      setSelectedCard({ card, from, fromPile });
      return;
    }

    // user is trying to make a move, we need to build out the move object, validate, make move and then force re-render
    // if they are trying to move from the tableau, we need to get a list of all the cards that exist below the selected card

    let cards;

    if (selectedCard.from === "tableau") {
      const cardsInTableau = gameRef.current.tableau
        .getTableauPile(selectedCard.fromPile!)
        .getCards();

      const indexOfCardSelected = cardsInTableau.findIndex(
        card =>
          selectedCard.card.getSuit() === card.getSuit() &&
          selectedCard.card.getRank() === card.getRank()
      );

      const cardsToMove = cardsInTableau.slice(
        indexOfCardSelected,
        cardsInTableau.length
      );

      cards = cardsToMove;
    } else {
      cards = [selectedCard.card];
    }

    // now that we have done the accumulating of the tableau cards, lets see if it's a "magic add"
    if (_.isEqual(selectedCard.card, card)) {
      // selecting the same card, likely a "magic move attempt"
      const canMove = gameRef.current.canMoveCardsAnywhere(cards);
      if (!canMove.valid) {
        // console.log(canMove);
        return;
      }
      gameRef.current.moveCardsAnywhere(cards);
      clearSelectedCard();
      return;
    }

    const move = new Move({
      from: selectedCard.from,
      to: from,
      cards,
      meta: {
        fromPile: selectedCard.fromPile,
        toPile: fromPile
      }
    });

    const canMakeMove = gameRef.current.validateMove(move);

    if (!canMakeMove.valid) {
      clearSelectedCard();
      return;
    }

    gameRef.current.makeMove(move);
    clearSelectedCard();
  };

  const getStockPileCards = (): ICardPileCard[] => {
    if (!gameStarted) {
      return [];
    }

    return gameRef.current.stock.getCards().map(
      (card): ICardPileCard => {
        return {
          card,
          onClick: draw,
          selected: false
        };
      }
    );
  };

  const getWastePileCards = (): ICardPileCard[] => {
    if (!gameStarted) {
      return [];
    }

    return gameRef.current.waste.getCards().map(
      (card): ICardPileCard => {
        return {
          card,
          onClick: () => onCardSelected(card, "waste"),
          selected:
            selectedCard !== null &&
            selectedCard.card.getSuit() === card.getSuit() &&
            selectedCard.card.getRank() === card.getRank()
        };
      }
    );
  };

  const getTableauPiles = (): ICardPileCard[][] => {
    if (!gameStarted) {
      return Array(7).fill([]);
    }
    const tableau: ICardPileCard[][] = [];

    for (let i = 1; i <= 7; i += 1) {
      tableau[i - 1] = gameRef.current.tableau
        .getTableauPile(i)
        .getCards()
        .map(
          (card): ICardPileCard => {
            return {
              card,
              onClick: () => onCardSelected(card, "tableau", i),
              selected:
                selectedCard !== null &&
                selectedCard.card.getSuit() === card.getSuit() &&
                selectedCard.card.getRank() === card.getRank()
            };
          }
        );
    }
    return tableau;
  };

  const getFoundationPiles = (): ICardPileCard[][] => {
    if (!gameStarted) {
      return Array(4).fill([]);
    }
    const foundation: ICardPileCard[][] = [];

    (["Clubs", "Spades", "Diamonds", "Hearts"] as TSuit[]).forEach(
      (suit, i) => {
        foundation[i] = gameRef.current.foundation
          .getPileForSuit(suit)
          .getCards()
          .map(
            (card): ICardPileCard => {
              return {
                card,
                onClick: () => onCardSelected(card, "foundation", i + 1),
                selected:
                  selectedCard !== null &&
                  selectedCard.card.getSuit() === card.getSuit() &&
                  selectedCard.card.getRank() === card.getRank()
              };
            }
          );
      }
    );
    return foundation;
  };

  // TODO - memoize
  const providerValue: IGameContext = {
    emptyPileClick: onEmptyPileClicked,
    foundation: getFoundationPiles(),
    waste: getWastePileCards(),
    tableau: getTableauPiles(),
    stock: getStockPileCards(),
    undo: undo,
    draw: draw,
    start: start
  };

  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

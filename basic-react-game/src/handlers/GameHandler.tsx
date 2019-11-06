import React, { useState, useEffect, useRef } from "react";
import { KlondikeGame, Move } from "engine/lib/";
import { ICardPileCard } from "../components/CardPile";
import { Card } from "engine/lib/classes/Card";
import { TSuit } from "engine/lib/types/TSuit";

// TODO - this card has not had any refactoring, just code thrown at it
// alot of the move logic needs to be generecised and the methods and cards should be memoized as to not cause unnesccesary re-renders

export interface IGameContext {
  waste: ICardPileCard[];
  stock: ICardPileCard[];
  tableau: ICardPileCard[][];
  foundation: ICardPileCard[][];
  emptyPileClick: (
    from: "tableau" | "foundation" | "waste" | "stock",
    pile?: number
  ) => void;
  draw: () => void;
  undo: () => void;
}

const getDefaultGameContextState = (): IGameContext => ({
  waste: null!,
  stock: null!,
  tableau: null!,
  foundation: null!,
  emptyPileClick: () => {},
  draw: () => {},
  undo: () => {}
});

export const GameContext = React.createContext<IGameContext>(
  getDefaultGameContextState()
);

const useFirstRenderCompleted = () => {
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    setCompleted(true);
  }, []);
  return completed;
};

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
  const firstRenderCompleted = useFirstRenderCompleted();

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.keyCode !== 27) {
        return;
      }
      setSelectedCard(null);
    };
    window.addEventListener("keydown", eventHandler);
    return () => {
      window.removeEventListener("keydown", eventHandler);
    };
  }, []);

  // eslint-disable-next-line
  const [force, setForce] = React.useState<number>(0);

  const { current: game } = useRef(new KlondikeGame());

  if (!firstRenderCompleted) {
    game.deal();
  }

  const onEmptyPileClicked = (
    from: "tableau" | "foundation" | "waste" | "stock",
    pile?: number
  ) => {
    if (from === "stock") {
      game.draw();
      setForce(f => f + 1);
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
      const cardsInTableau = game.tableau
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

    const canMakeMove = game.validateMove(move);

    if (!canMakeMove.valid) {
      setSelectedCard(null);
      return;
    }

    game.makeMove(move);
    setSelectedCard(null);
    setForce(f => f + 1);
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
      const cardsInTableau = game.tableau
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
        toPile: fromPile
      }
    });

    const canMakeMove = game.validateMove(move);

    if (!canMakeMove.valid) {
      setSelectedCard(null);
      return;
    }

    game.makeMove(move);
    setSelectedCard(null);
    setForce(f => f + 1);
  };

  const stock = game.stock.getCards().map(
    (card): ICardPileCard => {
      return {
        card,
        onClick: () => {
          game.draw();
          setForce(f => f + 1);
        },
        selected: false
      };
    }
  );

  const waste = game.waste.getCards().map(
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

  const tableau: ICardPileCard[][] = [];

  for (let i = 1; i <= 7; i += 1) {
    tableau[i - 1] = game.tableau
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

  const foundation: ICardPileCard[][] = [];

  (["Clubs", "Spades", "Diamonds", "Hearts"] as TSuit[]).forEach((suit, i) => {
    foundation[i] = game.foundation
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
  });

  return (
    <GameContext.Provider
      value={{
        emptyPileClick: onEmptyPileClicked,
        foundation: foundation,
        waste: waste,
        tableau: tableau,
        stock: stock,
        undo: () => {
          game.undo();
          setForce(f => f + 1);
        },
        draw: () => {
          game.draw();
          setForce(f => f + 1);
        }
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

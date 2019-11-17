import React from "react";
import { ICardPileCard } from "../components/CardPile";

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
  start: () => void;
}

const getDefaultGameContextState = (): IGameContext => ({
  waste: null!,
  stock: null!,
  tableau: null!,
  foundation: null!,
  emptyPileClick: () => {},
  draw: () => {},
  undo: () => {},
  start: () => {}
});

export const GameContext = React.createContext<IGameContext>(
  getDefaultGameContextState()
);

import React, { useRef } from "react";
import { Card } from "engine/lib/classes/Card";
import "./CardPile.css";
import { GameCard } from "../GameCard";

// @ts-ignore
import useDimensions from "react-use-dimensions";
// CardPile
// - Name: <CardPile />
// - Constraints:
//     - If no cards, it should be made evident that it is empty
// - Props:
//     - cards: ICard[]; // this is ordered!, the last item on the stack is what is rendered
//     - fanned: boolean; // if true, the cards are fanned downwards
//     - fanDirection: “down” | “right” | “left”; // describes which way the cards should fan when stacked
// - Description:
//     - Displays a pile of cards, if fanned, will fan it the prescribed direction

export interface ICardPileProps {
  cards: Card[];
  fanned: boolean;
  /**
   * If fanned is true, a direction must be selected
   *
   * @default "down"
   */
  fanDirection?: "down" | "right" | "left";
}

/**
 * Left fan looks strange
 */
export const CardPile: React.FC<ICardPileProps> = ({
  cards,
  fanned,
  fanDirection = "down"
}) => {
  const [ref, { width }] = useDimensions();

  return (
    <div ref={ref} className="card-pile">
      {cards.map((c, i) => {
        const style: React.CSSProperties = {};
        if (fanned) {
          if (fanDirection === "down") {
            style.top = i === 0 ? undefined : i * (width / 3);
          }
          if (fanDirection === "right") {
            style.left = i === 0 ? undefined : i * (width / 6.5);
          }
          if (fanDirection === "left") {
            style.right = i === 0 ? 0 : i * (width / 6.5);
            style.right = style.right - width / 3.2;
          }
        }
        return (
          <div className="card" style={style}>
            <GameCard card={c} onClick={console.log} selected={false} />
          </div>
        );
      })}
    </div>
  );
};

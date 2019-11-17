import { Card } from "engine/lib/classes/Card";
import React, { useMemo } from "react";
import useDimensions from "react-use-dimensions";
import { GameCard } from "../GameCard";
import "./CardPile.css";

export interface ICardPileCard {
  card: Card;
  onClick: () => void;
  selected: boolean;
}

export interface ICardPileProps {
  cards: ICardPileCard[];
  onEmptyPileClick: () => void;
  fanned: boolean;
  /**
   * If fanned is true, a direction must be selected
   *
   * @default "down"
   */
  fanDirection?: "down" | "right" | "left";
  pileWidth: number;
  pileXPosition: number;
}

export const CardPile: React.FC<ICardPileProps> = ({
  cards,
  fanned,
  onEmptyPileClick,
  fanDirection = "down",
  pileWidth,
  pileXPosition
}) => {
  const [ref, { width }] = useDimensions();

  const shouldShowBorder = !cards || !(cards && cards.length > 0);

  const cardPileStyles = useMemo(
    (): React.CSSProperties => ({
      position: "absolute",
      width: pileWidth,
      left: pileXPosition,
      border: shouldShowBorder ? "1px solid red" : ""
    }),
    [shouldShowBorder, pileWidth, pileXPosition]
  );

  return (
    <div ref={ref} style={cardPileStyles} onClick={onEmptyPileClick}>
      {width &&
        cards.map((c, i) => {
          // cannot memoize this
          const style: React.CSSProperties = {
            position: "absolute"
          };

          if (fanned) {
            if (fanDirection === "down") {
              style.top = i === 0 ? undefined : i * (width / 3);
            } else {
              console.warn("only down fan is implemented");
            }
          }
          return (
            <div style={style} key={`${c.card.getRank()}-${c.card.getSuit()}`}>
              <GameCard
                card={c.card}
                onClick={c.onClick}
                selected={c.selected}
              />
            </div>
          );
        })}
    </div>
  );
};

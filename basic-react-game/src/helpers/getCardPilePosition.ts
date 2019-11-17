import { getCardPileWidth } from "./getCardPileWidth";
import { getCardPileSpacing } from "./getCardPileSpacing";

export const getCardPilePosition = (
  columnIndex: number,
  containerWidth: number
) => {
  // initial card position (0)
  let cardPosition = 0;
  // move further against the x axis depending on the index of the card
  cardPosition += getCardPileWidth(containerWidth) * columnIndex;
  // add in the gaps
  cardPosition += getCardPileSpacing(containerWidth) * columnIndex;

  return cardPosition;
};

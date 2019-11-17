import { getCardPileSpacing } from "./getCardPileSpacing";

export const getCardPileWidth = (containerWidth: number) => {
  // based on the width, get the spacing
  return containerWidth / 7 - getCardPileSpacing(containerWidth);
};

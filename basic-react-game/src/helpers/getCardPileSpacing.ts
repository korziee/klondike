export const getCardPileSpacing = (containerWidth: number) => {
  const cardSpacingPercentage = 2 / 100; // 2%

  return cardSpacingPercentage * containerWidth;
};

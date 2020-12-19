import { TRank } from "@cards-js/common";

export const getCardNumericalRank = (rank: TRank): number => {
  if (rank === "King") {
    return 13;
  }

  if (rank === "Queen") {
    return 12;
  }

  if (rank === "Jack") {
    return 11;
  }

  if (rank === "Ace") {
    return 14;
  }

  return parseInt(rank, 10);
};

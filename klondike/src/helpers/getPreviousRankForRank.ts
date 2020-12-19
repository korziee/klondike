import { TRank } from "@cards-js/common";

export const getPreviousRankForRank = (rank: TRank): TRank => {
  switch (rank) {
    case "2":
      return "Ace";
    case "3":
      return "2";
    case "4":
      return "3";
    case "5":
      return "4";
    case "6":
      return "5";
    case "7":
      return "6";
    case "8":
      return "7";
    case "9":
      return "8";
    case "10":
      return "9";
    case "Jack":
      return "10";
    case "Queen":
      return "Jack";
    case "King":
      return "Queen";
    default:
      break;
  }
};

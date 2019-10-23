import { TRank } from "../types/TRank";

export const getRandomRank = (): TRank => {
  const randIndex = Math.floor(Math.random() * 13);
  switch (randIndex) {
    case 0:
      return "Ace";
    case 1:
      return "2";
    case 2:
      return "3";
    case 3:
      return "4";
    case 4:
      return "5";
    case 5:
      return "6";
    case 6:
      return "7";
    case 7:
      return "8";
    case 8:
      return "9";
    case 9:
      return "10";
    case 10:
      return "Jack";
    case 11:
      return "Queen";
    case 12:
      return "King";
  }
};

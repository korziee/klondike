import { TSuit } from "../types/TSuit";

export const getRandomSuit = (): TSuit => {
  const randIndex = Math.floor(Math.random() * 4);
  switch (randIndex) {
    case 0:
      return "Clubs";
    case 1:
      return "Diamonds";
    case 2:
      return "Hearts";
    case 3:
      return "Spades";
  }
};

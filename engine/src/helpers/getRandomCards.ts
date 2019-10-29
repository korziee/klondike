import { Card } from "../classes/Card";

import { getRandomSuit } from "./getRandomSuit";

import { getRandomRank } from "./getRandomRank";

export const getRandomCards = (amount: number): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < amount; i += 1) {
    const randomSuit = getRandomSuit();
    const randomRank = getRandomRank();
    cards.push(new Card(randomSuit, randomRank, false));
  }

  return cards;
};

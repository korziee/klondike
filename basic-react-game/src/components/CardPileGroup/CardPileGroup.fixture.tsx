import React from "react";
import { CardPileGroup } from "./CardPileGroup";
import { Card } from "engine/lib/classes/Card";
import { CardPile, ICardPileCard } from "../CardPile/CardPile";

const cards: ICardPileCard[] = [
  {
    card: new Card("Clubs", "3", false),
    onClick: () => console.log("3 of clubs clicked"),
    selected: false
  },
  {
    card: new Card("Clubs", "5", false),
    onClick: () => console.log("5 of clubs clicked"),
    selected: false
  },
  {
    card: new Card("Clubs", "6", true),
    onClick: () => console.log("6 of clubs clicked"),
    selected: false
  },
  {
    card: new Card("Clubs", "7", true),
    onClick: () => console.log("7 of clubs clicked"),
    selected: false
  },
  {
    card: new Card("Clubs", "8", true),
    onClick: () => console.log("8 of clubs clicked"),
    selected: true
  },
  {
    card: new Card("Clubs", "King", true),
    onClick: () => console.log("King of clubs clicked"),
    selected: false
  }
];

export default {
  standard: () => (
    <CardPileGroup>
      <CardPile cards={cards} fanned fanDirection="down" />
      <CardPile cards={cards} fanned fanDirection="down" />
      <CardPile cards={cards} fanned fanDirection="down" />
      <CardPile cards={cards} fanned fanDirection="down" />
      <CardPile cards={cards} fanned fanDirection="down" />
      <CardPile cards={cards} fanned fanDirection="down" />
    </CardPileGroup>
  )
};

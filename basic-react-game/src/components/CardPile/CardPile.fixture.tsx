import React from "react";
import { CardPile, ICardPileCard } from "./CardPile";
import { Card } from "engine/lib/classes/Card";

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
  unfanned: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile cards={cards} fanned={false} onEmptyPileClick={console.log} />
    </div>
  ),
  FannedRight: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile
        cards={cards.slice(3, 6)}
        onEmptyPileClick={console.log}
        fanned
        fanDirection="right"
      />
    </div>
  ),
  FannedLeft: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile
        cards={cards.slice(3, 6)}
        onEmptyPileClick={console.log}
        fanned
        fanDirection="left"
      />
    </div>
  ),
  FannedDown: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile
        cards={cards}
        fanned
        onEmptyPileClick={console.log}
        fanDirection="down"
      />
    </div>
  )
};

import React from "react";
import { CardPile } from "./CardPile";
import { Card } from "engine/lib/classes/Card";

const cards = [
  new Card("Clubs", "3", false),
  new Card("Clubs", "3", false),
  new Card("Clubs", "3", false),
  new Card("Clubs", "3", true),
  new Card("Clubs", "3", true),
  new Card("Clubs", "4", true),
  new Card("Clubs", "5", true)
];

export default {
  unfanned: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile cards={cards} fanned={false} />
    </div>
  ),
  FannedRight: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile cards={cards.slice(3, 6)} fanned fanDirection="right" />
    </div>
  ),
  FannedLeft: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile cards={cards.slice(3, 6)} fanned fanDirection="left" />
    </div>
  ),
  FannedDown: () => (
    <div style={{ maxWidth: "200px" }}>
      <CardPile cards={cards} fanned fanDirection="down" />
    </div>
  ),
  Multiple: () => {
    return (
      <div style={{ display: "flex" }}>
        <CardPile cards={cards} fanned fanDirection="down" />
        <CardPile cards={cards} fanned fanDirection="down" />
        <CardPile cards={cards} fanned fanDirection="down" />
        <CardPile cards={cards} fanned fanDirection="down" />
        <CardPile cards={cards} fanned fanDirection="down" />
      </div>
    );
  }
};

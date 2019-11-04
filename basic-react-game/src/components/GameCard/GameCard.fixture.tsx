import React from "react";
import { GameCard } from "./GameCard";
import { Card } from "engine/lib/classes/Card";
import { getSerializedDeck } from "engine/lib/helpers/getSerializedDeck";

const deck = getSerializedDeck().map(c => new Card(c.suit, c.rank, true));

export default {
  faceup: () => <GameCard card={new Card("Clubs", "10", true)} />,
  facedown: () => <GameCard card={new Card("Clubs", "10", false)} />,
  "face-card": () => <GameCard card={new Card("Clubs", "King", true)} />,
  "whole-deck": () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {deck.map(c => (
        <div style={{ width: "80px" }}>
          <GameCard card={c} />
        </div>
      ))}
    </div>
  )
};

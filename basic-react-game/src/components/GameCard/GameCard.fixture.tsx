import React, { useState } from "react";
import { GameCard } from "./GameCard";
import { Card } from "engine/lib/classes/Card";
import { getSerializedDeck } from "engine/lib/helpers/getSerializedDeck";

const deck = getSerializedDeck().map(c => new Card(c.suit, c.rank, true));

export default {
  "faceup-not-selected": () => (
    <GameCard
      onClick={() => console.log("clicked")}
      selected={false}
      card={new Card("Clubs", "10", true)}
    />
  ),
  "faceup-selected": () => (
    <GameCard
      onClick={() => console.log("clicked")}
      selected={true}
      card={new Card("Clubs", "10", true)}
    />
  ),
  "face-down": () => (
    <GameCard
      onClick={() => console.log("clicked")}
      selected={false}
      card={new Card("Clubs", "10", false)}
    />
  ),
  "face-card": () => (
    <GameCard
      onClick={() => console.log("clicked")}
      selected={false}
      card={new Card("Clubs", "King", true)}
    />
  ),
  WholeDeck: () => {
    const [selectedCard, setSelectedCard] = useState<
      [string | null, string | null]
    >([null, null]);
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {deck.map(c => (
          <div style={{ width: "80px" }}>
            <GameCard
              onClick={() => setSelectedCard([c.getRank(), c.getSuit()])}
              selected={
                selectedCard[0] === c.getRank() &&
                selectedCard[1] === c.getSuit()
              }
              card={c}
            />
          </div>
        ))}
      </div>
    );
  },
  stacked: () => {
    return (
      <div>
        <div style={{ position: "absolute" }}>
          <GameCard
            onClick={() => console.log("clicked queen")}
            selected={false}
            card={new Card("Clubs", "Queen", true)}
          />
        </div>
        <div style={{ position: "absolute", top: "70px" }}>
          <GameCard
            onClick={() => console.log("clicked king")}
            selected={false}
            card={new Card("Clubs", "King", true)}
          />
        </div>
      </div>
    );
  }
};

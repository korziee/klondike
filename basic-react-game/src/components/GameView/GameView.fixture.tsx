import React from "react";
import { GameView } from "./GameView";
import { GameHandler } from "../../handlers/GameHandler";

export default {
  game: () => (
    <GameHandler>
      <GameView />
    </GameHandler>
  )
};

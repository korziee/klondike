import React from "react";
import { GameHandler } from "./handlers/GameHandler";
import { GameView } from "./components/GameView/GameView";
import { TopBar } from "./components/TopBar";

export const App: React.FC = () => {
  return (
    <GameHandler>
      <TopBar />
      <GameView />
    </GameHandler>
  );
};

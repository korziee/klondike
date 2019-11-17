import React from "react";
import "./App.css";
import { GameHandler } from "./handlers/GameHandler";
import { GameView } from "./components/GameView/GameView";

export const App: React.FC = () => {
  return (
    <div className="App">
      <GameHandler>
        <GameView />
      </GameHandler>
    </div>
  );
};

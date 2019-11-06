import React from "react";
import "./App.css";
import { GameView } from "./components/GameView";
import { GameHandler } from "./handlers/GameHandler";

export const App: React.FC = () => {
  return (
    <div className="App">
      <GameHandler>
        <GameView />
      </GameHandler>
    </div>
  );
};

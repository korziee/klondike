import React, { useContext } from "react";
import "./TopBar.css";
import Button from "antd/es/button/button";
import { GameContext } from "../../contexts/GameContext";

export const TopBar: React.FC = () => {
  const { exportSave, undo, start } = useContext(GameContext);
  return (
    <div className="TopBar">
      <Button className="button" onClick={start}>
        New Game
      </Button>
      <Button className="button" onClick={undo}>
        Undo
      </Button>
      <Button className="button" onClick={exportSave}>
        Export Save
      </Button>
    </div>
  );
};

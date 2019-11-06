import { useState, useEffect } from "react";

/**
 * Returns a boolean if the targetKey is being pressed!
 */
export const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const keyDownHandler = ({ key }: KeyboardEvent) => {
      if (key !== targetKey) {
        return;
      }
      setKeyPressed(true);
    };
    const keyUpHandler = ({ key }: KeyboardEvent) => {
      if (key !== targetKey) {
        return;
      }
      setKeyPressed(false);
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

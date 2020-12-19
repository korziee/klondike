import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { AcesUpGame, Move } from "@cards-js/aces-up";

function Controls() {
  return <div></div>;
}

function App() {
  const game = useRef(new AcesUpGame());
  const [started, setStarted] = React.useState(false);
  const [, forceRender] = useState(0);

  useEffect(() => {
    game.current = new AcesUpGame();
    // game.current.deal();
    // setStarted(true);
  }, []);

  if (!started) {
    return (
      <div>
        <button
          onClick={() => {
            game.current.deal();
            setStarted(true);
          }}
        >
          start new game
        </button>
      </div>
    );
  }

  const emptyPile = game.current.tableau.piles.find(
    (pile) => pile.getCards().length === 0
  );

  return (
    <div className="App">
      <button
        onClick={() => {
          game.current.draw();
          forceRender((a) => a + 1);
        }}
      >
        draw
      </button>
      <button
        onClick={() => {
          game.current.deal();
          forceRender((a) => a + 1);
        }}
      >
        start new game
      </button>
      <button
        onClick={() => {
          while (game.current.undo()) {}
          forceRender((a) => a + 1);
        }}
      >
        restart
      </button>
      <button
        onClick={() => {
          game.current.undo();
          forceRender((a) => a + 1);
        }}
      >
        undo
      </button>
      <div>
        {game.current.waste.getCards().map((card) => (
          <span>
            {card.getRank()} of {card.getSuit()},{" "}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {game.current.tableau.piles.map((pile) => {
          const cards = pile.getCards();
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {cards.map((card) => {
                return (
                  <span style={{ margin: "20px" }}>
                    {card.getRank()} of {card.getSuit()}{" "}
                    <button
                      onClick={() => {
                        game.current.makeMove(
                          new Move().create({
                            from: "tableau",
                            to: "waste",
                            card: card,
                            meta: {
                              fromPile: pile,
                            },
                          })
                        );
                        forceRender((a) => a + 1);
                      }}
                    >
                      W
                    </button>
                    {emptyPile && (
                      <button
                        onClick={() => {
                          game.current.makeMove(
                            new Move().create({
                              from: "tableau",
                              to: "tableau",
                              card: card,
                              meta: {
                                fromPile: pile,
                                toPile: emptyPile,
                              },
                            })
                          );
                          forceRender((a) => a + 1);
                        }}
                      >
                        E
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

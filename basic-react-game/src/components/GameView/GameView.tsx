import React, { useContext, useMemo, useEffect } from "react";
import useDimensions from "react-use-dimensions";
import Modal from "antd/es/modal/";
import "antd/dist/antd.css";
import { GameContext } from "../../contexts/GameContext";
import { getCardPilePosition } from "../../helpers/getCardPilePosition";
import { getCardPileWidth } from "../../helpers/getCardPileWidth";
import { CardPile } from "../CardPile";
import "./GameView.css";
import Button from "antd/es/button/button";

export interface IGameViewInnerProps {
  containerWidth: number;
}

const GameViewInner: React.FC<IGameViewInnerProps> = ({ containerWidth }) => {
  const {
    waste,
    stock,
    foundation,
    tableau,
    emptyPileClick,
    undo
    // start
  } = useContext(GameContext);

  const cardWidth = getCardPileWidth(containerWidth);
  const approxCardHeight = cardWidth / 0.673;

  const stockPile = (
    <CardPile
      pileWidth={cardWidth}
      pileXPosition={0}
      cards={stock}
      fanned={false}
      onEmptyPileClick={() => emptyPileClick("stock")}
    />
  );

  const wastePile = (
    <CardPile
      pileWidth={cardWidth}
      pileXPosition={getCardPilePosition(1, containerWidth)}
      cards={waste}
      fanned={false}
      onEmptyPileClick={() => emptyPileClick("waste")}
    />
  );

  const foundationPile = foundation.map((f, i) => (
    <CardPile
      key={`foundation-${i}`}
      pileWidth={cardWidth}
      pileXPosition={getCardPilePosition(i + 3, containerWidth)}
      cards={f}
      fanned={false}
      onEmptyPileClick={() => emptyPileClick("foundation", i)}
    />
  ));

  const tableauPiles = tableau.map((t, i) => (
    <CardPile
      key={`tableau-${i}`}
      pileWidth={cardWidth}
      pileXPosition={getCardPilePosition(i, containerWidth)}
      cards={t}
      fanned
      fanDirection="down"
      // i + 1 here because the tableau is NOT zero based
      onEmptyPileClick={() => emptyPileClick("tableau", i + 1)}
    />
  ));

  const topRowStyles = useMemo(
    (): React.CSSProperties => ({ position: "relative" }),
    []
  );

  const bottomRowStyles = useMemo(
    (): React.CSSProperties => ({
      position: "absolute",
      top: approxCardHeight + containerWidth * 0.02
    }),
    [approxCardHeight]
  );

  return (
    <>
      {/* TODO: remove when the menu bar exists */}
      {/* <button onClick={start}>Start</button> */}
      <button onClick={undo}>Undo</button>
      <div style={topRowStyles}>
        <div>
          {stockPile}
          {wastePile}
          {foundationPile}
        </div>
        <div style={bottomRowStyles}>{tableauPiles}</div>
      </div>
    </>
  );
};

export const GameView: React.FC = () => {
  // width is the available width for this view!
  // we should use this to calculate the sizes of all the cards on the screen
  // we want EVERY card to be the same size, so we need to base this off of the fact that there are going to be max 7 tableau cards on the horizonatal plane at any given time
  // Assume that this view is 100%, we should only provide bare margins
  const [ref, { width }] = useDimensions();

  const { start } = useContext(GameContext);

  // This could be moved out into it's own little component
  useEffect(() => {
    if (!start) {
      return;
    }
    const modal = Modal.confirm({
      // get rid of the (!) icon
      icon: null,
      centered: true,
      // get's rid of the cancel button
      okCancel: false,
      // get's rid of the ok button
      okButtonProps: {
        hidden: true
      },
      title: "Select your draw type",
      content: (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            onClick={() => {
              start();
              modal.destroy();
            }}
            style={{
              height: "100px",
              width: "100px",
              backgroundColor: "lightblue",
              fontSize: "1.5em",
              fontWeight: "bolder"
            }}
          >
            1 Card
          </Button>
          <div>
            <Button
              disabled
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "indianred",
                fontSize: "1.5em",
                fontWeight: "bolder"
              }}
            >
              3 Card
            </Button>
            <div>Coming soon..</div>
          </div>
        </div>
      )
    });
    return () => {
      modal.destroy();
    };
  }, [start]);

  return (
    <div className="GameView">
      {/* GameViewInner does calculation based on the width, so we don't want to return */}
      <div ref={ref}>{width && <GameViewInner containerWidth={width} />}</div>
    </div>
  );
};

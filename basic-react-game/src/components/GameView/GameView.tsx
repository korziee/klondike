import React, { useContext } from "react";
import { Row, Col } from "antd";
import "antd/es/grid/style/css"; // for css
import { CardPile } from "../CardPile";
import { CardPileGroup } from "../CardPileGroup";
import { GameContext } from "../../handlers/GameHandler";

// TODO - remove hard coded heights

export const GameView: React.FC = () => {
  const {
    waste,
    stock,
    foundation,
    tableau,
    draw,
    emptyPileClick
  } = useContext(GameContext);

  return (
    <div>
      <Row style={{ height: "250px" }}>
        <Col span={4} style={{ height: "100%" }}>
          <CardPile
            onEmptyPileClick={() => emptyPileClick("stock")}
            cards={stock}
            fanned={false}
          />
        </Col>
        <Col span={4} offset={1} style={{ height: "100%" }}>
          <CardPile
            onEmptyPileClick={() => emptyPileClick("waste")}
            cards={waste}
            fanned={false}
          />
        </Col>
        <Col span={12} offset={3} style={{ height: "100%" }}>
          <CardPileGroup>
            <CardPile
              onEmptyPileClick={() => emptyPileClick("foundation", 1)}
              cards={foundation[0]}
              fanned={false}
            />
            <CardPile
              onEmptyPileClick={() => emptyPileClick("foundation", 2)}
              cards={foundation[1]}
              fanned={false}
            />
            <CardPile
              onEmptyPileClick={() => emptyPileClick("foundation", 3)}
              cards={foundation[2]}
              fanned={false}
            />
            <CardPile
              onEmptyPileClick={() => emptyPileClick("foundation", 4)}
              cards={foundation[3]}
              fanned={false}
            />
          </CardPileGroup>
        </Col>
      </Row>
      <div style={{ height: "250px" }}>
        <CardPileGroup>
          <CardPile
            onEmptyPileClick={() => emptyPileClick("tableau", 1)}
            cards={tableau[0]}
            fanned
            fanDirection="down"
          />
          <CardPile
            onEmptyPileClick={() => emptyPileClick("tableau", 2)}
            cards={tableau[1]}
            fanned
            fanDirection="down"
          />
          <CardPile
            onEmptyPileClick={() => emptyPileClick("tableau", 3)}
            cards={tableau[2]}
            fanned
            fanDirection="down"
          />
          <CardPile
            onEmptyPileClick={() => emptyPileClick("tableau", 4)}
            cards={tableau[3]}
            fanned
            fanDirection="down"
          />
          <CardPile
            onEmptyPileClick={() => emptyPileClick("tableau", 5)}
            cards={tableau[4]}
            fanned
            fanDirection="down"
          />
          <CardPile
            onEmptyPileClick={() => emptyPileClick("tableau", 6)}
            cards={tableau[5]}
            fanned
            fanDirection="down"
          />
          <CardPile
            onEmptyPileClick={() => emptyPileClick("tableau", 7)}
            cards={tableau[6]}
            fanned
            fanDirection="down"
          />
        </CardPileGroup>
      </div>
    </div>
  );
};

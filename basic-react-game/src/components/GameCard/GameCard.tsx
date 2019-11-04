import React from "react";
import "./GameCard.css";

import { Card } from "engine/lib/classes/Card";

import { ReactComponent as BlackBlank } from "../../svgs/1B.svg";
// import { ReactComponent as RedBlank } from "../../svgs/2B.svg";
// import { ReactComponent as BlackJoker } from "../../svgs/1J.svg";
// import { ReactComponent as RedJoker } from "../../svgs/2J.svg";

import { ReactComponent as TwoOfClubs } from "../../svgs/2C.svg";
import { ReactComponent as TwoOfDiamonds } from "../../svgs/2D.svg";
import { ReactComponent as TwoOfHearts } from "../../svgs/2H.svg";
import { ReactComponent as TwoOfSpades } from "../../svgs/2S.svg";
import { ReactComponent as ThreeOfClubs } from "../../svgs/3C.svg";
import { ReactComponent as ThreeOfDiamonds } from "../../svgs/3D.svg";
import { ReactComponent as ThreeOfHearts } from "../../svgs/3H.svg";
import { ReactComponent as ThreeOfSpades } from "../../svgs/3S.svg";
import { ReactComponent as FourOfClubs } from "../../svgs/4C.svg";
import { ReactComponent as FourOfDiamonds } from "../../svgs/4D.svg";
import { ReactComponent as FourOfHearts } from "../../svgs/4H.svg";
import { ReactComponent as FourOfSpades } from "../../svgs/4S.svg";
import { ReactComponent as FiveOfClubs } from "../../svgs/5C.svg";
import { ReactComponent as FiveOfDiamonds } from "../../svgs/5D.svg";
import { ReactComponent as FiveOfHearts } from "../../svgs/5H.svg";
import { ReactComponent as FiveOfSpades } from "../../svgs/5S.svg";
import { ReactComponent as SixOfClubs } from "../../svgs/6C.svg";
import { ReactComponent as SixOfDiamonds } from "../../svgs/6D.svg";
import { ReactComponent as SixOfHearts } from "../../svgs/6H.svg";
import { ReactComponent as SixOfSpades } from "../../svgs/6S.svg";
import { ReactComponent as SevenOfClubs } from "../../svgs/7C.svg";
import { ReactComponent as SevenOfDiamonds } from "../../svgs/7D.svg";
import { ReactComponent as SevenOfHearts } from "../../svgs/7H.svg";
import { ReactComponent as SevenOfSpades } from "../../svgs/7S.svg";
import { ReactComponent as EightOfClubs } from "../../svgs/8C.svg";
import { ReactComponent as EightOfDiamonds } from "../../svgs/8D.svg";
import { ReactComponent as EightOfHearts } from "../../svgs/8H.svg";
import { ReactComponent as EightOfSpades } from "../../svgs/8S.svg";
import { ReactComponent as NineOfClubs } from "../../svgs/9C.svg";
import { ReactComponent as NineOfDiamonds } from "../../svgs/9D.svg";
import { ReactComponent as NineOfHearts } from "../../svgs/9H.svg";
import { ReactComponent as NineOfSpades } from "../../svgs/9S.svg";
import { ReactComponent as TenOfClubs } from "../../svgs/TC.svg";
import { ReactComponent as TenOfDiamonds } from "../../svgs/TD.svg";
import { ReactComponent as TenOfHearts } from "../../svgs/TH.svg";
import { ReactComponent as TenOfSpades } from "../../svgs/TS.svg";
import { ReactComponent as AceOfClubs } from "../../svgs/AC.svg";
import { ReactComponent as AceOfDiamonds } from "../../svgs/AD.svg";
import { ReactComponent as AceOfHearts } from "../../svgs/AH.svg";
import { ReactComponent as AceOfSpades } from "../../svgs/AS.svg";
import { ReactComponent as JackOfClubs } from "../../svgs/JC.svg";
import { ReactComponent as JackOfDiamonds } from "../../svgs/JD.svg";
import { ReactComponent as JackOfHearts } from "../../svgs/JH.svg";
import { ReactComponent as JackOfSpades } from "../../svgs/JS.svg";
import { ReactComponent as KingOfClubs } from "../../svgs/KC.svg";
import { ReactComponent as KingOfDiamonds } from "../../svgs/KD.svg";
import { ReactComponent as KingOfHearts } from "../../svgs/KH.svg";
import { ReactComponent as KingOfSpades } from "../../svgs/KS.svg";
import { ReactComponent as QueenOfClubs } from "../../svgs/QC.svg";
import { ReactComponent as QueenOfDiamonds } from "../../svgs/QD.svg";
import { ReactComponent as QueenOfHearts } from "../../svgs/QH.svg";
import { ReactComponent as QueenOfSpades } from "../../svgs/QS.svg";

export interface IGameCardProps {
  card: Card;
}

/**
 * This component renders a playing card onto the screen, what is shown is dependent on the card prop
 * The GameCard is the building block for any component that uses cards within it's UI.
 */
export const GameCard: React.FC<IGameCardProps> = ({ card }) => {
  const getCard = () => {
    if (card.getUpturned() === false) {
      return <BlackBlank />;
    }
    switch (card.getSuit()) {
      case "Clubs": {
        switch (card.getRank()) {
          case "Ace":
            return <AceOfClubs />;
          case "2":
            return <TwoOfClubs />;
          case "3":
            return <ThreeOfClubs />;
          case "4":
            return <FourOfClubs />;
          case "5":
            return <FiveOfClubs />;
          case "6":
            return <SixOfClubs />;
          case "7":
            return <SevenOfClubs />;
          case "8":
            return <EightOfClubs />;
          case "9":
            return <NineOfClubs />;
          case "10":
            return <TenOfClubs />;
          case "Jack":
            return <JackOfClubs />;
          case "Queen":
            return <QueenOfClubs />;
          case "King":
            return <KingOfClubs />;
        }
        break;
      }
      case "Diamonds": {
        switch (card.getRank()) {
          case "Ace":
            return <AceOfDiamonds />;
          case "2":
            return <TwoOfDiamonds />;
          case "3":
            return <ThreeOfDiamonds />;
          case "4":
            return <FourOfDiamonds />;
          case "5":
            return <FiveOfDiamonds />;
          case "6":
            return <SixOfDiamonds />;
          case "7":
            return <SevenOfDiamonds />;
          case "8":
            return <EightOfDiamonds />;
          case "9":
            return <NineOfDiamonds />;
          case "10":
            return <TenOfDiamonds />;
          case "Jack":
            return <JackOfDiamonds />;
          case "Queen":
            return <QueenOfDiamonds />;
          case "King":
            return <KingOfDiamonds />;
        }
        break;
      }
      case "Spades": {
        switch (card.getRank()) {
          case "Ace":
            return <AceOfSpades />;
          case "2":
            return <TwoOfSpades />;
          case "3":
            return <ThreeOfSpades />;
          case "4":
            return <FourOfSpades />;
          case "5":
            return <FiveOfSpades />;
          case "6":
            return <SixOfSpades />;
          case "7":
            return <SevenOfSpades />;
          case "8":
            return <EightOfSpades />;
          case "9":
            return <NineOfSpades />;
          case "10":
            return <TenOfSpades />;
          case "Jack":
            return <JackOfSpades />;
          case "Queen":
            return <QueenOfSpades />;
          case "King":
            return <KingOfSpades />;
        }
        break;
      }
      case "Hearts": {
        switch (card.getRank()) {
          case "Ace":
            return <AceOfHearts />;
          case "2":
            return <TwoOfHearts />;
          case "3":
            return <ThreeOfHearts />;
          case "4":
            return <FourOfHearts />;
          case "5":
            return <FiveOfHearts />;
          case "6":
            return <SixOfHearts />;
          case "7":
            return <SevenOfHearts />;
          case "8":
            return <EightOfHearts />;
          case "9":
            return <NineOfHearts />;
          case "10":
            return <TenOfHearts />;
          case "Jack":
            return <JackOfHearts />;
          case "Queen":
            return <QueenOfHearts />;
          case "King":
            return <KingOfHearts />;
        }
        break;
      }
    }
  };

  return <div className="GameCard">{getCard()}</div>;
};

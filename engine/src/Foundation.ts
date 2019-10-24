import { ISerializable } from "./types/ISerializable";
import { Pile, ISerializedPile } from "./Pile";
import { Card } from "./Card";
import { getNextRankForCurrentRank } from "./helpers/getNextRankForRank";

export class HeartsFoundationPile extends Pile {
  constructor(cards: Card[]) {
    super(cards);
  }

  canAddCards(cards: Card[]) {
    const cardsInPile = this.getCards();
    const cardOnTopOfStack = cardsInPile[cardsInPile.length - 1];
    let lastCardInLoop = cardOnTopOfStack;

    // early exit if not all same suit, not performant but easy to read!
    const allCardsAreHearts = cards.every(c => c.getSuit() === "Hearts");
    if (!allCardsAreHearts) {
      return false;
    }

    // now that we know each card is the same suit, we only need to make sure that they are incrementing
    for (const card of cards) {
      // the foundation pile for this suit is empty,
      if (typeof lastCardInLoop === "undefined") {
        // first card must be an Ace
        if (card.getRank() === "Ace") {
          continue;
        }
        // if not, return false for this validation function
        return false;
      }
      const nextRank = getNextRankForCurrentRank(lastCardInLoop.getRank());
      if (card.getRank() !== nextRank) {
        // break out of the loop early here as we cannot add all the cards!
        return false;
      }
      lastCardInLoop = card;
    }

    return true;
  }

  canRemoveCards(amount: number) {
    return false;
  }
}

export class SpadesFoundationPile extends Pile {
  constructor(cards: Card[]) {
    super(cards);
  }

  canAddCards(cards: Card[]) {
    return false;
  }

  canRemoveCards(amount: number) {
    return false;
  }
}

export class ClubsFoundationPile extends Pile {
  constructor(cards: Card[]) {
    super(cards);
  }

  canAddCards(cards: Card[]) {
    return false;
  }

  canRemoveCards(amount: number) {
    return false;
  }
}

export class DiamondsFoundationPile extends Pile {
  constructor(cards: Card[]) {
    super(cards);
  }

  canAddCards(cards: Card[]) {
    return false;
  }

  canRemoveCards(amount: number) {
    return false;
  }
}

export interface ISerializedFoundation {
  hearts: ISerializedPile;
  spades: ISerializedPile;
  diamonds: ISerializedPile;
  clubs: ISerializedPile;
}

export interface IFoundation
  extends ISerializable<Foundation, ISerializedFoundation> {
  addCard(card: Card): boolean;
  removeCard(card: Card): boolean;
}

export class Foundation implements IFoundation {
  private hearts: HeartsFoundationPile = new HeartsFoundationPile([]);
  private spades: SpadesFoundationPile = new SpadesFoundationPile([]);
  private diamonds: DiamondsFoundationPile = new DiamondsFoundationPile([]);
  private clubs: ClubsFoundationPile = new ClubsFoundationPile([]);

  addCard(card: Card): boolean {
    const suit = card.getSuit().toLowerCase();

    console.log(1, suit);
    const suitFoundationPileClass = this[suit] as Pile;

    if (!suitFoundationPileClass.canAddCards([card])) {
      return false;
    }

    suitFoundationPileClass.addCards([card]);

    return true;
  }

  removeCard(card: Card): boolean {
    const suit = card.getSuit().toLowerCase();

    const suitFoundationPileClass = this[suit] as Pile;

    if (!suitFoundationPileClass.canRemoveCards(1)) {
      return false;
    }

    suitFoundationPileClass.removeCards(1);

    return true;
  }

  serialize() {
    return {
      hearts: this.hearts.serialize(),
      spades: this.spades.serialize(),
      clubs: this.clubs.serialize(),
      diamonds: this.diamonds.serialize()
    };
  }

  static unserialize(data: ISerializedFoundation) {
    const x = new Foundation();
    x.clubs = Pile.unserialize(data.clubs);
    x.diamonds = Pile.unserialize(data.diamonds);
    x.hearts = Pile.unserialize(data.hearts);
    x.spades = Pile.unserialize(data.spades);

    return x;
  }
}

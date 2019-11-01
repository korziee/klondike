import test from "ava";
import { KlondikeGame } from "./KlondikeGame";

test("getHistory() returns the correct history", t => {
  const game = new KlondikeGame();
});
test("history is modified on every successful move", t => {
  const game = new KlondikeGame();
});
test("getHistory() returns the correct history in order", t => {});
test("getHints() returns the correct hints if they exist", t => {});
test("getHints() returns null if no hints exist", t => {});

test("reset() returns all cards to the stock", t => {});
test("reset() shuffles all cards after they are in th stock", t => {});

// initial game state
test("Before the cards are dealt, they are shufled within the stock", t => {});
test("7 tableau piles exist on the board", t => {});
test("the first tableau pile has one card at the beginning", t => {});
test("the second tableau pile has two cards at the beginning", t => {});
test("the third tableau pile has three cards at the beginning", t => {});
test("the fourth tableau pile has fourth cards at the beginning", t => {});
test("the fifth tableau pile has five cards at the beginning", t => {});
test("the sixth tableau pile has six cards at the beginning", t => {});
test("the seventh tableau pile has seven cards at the beginning", t => {});
test("4 foundtion piles exist on the board", t => {});
test("the foundation is empty at the beginning", t => {});
test("the waste is empty at the beginning of the game", t => {});
test("the stock has 24 cards in it the beginning", t => {});
test("the tableau has a collective 28 cards in it the beginning", t => {});
test("There are only 52 cards in the entire game state at any given time", t => {});
test("once the stock has been all pushed into the waste, the next time a move is made from the stock to the waste, the cards should be moved over to the stock again and the waste should be empty", t => {});

// validate move tests
test("cannot move a non sequential card to the foundation", t => {});
test("cannot move a card to the waste from the tableau", t => {});
test("cannot move a card to the waste from the foundation", t => {});
test("cannot move a card to the stock from the tableau", t => {});
test("cannot move a card to the stock from the waste", t => {});
test("cannot move a card to the stock from the foundation", t => {});
test("cannot move a card between the stock <-> waste if there are no cards in either", t => {});
test("cannot move more than one card from the stock to the foundation", t => {});
test("cannot move more than one card from the stock to the tableau", t => {});
test("cannot move more than one card from the foundation to the tableau", t => {});

// card moving tests
test("can move a card from the stock to the waste", t => {});
test("can move a card from the waste to the tableau", t => {});
test("can move a card from the waste to the foundation", t => {});
test("can move a card from the tableau to the foundation", t => {});
test("can move a card from the tableau to the tableau", t => {});
test("can move multiple cards from the tableau to the tableau", t => {});
test("can move a card from the foundation to the tableau", t => {});

// unserialize and serialize
test("unserializing the saved game state, puts it back in the same state", t => {});
test("serializing returns the anticipated state", t => {});

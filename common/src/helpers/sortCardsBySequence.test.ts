// import test from "ava";
// import { sortCardsBySequence } from "./sortCardsBySequence";
// import { Card } from "../classes/Card";

// test("can handle duplicates", t => {
//   const cards = [
//     new Card("Spades", "10", false),
//     new Card("Hearts", "King", false),
//     new Card("Spades", "10", false),
//     new Card("Hearts", "Jack", false),
//     new Card("Spades", "10", false),
//     new Card("Spades", "10", false),
//     new Card("Spades", "Queen", false)
//   ];

//   const sorted = sortCardsBySequence(cards, "descending");

//   t.deepEqual(sorted[0], cards[1]);
//   t.deepEqual(sorted[1], cards[6]);
//   t.deepEqual(sorted[2], cards[3]);
//   t.deepEqual(sorted[3], cards[0]);
//   t.deepEqual(sorted[4], cards[5]);
//   t.deepEqual(sorted[5], cards[4]);
//   t.deepEqual(sorted[6], cards[2]);
// });

// test("can handle different suits", t => {
//   const cards = [
//     new Card("Clubs", "8", false),
//     new Card("Clubs", "10", false),
//     new Card("Spades", "Queen", false),
//     new Card("Clubs", "10", false),
//     new Card("Hearts", "Jack", false),
//     new Card("Clubs", "10", false),
//     new Card("Hearts", "King", false),
//     new Card("Diamonds", "9", false)
//   ];

//   const sorted = sortCardsBySequence(cards, "descending");

//   t.deepEqual(sorted[0], cards[6]);
//   t.deepEqual(sorted[1], cards[2]);
//   t.deepEqual(sorted[2], cards[4]);
//   t.deepEqual(sorted[3], cards[3]);
//   t.deepEqual(sorted[4], cards[5]);
//   t.deepEqual(sorted[5], cards[1]);
//   t.deepEqual(sorted[6], cards[7]);
//   t.deepEqual(sorted[7], cards[0]);
// });

// test("sorts even if there is a gap in the order", t => {
//   const cards = [
//     new Card("Clubs", "8", false),
//     new Card("Spades", "Queen", false),
//     new Card("Hearts", "Jack", false),
//     new Card("Hearts", "King", false),
//     new Card("Diamonds", "9", false)
//   ];

//   const sorted = sortCardsBySequence(cards, "descending");

//   t.deepEqual(sorted[0], cards[3]);
//   t.deepEqual(sorted[1], cards[1]);
//   t.deepEqual(sorted[2], cards[2]);
//   t.deepEqual(sorted[3], cards[4]);
//   t.deepEqual(sorted[4], cards[0]);
// });

// test("works with only 1 item", t => {
//   const cards = [new Card("Clubs", "8", false)];

//   const sorted = sortCardsBySequence(cards, "descending");

//   t.deepEqual(sorted[0], cards[0]);
// });

// // test("sorts items in ascending order correctly", t => {});

// // test("sorts items in descending order correctly", t => {});

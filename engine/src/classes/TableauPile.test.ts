import test from "ava";
import { TableauPile } from "./TableauPile";

test("cannot remove cards that are not 'upturned'", t => {
  const tableauPile = new TableauPile([]);
});

test("cannot shuffle a tableua pile", t => {});

/**
 * This ensures that a person cant move the whole pile, only the alternating cards on the pile
 */
test("cannot remove cards that are not alternating", t => {});

/**
 * Test that you cannot just remove card 1, 6, 10, you must remove card 1,2,3....
 */
test("cannot remove cards that are not sequential", t => {});

test("cannot add cards that are not alternating and sequential", t => {});

test("cannot add cards that are all the same suit", t => {});

test("after removal of cards, the card on top of the stack is upturned", t => {});

test("only kings can be placed on an empty TableauPile", t => {});

test("can remove cards that are sequential and alternating suit", t => {});

// propably don't need to do this at extends pile and does not overwrite the serialize/unserialize
test("serialize() returns the correct data", t => {});

test("unserialize() returns a FoundationPile with the correct data", t => {});

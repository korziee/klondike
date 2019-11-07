# Intro

This purpose being this folder is to provide a Klondike game engine.

Upon which it's use is entirely platform independent and can be used with different technologies, like React, Vue, etc., this is just a TypeScript project that provides the rules and interfaces.

## Testing

We are using the `"ts-node/register/transpile-only"` for ava, as we do not care for typescript errors during the tests. This is because this project has implemented TDD, and we don't want ts errors to fail the tests! D:

## TODOS

-- each validation method should return a result AND an error message that can be propogated (refactor the pile and implemntations of pile to propogate error messages, as opposed to console logging them)
-- set public property called "won", change when the game is won
-- need to support magic moves (when a user double clicks a card, we should put it in the first valid spot)
-- add hints (should use the same functionality as magic moves)

# @korziee/klondike

This package is a TypeScript implementation of a Klondike game engine, it provides the `KlondikeGame` class, which contains method to start games, draw, move cards, etc.

The idea being that this package is used as the core of solitaire/klondike games, regardless of how you choose to render it.

## TODOS

-- each validation method should return a result AND an error message that can be propogated (refactor the pile and implemntations of pile to propogate error messages, as opposed to console logging them)
-- set public property called "won", change when the game is won

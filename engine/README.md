# Intro

This purpose being this folder is to provide a Klondike game engine.

Upon which it's use is entirely platform independent and can be used with different technologies, like React, Vue, etc., this is just a TypeScript project that provides the rules and interfaces.

## Testing

We are using the `"ts-node/register/transpile-only"` for ava, as we do not care for typescript errors during the tests. This is because this project has implemented TDD, and we don't want ts errors to fail the tests! D:

-- add instance of checks to serialize tests

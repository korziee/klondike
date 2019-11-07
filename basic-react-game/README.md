Cards sourced from https://www.me.uk/cards/

## TODOS

- There is a lot of height:100% happening. First fix would be the styling implementation of CardPile, it uses absolute positioning and ignores the size of the container that it's in. It should realistically set a 'max-height' and then based off of this, work out the ratio's to follow to fan the cards down.
- Either remove the use of antd grids, and replace with flex for the whole thing, or convert CardPile to use antd grid.
- add animation signalling a finished game
- remove "draw" button
- add "reset button"
- add "undo button"
- add "double click - magic move" support

One way to fix the positioning issues is to to work out what the LARGEST size of a card can be (using a centred layout to limit the page width), and then applying a percentage based width/height to the cards based on the screen size, and then also scale the height for the top row to be similar to the a size a scaled card PLUS a gap

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

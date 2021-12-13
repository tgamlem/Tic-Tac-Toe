<!-- @format -->

# Tic-Tac-Toe

2-player tic-tac-toe game that uses a webserver to connect players together

A final project for Whitworth University's CS 313 - Networks

## Development

### Getting Started for Development

-   Install [node.js LTS](https://nodejs.org)
-   Install [yarn](https://classic.yarnpkg.com/en/docs/install)
-   Open the project in your preferred IDE.
-   If using VS Code install the recommended extensions.

### Building for development

-   run `yarn` from base project directory to download all npm packages
-   run `yarn dev-client` to build the front end for development
-   run `yarn dev-server` to build the backend for development
-   Note: Typically these will be run simultaneously in a split terminal
-   navigate to [localhost:3002](http://localhost:3002) to view app in browser
-   refresh page when changes are made
-   most changes should not require to re-run `yarn dev-client` or `yarn dev-server`

### Code Formatting

Code is formatted/linted with [Prettier](https://prettier.io), [ESLint](https://eslint.org), and [Stylelint](https://stylelint.io). All three are installed as development dependencies in this project. Please ensure all three are run and complete without errors before pushing code to this project or opening a PR. You can run all three using `yarn lint` or run them individually using `yarn [formatter name]`.

## Building for production

-   run `yarn build`
-   output will be placed in /dist folder on your computer
-   Note: this file is not to be checked into source control
-   run `yarn start` to run the production version
-   navigate to [localhost:3000](http://localhost:3000) to view the production app in browser

## Building with Docker

-   Download [Docker](https://www.docker.com/products/docker-desktop)
-   Run `build.sh` to build the container with the reccommended settings and included Dockerfile.
-   Optionally you may build from the command line with your own settings
-   Run `start.sh` to start your locally built container
-   Optionally start the container with your own settings. Ensure to expose a port connected to the container's port 3000.
-   Connect to http://localhost:3000 if you built using `start.sh` or built using host networking. Otherwise connect to your container's IP address at the port you exposed.

## Works Cited

See [WorksCited.md](https://github.com/tgamlem/Tic-Tac-Toe/blob/main/WorksCited.md) for more information on code written by other people.

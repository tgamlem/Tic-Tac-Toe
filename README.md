<!-- @format -->

# Tic-Tac-Toe

2-player tic-tac-toe game that uses a webserver to connect players together

## Getting Started

-   Install [node.js LTS](https://nodejs.org)
-   Install [yarn](https://classic.yarnpkg.com/en/docs/install)

## Building for development

-   run `yarn` from base project directory to download all npm packages
-   run `yarn dev-client` to build the front end for development
-   run `yarn dev-server` to build the backend for development
    -   Note: Typically these will be run simultaneously in a split terminal
-   navigate to [localhost:3002](http://localhost:3002) to view app in browser
-   refresh page when changes are made
    -   most changes should not require to re-run `yarn dev-client` or `yarn dev-server`

## Building for production

-   run `yarn build`
-   output will be placed in /dist folder on your computer
    -   Note: this file is not to be checked into source control
-   run `yarn start` to run the production version
-   navigate to [localhost:3000](http://localhost:3000) to view the production app in browser

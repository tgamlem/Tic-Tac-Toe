<!-- @format -->

# Works Cited

This project uses many other projects, libraries, programs, or technologies that are not written or maintained by me. In an attempt to give credit where credit is due I have created this document.

## Package.json and NPM Packages

The [package.json](https://github.com/tgamlem/Tic-Tac-Toe/blob/main/package.json) file is a good place to look and see what projects have been used (imported) by this project. Those listed under `devDependencies` are used only for development and/or building the project, they are not included in the production build of this application. Those listed under `dependencies` are used in the production version of this application.

All of these packages were downloaded from the public npm registry located at [npmjs.com](https://npmjs.com). If you are curious about any of the dependencies listed in package.json. A good place to start to get more information would be to search for the dependency by name at [npmjs.com](https://npm.js.com).

## Import statements

It is industry standard to use import statements to import npm dependencies into projects like this one. Import statements are typically not marked with comments about where the imported code came from, so I have followed that pattern and not included references to specific dependency source code or websites in this project's source code. Import statements are also used to import code written by me into other files within this project. A general rule of thumb is if the import statement references a dependency located in the package.json](https://github.com/tgamlem/Tic-Tac-Toe/blob/main/package.json) file, it is written by someone else and used with permission. If it is not mentioned there, it is likely written by me.

## Some Major Components Used

### Webpack

[Webpack](https://webpack.js.org) describes itself as a “static module bundler for modern JavaScript applications”. It is highly configurable by the user and includes many features that are useful during both development and deployment. During development it can be used to serve frontend code and “hot reload” or recompile when changes are made so they can be instantly viewed without needing to restart the server. When used to bundle for production, it intelligently bundles frequently used dependencies and source code together into modules. These modules are typically separate files that can be sent to the client when needed for running the application. This allows clients to get just the code they need to display the application for a fast first page load and request the rest of the code when it is needed or when the browser has downtime. To learn more about the configuration used in this project, see [Webpack.md](https://github.com/tgamlem/Tic-Tac-Toe/blob/main/webpack.md).

### SCSS

[SCSS](https://sass-lang.com) or SASS is a stylesheet language that gets compiled to CSS. As the name suggests, it is essentially an extension of CSS. It allows for more sharing of styles across an application by supporting variables, nested styles, functions, and reusable style blocks called mixins. It is compiled to CSS by Webpack at build time.

### Express

[Express](https://expressjs.com) is a minimal and flexible Node.js web application framework. It provides robust features for web or mobile applications. Express.js is considered by many to be the standard server framework for Node.js. It allowed me to quickly and easily set up an empty web server for this project.

### React

[React](https://reactjs.org) is a JavaScript library for building user interfaces. It makes creating interactive UIs easy by using declarative views to efficiently update and render the right components when data changes. It is component-based and allows for encapsulated components to be built and composed to create complex UIs. It is able to render on the server using Node.js. It can be compiled to HTML or sent to the browser as JavaScript. React is commonly used within the industry for web applications.

### Node.js

[Node.js](https://nodejs.org/en) Node.js is a commonly used tool for creating web applications. It is designed to build scalable network applications. It can handle many connections concurrently. A callback is fired when a connection is established, but when no work is needed Node.js sleeps. As thread-based networking is relatively inefficient and difficult to use, Node.js is designed without this functionality. This results in no dead-locks. It is an industry standard used by many professional companies. It can be run almost anywhere, making it an excellent portable option.

### Docker

[Docker](https://docker.com) is a widely used framework for bundling applications into containers and can be installed almost anywhere. The advantage of using a container to run your project is it allows users or deployment machines to install Docker and nothing else. All the dependencies for a project are installed in the container’s virtual environment and do not need to be installed on the host machine. Additionally, Docker allows for what it calls “swarms” which are collections of containers hosting the same application that can be used to balance the load of incoming connections to the application. This allows for more containers to be created during times of high load (scaling up) and containers to be removed (scaled down) during times of lower load. When my project is hosted in production, it is hosted in a single Docker container because I am not expecting very high loads on my application.

### Babel

[Babel](https://babeljs.io) is a compiler that allows the latest JavaScript features to be used in older browsers or clients that may not support these features yet. It takes the modern syntax and compiles it into older syntax that can be understood by more clients. This allows developers to take advantage of newer features that allow for faster development or more readable code without worrying if their code will run on the required clients. It is called at build time by Webpack and the output can be seen in the /dist directory after running `yarn build`.

### React Router

[ReactRouter](https://reactrouter.com) is a client-side routing package that is used by many large companies. It allows different “routes” to be “hosted” inside the client application instead of having many different HTML files on a web server. This has many advantages. Some are, it reduces the number of requests to the server because all the “routes” are managed in JavaScript by the client, and “page loads” or “requests” to other routes are able to be completed nearly instantly without actually requesting any more information from the server (with the exception of images, external links, and any stylesheets or JavaScript modules that may not have been downloaded yet).

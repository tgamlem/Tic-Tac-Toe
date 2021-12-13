<!-- @format -->

# Webpack

NOTE: Webpack files were modified from my final project for CS 374

## About Webpack

[Webpack](https://webpack.js.org) describes itself as a “static module bundler for modern JavaScript applications” that is highly configurable. There are many features and plugins available, some of which are not utilized in this project. To learn more about what Webpack has to offer other than what is used in this project, explore their documentation at their website linked above.

## About my Webpack Configuration Files

There are four Webpack configuration files in this project. Two for frontend React code and two for server code. Both the React and server parts of the project have a configuration file that is used for development and one that is used for production. The development configurations have development specific entries and plugins that help the frontend React code be developed separately from the backend server code. Additionally, they do not run as many optimization steps because these take more time and are not necessary for development. The production configurations ensure that the code is bundled as efficiently as possible and have plugins that run compression algorithms so that compressed versions of files may be sent down if the client knows how to interpret and decompress these file types.

## What Different Sections of a Webpack Configuration File Do

### Declarations

```
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const compressionRegex = /\.(js|png|jpg|html|css)$/;
```

At the top of a Webpack configuration file, there are typically declarations. They are typically declared using older JavaScript syntax. Essentially these declarations define variables and plugins that will be used later on in the file.

### Entry

This option tells Webpack where it should start the build from. It will use this entry point to determine what dependencies and other files need to be included in the build.

### Mode

`mode: "production",` or `mode: “development”`
This entry is used to tell Webpack which version of an application we are building. When development mode is set, certain things such as comments are not stripped out of the file. Other time consuming production optimizations are not run during development builds. Production mode will run all optimizations and ensure that all unnecessary parts of files are left out. It will also tell Webpack to spend as much time as necessary building efficient modules.

### Rules

This section defines what Webpack does when it is run. It is made up of subsections that tell Webpack what to do when it encounters a file of a certain type. Each file type that Webpack encounters must have a rule defined. Each rule section consists of a regular expression test that tells Webpack which file type(s) are affected by this rule, and which loader or plugin Webpack should use when bundling the file. You can also tell Webpack to exclude or ignore particular files or directories if you do not want Webpack to run any optimizations or operations on specific files or directories and include the files as-is. This is typically used for code that has already been bundled and included as a dependency.

#### Loaders

These are purpose built programs/compilers/plugins that will perform operations on code that Webpack encounters. Anywhere from one to n loaders may be used. The loader listed lowest or last in the file is run first.
In my application `babel-loader` provided by Babel is responsible for compiling JavaScript into older syntax as configured in a separate configuration file.
The SCSS section of my Webpack configuration is probably the most complex. First, `sass-loader` is run to take SCSS files and compile them into traditional CSS that the `css-loader` can understand. The `css-loader` also has options set that tell it to rename each CSS class I have created with a name that will be unique to the component. This prevents any potential collisions and overlapping or overridden styles.
The final loader is different for the production and development configurations. In development, `style-loader` is used and it injects all styles directly into the JavaScript files that are served to the client. This is typically faster than creating and sending a separate CSS file although it does create a much larger JavaScript file. However, because this is only done during development and no files are sent over the network this does not matter at this stage. It is optimized for faster development times which is what matters at this stage.
In the production configuration a plugin’s loader,` MiniCssExtractPlugin` loader is used. This plugin is created to remove any redundant style attributes that are applied to children components, minify the CSS into its smallest possible file size and perform other optimizations for production. This results in the smallest and most efficient CSS file possible sent to the client.

### Resolve

This section essentially tells Webpack what are the primary files that it will be dealing with, in my case, .js and .jsx files.

### Output

```
​​output: {
       globalObject: "this",
       path: path.resolve(__dirname, "dist/"),
       publicPath: "/",
       filename: "main.[contenthash].wp.js",
       chunkFilename: "[contenthash].js",
   },
```

This section tells Wepack what to do with the files once they are done being processed. This section is essentially the same for both production and development configurations. In both cases, they are placed into a /dist folder. The `publicPath` entry tells Webpack that the files will be hosted at the `/` route of the domain. `filename` is the name for the main or entry file, in my case I have chosen to call it `main.wp.js` to indicate that it is the main JavaScript file, processed by Webpack. The `chunkFilename` entry is the pattern that all modules A.K.A. chunks will be named with. In development, this is simply a number followed by the .js extension. In production both the main file and chunk files have the `[contenthash]` instruction in the file names. This means that a unique hash created with the contents of the file will be inserted into the file name. This is important for client caching. This ensures that any files that do not change and have not expired can be reused next time the client visits the application and only new or expired files are downloaded.

### Target

`target: “node”,` tells Webpack that we are building this application to be run in Node.js. This changes some defaults for how Webpack prepares the files.

### Node

```
node: {
       __dirname: false,
       __filename: false,
   },
```

This section contains options that are specifically used when Webpack is building for Node.js. Setting `__filename` ensures that Webpack does not change any code that sets filenames for outputs from the build. `__dirname` does the same except for output directories.

### Externals

```
externals: [nodeExternals()],
```

This setting creates a function that helps Webpack exclude dependencies from the server side code that are unused. This reduces the size of the built code.

### Optimization

This section is only present in the production version of the configuration file because these optimizations are typically time consuming and unnecessary during development.

```
optimization: {
       nodeEnv: "production",
       splitChunks: {
           chunks: "all",
           cacheGroups: {
               vendor: {
                   test: /[\\/]node_modules[\\/]/,
                   name: "vendors",
                   chunks: "all",
               },
           },
       },
       minimizer: [new TerserPlugin(), new CssMinimizerWebpackPlugin()],
   },
```

The `splitChunks` optimization is built into Webpack and directs it to split as many things as possible into chunks when set to “all.” The `cacheGroups` entry tells Webpack which sections of code are not likely to change and therefore should be split into separate chunks that should be cached. In my case, this is the npm dependencies stored in the node-modules folder. These dependencies will not change unless they are updated by me, therefore Webpack can cache these dependencies in their respective chunks and reuse them next time the build is run so long as nothing has changed.
The `minimizer` entry takes a `TerserPlugin` that is designed to minify the JavaScript files to create the smallest files possible.

### Dev Server

```
devServer: {
		port: 3002,
		historyApiFallback: true,
		proxy: {
			"/api": "http://localhost:3000",
		},
	},
```

This section is used to specify options for the built in Webpack dev server. Essentially it says that the dev server will run on port 3002. This is necessary for development because the files will be constantly re-generating and will cause problems for the backend-server code. Because the frontend code is hosted on a different port during development, a proxy route for /api is set up to route all traffic to the server on localhost:3000. The `historyApiFallback` setting is used to control if the `index.html` page will be shown when there is a 404 error on the Webpack dev server.

### Plugins

This section is used to extend Webpack’s default functionality and run other operations. Plugins can do just about anything and are extremely useful.

#### HotModuleReplacementPlugin

This is used only in development and provides the hot-reload functionality for the frontend Webpack dev server. It is another reason why during development the frontend code must be run separately from the backend code.

#### HtmlWebpackPlugin

```
new HtmlWebpackPlugin({
			title: "Tic Tac Toe",
			minify: true,
			template: "./public/index.html",
		}),
```

This plugin is used to create an HTML file that can be used as the index.html file for the web page. It will ensure that links to all chunks/modules are included so the client will know to download them. The `title` entry specifies what the title of the HTML document will be and the `template` entry allows me to include any other HTML tags that I want to in addition to the default ones that the plugin will create. `minify` just tells the plugin to remove all unnecessary characters such as whitespace and comments to minimize the file size.

#### MiniCssExtractPlugin

```
new MiniCssExtractPlugin({
			filename: "[contenthash].css",
			chunkFilename: "[id].css",
			ignoreOrder: false,
		}),
```

This plugin further defines settings for the loader used above in the SCSS section. The `filename` entry controls the main file’s name and the `chunkFileName` controls the name of any subsequent smaller CSS files that are created. Id may not be the best to use, but in my case there is not enough CSS generated to create multiple files. The `ignoreOrder` entry ensures that any order errors/warnings that occur are printed out to the console.

#### Compression Plugin

```
new CompressionPlugin({
			filename: "[path][base].gz",
			test: compressionRegex,
		}),
```

This plugin will generate compressed versions of all files that meet the test. This is how the GZip and Brotli compressed files are created for the client. `filename` controls what the file will be called when it is generated and the `algorithm` entry controls what algorithm is used. GZip is default.

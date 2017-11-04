/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Webpack Plugins
 *
 * problem with copy-webpack-plugin
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
    title: '',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer(),
    HMR: HMR
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
    isProd = options.env === 'production';
    return {

        /**
         * Cache generated modules and chunks to improve performance for multiple incremental builds.
         * This is enabled by default in watch mode.
         * You can pass false to disable it.
         *
         * See: http://webpack.github.io/docs/configuration.html#cache
         */
        //cache: false,

        /**
         * The entry point for the bundle
         * Our Angular.js app
         *
         * See: http://webpack.github.io/docs/configuration.html#entry
         */
        entry: {

            //'polyfills': './src/polyfills.main.js',
            'main':  './src/app.module.js'

        },

        /**
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {

            /**
             * An array of extensions that should be used to resolve modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions: ['.js', '.json'],

            /**
             * An array of directory names to be resolved to the current directory
             */
            modules: [helpers.root('src'), helpers.root('node_modules')],

        },

        /**
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module: {

            rules: [

                {
                    test: /\.js$/,
                    exclude:  [helpers.root('node_modules')],
                    include:  [helpers.root('src')],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env']
                        }
                    }
                },
                /**
                 * To string and css loader support for *.css files (from Angular components)
                 * Returns file content as string
                 *
                 */
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader'],
                    exclude: [helpers.root('src', 'styles')]
                },

                /**
                 * To string and sass loader support for *.scss files (from Angular components)
                 * Returns compiled css content as string
                 *
                 */
                {
                    test: /\.scss$/,
                    use: ['to-string-loader', 'css-loader', 'sass-loader'],
                    exclude: [helpers.root('src', 'styles')]
                },

                /**
                 * Raw loader support for *.html
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: [helpers.root('src/index.html')]
                },

                /**
                 * File loader for supporting images, for example, in CSS files.
                 */
                {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader'
                },
                /* File loader for supporting fonts, for example, in CSS files.
                 */
                {
                    test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                    use: 'file-loader'
                }

            ],

        },

        /**
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins: [
            // Use for DLLs
            // new AssetsPlugin({
            //   path: helpers.root('dist'),
            //   filename: 'webpack-assets.json',
            //   prettyPrint: true
            // }),

            /**
             * Plugin: ForkCheckerPlugin
             * Description: Do type checking in a separate process, so webpack doesn't need to wait.
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
             */
            new CheckerPlugin(),
            /**
             * Plugin: CommonsChunkPlugin
             * Description: Shares common code between the pages.
             * It identifies common modules and put them into a commons chunk.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
             * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
             */
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),
            /**
             * This enables tree shaking of the vendor modules
             */
            // new CommonsChunkPlugin({
            //   name: 'vendor',
            //   chunks: ['main'],
            //   minChunks: module => /node_modules/.test(module.resource)
            // }),
            /**
             * Specify the correct order the scripts will be injected in
             */
            // new CommonsChunkPlugin({
            //   name: ['polyfills', 'vendor'].reverse()
            // }),
            // new CommonsChunkPlugin({
            //   name: ['manifest'],
            //   minChunks: Infinity,
            // }),


            /**
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             *
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([{from: 'src/assets', to: 'assets'}]),

            new ProvidePlugin({
                // ...
                $: "jquery",
                jQuery: "jquery",
                'window.jQuery': "jquery",
                // add this:
            }),

            /*
             * Plugin: PreloadWebpackPlugin
             * Description: Preload is a web standard aimed at improving
             * performance and granular loading of resources.
             *
             * See: https://github.com/GoogleChrome/preload-webpack-plugin
             */
            //new PreloadWebpackPlugin({
            //  rel: 'preload',
            //  as: 'script',
            //  include: ['polyfills', 'vendor', 'main'].reverse(),
            //  fileBlacklist: ['.css', '.map']
            //}),
            //new PreloadWebpackPlugin({
            //  rel: 'prefetch',
            //  as: 'script',
            //  include: 'asyncChunks'
            //}),

            /*
             * Plugin: HtmlWebpackPlugin
             * Description: Simplifies creation of HTML files to serve your webpack bundles.
             * This is especially useful for webpack bundles that include a hash in the filename
             * which changes every compilation.
             *
             * See: https://github.com/ampedandwired/html-webpack-plugin
             */
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                title: METADATA.title,
                chunksSortMode: 'dependency',
                metadata: METADATA,
                inject: 'body'
            }),

            /**
             * Plugin: ScriptExtHtmlWebpackPlugin
             * Description: Enhances html-webpack-plugin functionality
             * with different deployment options for your scripts including:
             *
             * See: https://github.com/numical/script-ext-html-webpack-plugin
             */
            new ScriptExtHtmlWebpackPlugin({
                sync: /polyfills|vendor/,
                defaultAttribute: 'async',
                preload: [/polyfills|vendor|main/],
                prefetch: [/chunk/]
            }),

            /**
             * Plugin: HtmlElementsPlugin
             * Description: Generate html tags based on javascript maps.
             *
             * If a publicPath is set in the webpack output configuration, it will be automatically added to
             * href attributes, you can disable that by adding a "=href": false property.
             * You can also enable it to other attribute by settings "=attName": true.
             *
             * The configuration supplied is map between a location (key) and an element definition object (value)
             * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
             *
             * Example:
             *  Adding this plugin configuration
             *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
             *
             *  Means we can use it in the template like this:
             *  <%= webpackConfig.htmlElements.headTags %>
             *
             * Dependencies: HtmlWebpackPlugin
             */
            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
            }),

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new LoaderOptionsPlugin({}),


            /**
             * Plugin: InlineManifestWebpackPlugin
             * Inline Webpack's manifest.js in index.html
             *
             * https://github.com/szrenwei/inline-manifest-webpack-plugin
             */
            new InlineManifestWebpackPlugin(),
        ],

        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }

    };
}

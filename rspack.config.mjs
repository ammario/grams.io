import { defineConfig } from "@rspack/cli";
import { rspack } from '@rspack/core';
import HtmlWebpackPlugin from "html-webpack-plugin";

export default defineConfig({
  experiments: {
    css: true,
  },
  entry: {
    index: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                react: {
                  pragma: "h",
                  pragmaFrag: "Fragment",
                },
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/i,
        use: [rspack.CssExtractRspackPlugin.loader, 'css-loader'],
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false,
      filename: "index.html",
      template: "src/index.html",
      inject: "head",
    }),
    {
      apply(compiler) {
        compiler.hooks.compilation.tap(
          "ScriptAttributeInjector",
          (compilation) =>
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
              "ScriptAttributeInjector",
              (data, cb) => {
                data.assetTags.scripts = data.assetTags.scripts.map((asset) => {
                  asset.attributes.type = "module";
                  return asset;
                });
                return cb(null, data);
              }
            )
        );
      },
    },
    new rspack.CssExtractRspackPlugin({})
  ],
  devServer: {
    hot: false,
    port: 8080,
    historyApiFallback: true,
    allowedHosts: "all",
    host: "0.0.0.0",
    headers: [
      {
        key: "Cache-Control",
        value: "no-store",
      },
    ],
  },
});

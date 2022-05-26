const path = require("path");
console.log("THEME", process.env.VUE_APP_THEME);
module.exports = {
  publicPath: "/",
  configureWebpack: {
    resolve: {
      alias: {
        "@theme": path.resolve(
          __dirname,
          `src/styles/${process.env.VUE_APP_THEME}/`
        )
      }
    }
  }
};

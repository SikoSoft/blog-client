const config = require("./src/data/config.json");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/"
};

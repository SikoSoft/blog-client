console.log(process.env.NODE_ENV);
module.exports = {
  siteName: "Random Ramblings",
  init:
    process.env.NODE_ENV === "development"
      ? "http://localhost:7071/api/init"
      : "https://sikosoftblog.azurewebsites.net/api/init"
};

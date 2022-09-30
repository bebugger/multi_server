const http = require("http");
const { app } = require("./app");

for (var i = 3000; i < app.length; i++) {
  const port = i;
  app[i].set("port", port);

  const errorHandler = (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const address = server.address();
    const bind =
      typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges.");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use.");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const server = http.createServer(app[i]);
  server.on("error", errorHandler);
  server.on("listening", () => {
    const address = server.address();
    const bind =
      typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
    console.log("Server address " + address);
  });

  server.listen(port);
}

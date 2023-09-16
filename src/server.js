import { createServer } from "http";

const server = createServer(function(req, res) {
  console.log("Got request");
  console.log(req.headers);

  req.socket.on("close", function() {
    console.log("Closing peer socket");
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("ok");
});

server.listen(8080, "0.0.0.0", function() {
  console.log("Server started");
});

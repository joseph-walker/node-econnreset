import { request, Agent } from "http";

const agent = new Agent({ keepAlive: true });

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

async function main() {
  console.log("Starting");

  while (true) {
    const req = request({
      hostname: "0.0.0.0",
      port: 8080,
      method: "GET",
      agent,
    });

    req.on("response", function(response) {
      response.on("data", function() { }); // Deleting this line resolves the ECONNRESET
    });

    req.end();

    await sleep(4999);
  }
}

main();

# node-econnreset
Minimal reproduction for ECONNRESET race condition with keepalive

## Reproducing ECONNRESET errors reliably
Node's HTTP implementation seems to come with a race condition related to keepalive. When a socket is being kept alive but is closed by the remote peer right as Node is about to write data to it, Node does not cycle the destroyed socket out of its connection pool and writes more data to it, leading the remote to send a RST packet and throwing the client ECONNRESET error.

1) Run the server `node run ./src/server.js`
2) Run the client `node run ./src/index.js`
3) Observe the ECONNRESET that will eventually occur (It is a race condition so is technically random, but will generally occur within 15 seconds)

## Observations
Given that the issue is resolved if the event handler for the request's `response` event is removed, this is almost assuredly related to the event loop and queue order.

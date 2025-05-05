// this file act as entry point for both nextjs app and socket server
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost"
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port : Number(port), turbopack: true, turbo: true });
// handler is a function
const handler = app.getRequestHandler();

// prepare & then start the server
app.prepare().then(
  () => {
    const httpServer = createServer(handler);
    console.log("NEXTJS + Socket Server")
    // creat io - THE WS Server
    const io = new Server(httpServer, {
    });
    io.on("connection", (socket) => {
      console.log()
      console.log("Client Connected: Server Online",socket.id);

      socket.on("hello", (data) => {
        console.log("FROM CLIEjNT", data)
      })
    });
    // forward all non-socket.io like nextjs requests to next.js
    httpServer.once("error", (err) => {
      console.error(err);
      process.exit(1);
    }).listen(port, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  },
);

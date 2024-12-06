import http from "http";
import express from "express";
import { mongo } from "./mongo.js";

/**
 * SERVER META
 */
const port = 5000;

/**
 * SERVER
 */
const app = express();
const server = http.createServer(app);

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.end();
});


server.listen(port, () => {
  console.log("Server is listening");
  console.log(`Open the app : http://localhost:${port}/`);
});

/**
 * Close the connection with Mongo Cluster
 */
server.on("close", () => {
  mongo.close().then(() => console.log("Connection with the cluster closed..."));
});

process.on("SIGINT", () => {
  server.close();
});
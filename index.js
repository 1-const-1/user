import http from "http";
import crypto from "crypto";
import express from "express";
import {v4 as uuidv4} from "uuid";
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

app.post("/user/create", (req, res) => {
  let body = Buffer.from([]);
  const coll = "users";

  req.on("data", (ch) => {
    body = Buffer.concat([body, ch]).toString();
  });

  req.on("end", async () => {
    const jData = JSON.parse(body);
    jData["id"] = uuidv4();

    try {
      const db = mongo.db("users");
      await db.collection(coll).insertOne(jData);
    } catch (err) {
      return res.json({
        "status" : "error",
        "message" : "Failed action..."
      });
    }

    const hash = crypto.createHash("md5").update(JSON.stringify(jData)).digest("hex");

    res.json({
      "status" : "success",
      "message" : "Successfully inserted...",
      userId: jData["id"], 
      hash: hash
    });
  });

});

app.post("/user/get", (req, res) => {
  let body = Buffer.from([]);
  const coll = "users";

  req.on("data", (ch) => {
    body = Buffer.concat([body, ch]).toString();
  });

  req.on("end", async () => {
    const jData = JSON.parse(body);

    let user = null;

    try {
      const db = mongo.db("users");
      user = await db.collection(coll).findOne({id: jData["uid"]});
    } catch (err) {
      return res.json({
        "status" : "error",
        "message" : "Failed action..."
      });
    }

    res.json(user !== null ? user : {
      "status" : "error",
      "message" : "Failed action..."
    });

  });

});

app.post("/user/change", (req, res) => {
  let body = Buffer.from([]);
  const coll = "users";

  req.on("data", (ch) => {
    body = Buffer.concat([body, ch]).toString();
  });

  req.on("end", async () => {
    const jData = JSON.parse(body);

    let user = null;
    try {
      const db = mongo.db("users");
      await db.collection(coll).updateOne({id: jData["id"]}, {$set: {name: jData.name}});
      user = await db.collection(coll).findOne({id: jData["id"]});
    } catch (err) {
      return res.json({
        "status" : "error",
        "message" : "Failed action..."
      });
    }

    res.json(user);
  });

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
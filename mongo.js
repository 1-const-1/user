import {MongoClient} from "mongodb";

const uri = "mongodb+srv://test_user:test@cluster0.lpeuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const mongo = new MongoClient(uri);

(async () => {
  try {

    await mongo.connect();
    console.log("Connection with my cluster established correctly!");

  } catch (err) {
    console.log(err);
    throw err;
  }
})();
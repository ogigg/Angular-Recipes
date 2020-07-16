const databaseName = "recipes";
const databaseUrl = `mongodb://localhost:27017/${databaseName}`;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const insert = async (recipe) => {
  console.log(recipe);
  const client = new MongoClient(databaseUrl);

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(databaseName);
    let r = await db.collection("recipes").insertOne(recipe);
    assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

const getAll = async () => {
  const client = new MongoClient(databaseUrl);
  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db(databaseName);
  return new Promise(function (resolve, reject) {
    db.collection("recipes")
      .find()
      .toArray(function (err, docs) {
        if (err) {
          return reject(err);
        }
        return resolve(docs);
      });
  });
};

module.exports = {
  insert: insert,
  getAll: getAll,
};

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

    // Insert a single document
    let r = await db.collection("recipes").insertOne(recipe);
    assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
};

module.exports = {
  insert: insert,
};

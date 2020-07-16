const databaseName = "recipes";
const databaseUrl = `mongodb://localhost:27017/${databaseName}`;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const insert = async (recipe) => {
  console.log(recipe);
  const client = new MongoClient(databaseUrl);

  try {
    await client.connect();
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

const getRecipe = async (recipeId) => {
  const client = new MongoClient(databaseUrl);
  await client.connect();
  const db = client.db(databaseName);
  return new Promise(function (resolve, reject) {
    db.collection("recipes")
      .findOne({ id: parseInt(recipeId) })
      .then(function (docs) {
        client.close();
        return resolve(docs);
      });
  });
};

const insertRecipe = async (recipe) => {
  console.log(recipe);
  const client = new MongoClient(databaseUrl);
  await client.connect();
  const db = client.db(databaseName);
  return new Promise(function (resolve, reject) {
    db.collection("recipes").insertOne(recipe, function (err, result) {
      client.close();
      return resolve(recipe);
    });
  });
};

module.exports = {
  insert: insert,
  getAll: getAll,
  getRecipe: getRecipe,
  insertRecipe: insertRecipe,
};

const { MongoClient } = require("mongodb");
//require("dotenv").config({ path: "./config.env" });
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
var _db;
 
module.exports = {
  connectToServer: async function (callback) {
  try {
  await client.connect();
  _db = await client.db("Codeboxx");
  console.log("Successfully connected to MongoDB.");
  return callback(null);
  } catch (err) {
  console.error("Error connecting to MongoDB:", err);
  return callback(err);
  }
  },
  
  getDb: function () {
  return _db;
  },
  };
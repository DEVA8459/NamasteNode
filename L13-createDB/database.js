const { MongoClient } = require("mongodb");

const URL =
  "mongodb+srv://devendragour621:fQmAadlyHnBBW771@cluster0.wfg2r.mongodb.net/";

const client = new MongoClient(URL);

const dbName = "CompassTest";

//
async function main() {
  //use connect methode to connect to the server
  await client.connect();
  console.log("Connected to the server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  //finding the doc from the collection
  // got to doc of mongo db for allthe methods

  const findResult = await collection.find({}).toArray();
  console.log("Find Result", findResult);


  //adding data
  const data = {
    firstName: "Deepika",
    lastName: "padukone",
    city: "apna ghar",
    phoneNo: "8459012752",
  };

  const insertResult = await collection.insertOne(data);
 console.log("Insert Result", insertResult);

  //updating the data
  const updateResult = await collection.updateOne(
    { firstName: "Deepika" },
    { $set: { firstName: "Deepika Padukone" } }
  );

const findResult2 = await collection.find({}).toArray();
console.log("Find Result", findResult2);

// similarly youcan perform CRUD operations
// to get more details on 

  return `done`;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

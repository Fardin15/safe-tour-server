const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lnrcai2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const collection = client.db("allSpot").collection("spots");
    const countryCollection = client.db("countryDb").collection("country");
    // get all spot
    app.get("/addspot", async (req, res) => {
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // get specific spot by id
    app.get("/addspot/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collection.findOne(query);
      res.send(result);
    });
    // post
    app.post("/addspot", async (req, res) => {
      const spot = req.body;
      const result = await collection.insertOne(spot);
      res.send(result);
    });
    // get specific spot by email
    app.get("/mylist/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await collection.find(query).toArray();
      res.send(result);
    });
    // update specific spot by id
    app.put("/addspot/:id", async (req, res) => {
      const id = req.params.id;
      const updatedSpot = req.body;
      console.log(updatedSpot);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          country: updatedSpot.country,
          spot: updatedSpot.spot,
          location: updatedSpot.location,
          description: updatedSpot.description,
          photo: updatedSpot.photo,
          cost: updatedSpot.cost,
          season: updatedSpot.season,
          time: updatedSpot.time,
          visitors: updatedSpot.visitors,
        },
      };
      const result = await collection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    // delete specific spot by id
    app.delete("/addspot/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collection.deleteOne(query);
      res.send(result);
    });

    // contry data
    app.get("/country", async (req, res) => {
      const cursor = countryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("safe tour server is running");
});

app.listen(port, () => {
  console.log("safe tour in running to port", port);
});

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mohammadshowrav15
// toRD82Sau77k7tzb

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://mohammadshowrav15:toRD82Sau77k7tzb@cluster0.lnrcai2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    app.get("/addspot", async (req, res) => {
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/addspot", async (req, res) => {
      const spot = req.body;
      const result = await collection.insertOne(spot);
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

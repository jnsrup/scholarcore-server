require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.alsvbpl.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    },
});app.get("/", (req, res) => {
  res.send("user server is available");
});

async function run() {
  try {
    await client.connect();
   const database = client.db("myReviews");       // database name
    const reviewCollection = database.collection("myReviews"); // collection name

    // ✅ GET all reviews
    app.get("/myReview", async (req, res) => {
      const reviews = await reviewCollection.find({}).toArray();
      res.send(reviews);
    });




// Get habits for a specific user
app.get("/scholarData/user/:email", async (req, res) => {
  const email = req.params.email;
  const query = { userEmail: email };

  try {
    const scholarData = await scholarCollection.find(query).toArray();
    res.send(scholarData);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch user scholar", error });
  }
});



    await client.db("admin").command({ ping: 1 });
    console.log("pinged your deployment. You successfully connected to MongoDB!");

  } 
  finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`users server started on port :${port}`);
});

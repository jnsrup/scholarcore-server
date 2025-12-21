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
   const database = client.db("myReviews");       // database name(I cannot change DB name in mongodb, but this should be different name )
    const reviewCollection = database.collection("myReviews"); // collection name
    const scholarshipCollection = database.collection("universities"); //collection name
    const scholarshipReviewCollection = database.collection("reviewById")  
    const applicationCollection = database.collection("applications") //applications collection

    //  GET all reviews
    app.get("/myReview", async (req, res) => {
      const reviews = await reviewCollection.find({}).toArray();
      res.send(reviews);
    });

    
    // get reviewById 
    app.get("/universities/:id/reviews", async(req, res ) =>{
      
      try{
          const universityId = req.params.id;
          const query = { universityId};
          
          const reviews = await scholarshipReviewCollection.find(query).toArray();
          res.send(reviews);
          
      }
      catch(error) {
    res.status(500).send({ message: "Failed to fetch reviews" });
  }
    })
     
//  Get All universities data
app.get("/universities", async( req, res) =>{
  const result = await scholarshipCollection.find({}).toArray();
   res.send(result);
});
 
 app.get("/universities/:id", async( req, res)=>{
  const id = req.params.id
  const result = await scholarshipCollection.findOne({id} )
  res.send(result);

 });

 
//application
app.post("/apply-scholarship", async (req, res) => {
  try {
    const applicationData = {
      universityName: req.body.universityName,
      scholarshipName: req.body.scholarshipName,
      applicationFee: req.body.applicationFee,

      studentName: req.body.studentName,
      fatherName: req.body.fatherName,
      passportId: req.body.passportId,
      nid: req.body.nid,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,

      sscRoll: req.body.sscRoll,
      sscGpa: req.body.sscGpa,
      hscRoll: req.body.hscRoll,
      hscGpa: req.body.hscGpa,
      honorsRegistration: req.body.honorsRegistration,
      honorsGpa: req.body.honorsGpa,

      image: req.body.image, // ImgBB URL

      status: "pending",
      createdAt: new Date(),
    };

    const result = await applicationCollection.insertOne(applicationData);

    res.send({
      success: true,
      message: "Application submitted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
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

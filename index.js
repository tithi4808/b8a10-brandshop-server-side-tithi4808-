const express = require('express')
require('dotenv').config()
const app = express()
const cors=require("cors")
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERID}:${process.env.USERPASS}@cluster0.3vwvgpx.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
        const database = client.db("Products");
        const ProductsCollection = database.collection("products");

        const database1 = client.db("brands");
        const brandsCollection = database1.collection("brands");

        app.get("/Products",async(req,res)=>{

          const cursor=ProductsCollection.find()
          const result = await cursor.toArray()
          res.send(result)


        })
        app.get("/brands",async(req,res)=>{

          const cursor=brandsCollection.find()
          const result = await cursor.toArray()
          res.send(result)


        })

        app.post("/brands",async(req,res)=>{
          const newbrand=req.body
          const result = await brandsCollection.insertOne(newbrand);
          res.send(result)
          console.log(newbrand)
        })

        app.post("/Products",async(req,res)=>{
          const newuser=req.body
          const result = await ProductsCollection.insertOne(newuser);
          res.send(result)
          console.log(result)
        })




    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
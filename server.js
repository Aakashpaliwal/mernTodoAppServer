import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import userRoutes from './Routes/user.js'
import todoRoutes from './Routes/todolist.js'

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors()
);
app.get("/", (req, res) => res.send("Hello world!"));

//routes
app.use('/users', userRoutes)
app.use('/todolist', todoRoutes)

const port = process.env.PORT || 8082;

mongoose
  .connect(
    "mongodb+srv://akashpaliwal:Hashirama123@cluster0.uzv19qw.mongodb.net/todo_db?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.uzv19qw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(
  "mongodb+srv://akashpaliwal:Hashirama123@cluster0.uzv19qw.mongodb.net/todo_db?retryWrites=true&w=majority&appName=Cluster0",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("todo_db").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    app.listen(port, () => console.log(`Server running on port ${port}`));
    // let collectionList = await client.db("todo_db").listCollections().toArray();
    // console.log("collectionList==", collectionList);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

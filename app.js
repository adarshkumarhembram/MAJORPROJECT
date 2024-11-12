const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');  

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";  

main().then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.log("Error connecting to DB:", err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/testingListing", async (req, res) => {
  try {
    let sampleListing = new Listing({
      title: "My New Villa",
      description: "By the beach",
      price: 1200,
      location: "Calgunte, Goa",
      country: "India"
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("Successfully saved the listing");
  } catch (error) {
    console.log("Error saving the listing:", error);
    res.status(500).send("Error saving the listing");
  }
});

app.listen(8080, () => {
  console.log('Server is running at port 8080');
});

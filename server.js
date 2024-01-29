const express = require("express");
const connectToMongoose = require("./config/db");
const cors = require("cors");
// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongoose();

app.get("/", (req, res) => {
  res.send("Himalyan is running!");
});
// Contact Routes
app.use("/api/contact", require("./routes/contactRoutes"));

// Products Routes
app.use("/api/product", require("./routes/productRoutes"));

// Gallery Routes
app.use("/api/gallery", require("./routes/galleryRoutes"));

// Listen App
app.listen(3000, () => {
  console.log("Himalyan is listening on 3000!");
});

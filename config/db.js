const mongoose = require("mongoose");

const connectToMongoose = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected To Database");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

module.exports = connectToMongoose;

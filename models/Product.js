const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feature_img: {
    type: String,
    required: true,
  },
  header_img: {
    type: String,
    required: true,
  },
  main_description: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  imgArray: [String], // array of other images
  advantage: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: [String],
    img: {
      type: String,
      required: true,
    },
  },
  secondHeading: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Product", productSchema);

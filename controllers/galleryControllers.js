const Product = require("../models/Product");

exports.fetchAll = async (req, res) => {
  try {
    const products = await Product.find().select("name imgArray");

    // Select 3 images from each product
    const response = products.map((product) => {
      return {
        title: product.name,
        imgArray: product.imgArray.slice(0, 3),
      };
    });
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to Fetch Gallery Data",
    });
  }
};

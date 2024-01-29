const express = require("express");
const {
  create,
  fetchAll,
  deleteProduct,
  edit,
  fetchOne,
} = require("../controllers/productControllers");
const { uploadMulter } = require("../middlewares/multerMiddleware");

const router = express.Router();

// Fetch all products
router.get("/all", fetchAll);

// Fetch Single Product
router.get("/:id", fetchOne);

// Add Product
router.post("/add", uploadMulter, create);

// Delete Product
router.delete("/delete/:id", deleteProduct);

// Update Product
router.put("/update/:id", uploadMulter, edit);

module.exports = router;

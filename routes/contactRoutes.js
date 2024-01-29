const express = require("express");
const {
  create,
  fetchAll,
  remove,
} = require("../controllers/contactControllers");

const router = express.Router();

// Add Contact
router.post("/post", create);

// Fetch All Contacts Messages
router.get("/get", fetchAll);

// Delete Contact Messages
router.delete("/delete/:id", remove);

module.exports = router;

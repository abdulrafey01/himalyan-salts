const express = require("express");
const { fetchAll } = require("../controllers/galleryControllers");
const router = express.Router();

router.get("/all", fetchAll);

module.exports = router;

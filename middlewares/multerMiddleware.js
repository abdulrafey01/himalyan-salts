const multer = require("multer");
exports.uploadMulter = multer({
  storage: multer.memoryStorage(),
}).any();

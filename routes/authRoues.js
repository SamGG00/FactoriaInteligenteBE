const express = require("express");
const { authController,validateToken } = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", authController);
router.get('/validate-token', validateToken);
module.exports = router;

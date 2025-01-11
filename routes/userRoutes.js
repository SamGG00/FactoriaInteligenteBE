const express = require('express');
const { getAllUsersController,postUserController } = require('../controllers/UserControllers');
const router = express.Router();
const {authenticateToken}=require("../middleware/authMiddleware")

router.get('/users',authenticateToken,getAllUsersController)
router.post('/newUser',authenticateToken,postUserController)

module.exports = router;
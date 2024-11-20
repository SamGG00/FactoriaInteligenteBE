const express = require('express');
const { getAllUsersController,postUserController } = require('../controllers/UserControllers');
const router = express.Router();

router.get('/users',getAllUsersController)
router.post('/newUser',postUserController)

module.exports = router;
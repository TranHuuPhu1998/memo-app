const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers');

//content

router.route('/')
    .get(userController.GetAllUser)
    .post(userController.NewOneUser)

module.exports = router;
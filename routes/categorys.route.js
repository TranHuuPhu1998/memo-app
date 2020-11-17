// Import dependiences

const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controllers');
//content

router.route('/')
    .get(categoryController.GetAllCategory)
    .post(categoryController.NewCategory)
router.route('/:postId')
    .delete(categoryController.DeleteOneCategory)
    .put(categoryController.UpdateCategory)

module.exports = router;
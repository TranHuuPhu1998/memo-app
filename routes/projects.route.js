// Import dependiences

const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects.controllers');
//content
// node : not localhost:8888 , true : localhost:8888/project/
router.route('/')
    .get(projectsController.index)
    .post(projectsController.newProject)
router.route('/:postId')
    .get(projectsController.getID)
    .delete(projectsController.delete)
    .put(projectsController.updated)
// Export module

module.exports = router;
const Project = require("../models/project.model")

module.exports = {
    index: async (req, res, next) => {
        Project.find({})
            .then(projects => {
                console.log(projects);
                res.status(200).json(projects);
            })
            .catch(err => {
                next(err);
            })
    },
    getID: async (req, res, next) => {
        Project.findById(req.params.postId)
            .then(projects => {
                res.status(200).json(projects);
            })
            .catch(err => {
                next(err);
            })
    },

    delete: async (req, res, next) => {
        Project.remove({ _id: req.params.postId })
            .then(projects => {
                res.json(projects);
            })
            .catch(err => {
                next(err);
            })
    },

    updated: async (req, res, next) => {
        Project.updateOne({ _id: req.params.postId },
            {
                $set: {
                    nameProject: req.body.nameProject
                    , descProject: req.body.descProject
                }
            })
            .then(projects => {
                res.json(projects);
            })
            .catch(err => {
                next(err);
            })
    },

    newProject: async (req, res, next) => {
        const newProject = new Project(req.body);
        newProject.save()
            .then(project => {
                console.log(project)
                // res.status(201).json(project)
            })
            .catch(err => {
                next(err);
            })
    }
}

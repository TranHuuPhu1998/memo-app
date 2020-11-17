const Category = require("../models/category.model")


module.exports = {
    GetAllCategory: async (req, res, next) => {
        Category.find({})
            .then(categorys => {
                res.status(200).json(categorys);
            })
            .catch(err => {
                next(err);
            })
    },
    GetOneCategory: async (req, res, next) => {
        Category.findById(req.params.postId)
            .then(categorys => {
                res.status(200).json(categorys)
            })
            .catch(err => {
                next(err)
            })
    },
    DeleteOneCategory: async (req, res, next) => {
        Category.remove({ _id: req.params.postId })
            .then(categorys => {
                res.json(categorys)
            })
            .catch(err => {
                next(err)
            })
    },
    NewCategory: async (req, res, next) => {
        const NewCategory = new Category(req.body);
        NewCategory.save()
            .then(categorys => {
                console.log(categorys);
                res.json(categorys)
            })
            .catch(err => {
                next(err)
            })
    },
    UpdateCategory: async (req, res, next) => {
        Category.updateOne({ _id: req.params.postId }, {
            $set: {
                name: req.body.name
            }
        })
            .then(categorys => {
                res.json(categorys)
            })
            .catch(err => {
                next(err)
            })
    }

}
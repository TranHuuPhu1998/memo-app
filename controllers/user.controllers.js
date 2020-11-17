const User = require("../models/user.model")


module.exports = {
    GetAllUser: async (req, res, next) => {
        User.find({})
            .then(users => {
                res.status(200).json(users)
            })
    },
    NewOneUser: async (req, res, next) => {

        const newUser = new User(
            req.body
        );
        newUser.save()
            .then(users => {
                console.log(users);
                res.json(users)
            })
            .catch(err => {
                next(err)
            })
    }
}
const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const loginModel = new Schema({
    token: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "loginModel"
    },
})

const login = mongooes.model('login', loginModel);
module.exports = login;
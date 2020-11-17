const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const projectSchem = new Schema({
    nameProject: String,
    descProject: String,
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'UserID'
    }
});

const project = mongooes.model('project', projectSchem)

module.exports = project;
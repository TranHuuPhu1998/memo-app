const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const categorySchema = new Schema({
    category: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "category"
    }
});

const category = mongooes.model('category', categorySchema);
module.exports = category;
const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const memoSchema = new Schema({
    categoryName: String,
    titleMemo: String,
    contentMemo: String,
    clip: { type: Boolean, default: false },
    editnote: { type: Boolean, default: false },
    newnote: { type: Boolean, default: false },
    categoryDate: { type: Date, default: Date.now },
    userId: {
        type: Schema.Types.ObjectId
        , ref: "memo"
    },

})

const memo = mongooes.model('memo', memoSchema);
module.exports = memo;
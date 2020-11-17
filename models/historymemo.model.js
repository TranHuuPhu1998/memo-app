const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const historymemoSchema = new Schema({
    categoryName: String,
    titleMemo: String,
    contentMemo: String,
    clip: { type: Boolean, default: false },
    editnote: { type: Boolean, default: false },
    newnote: { type: Boolean, default: false },
    categoryDate: { type: Date, default: Date.now },
    userId: {
        type: Schema.Types.ObjectId
        , ref: "historymemo"
    },

})

const historymemo = mongooes.model('historymemo', historymemoSchema);
module.exports = historymemo;
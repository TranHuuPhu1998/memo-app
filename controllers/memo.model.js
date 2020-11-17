const Memo = require("../models/memo.model");

module.exports = {
    GetAllMemo: async (req, res, next) => {
        Memo.find({})
            .then(memos => {
                res.status(200).json(memos)
            })
            .catch(err => {
                next(err)
            })
    },
    GetOneMemo: async (req, res, next) => {
        Memo.findById(req.params.postId)
            .then(memos => {
                res.status(200).json(memos)
            })
            .catch(err => {
                next(err)
            })
    },
    DeleleOneMemo: async (req, res, next) => {
        Memo.remove({ _id: req.params.postId })
            .then(memos => {
                res.json(memos)
            })
            .catch(err => {
                next(err)
            })
    },
    NewOneMemo: async (req, res, next) => {
        const NewMemo = new Memo(req.body);
        NewMemo.save()
            .then(memos => {
                res.json(memos)
            })
            .catch(err => {
                next(err)
            })
    },
    UpdateOneMemo: async (req, res, next) => {
        Memo.updateOne({ _id: req.params.postId }, {
            $set: {
                titleMemo: req.body.titleMemo,
                contentMemo: req.body.contentMemo,
                categoryName: req.body.categoryName,
                clip: req.body.clip,
                editnote: req.body.editnote,
                newnote: req.body.newnote,
                _id: req.params.postId
            }
        })
            .then(memos => {
                res.json(memos)
            })
            .catch(err => {
                next(err)
            })

    }
}
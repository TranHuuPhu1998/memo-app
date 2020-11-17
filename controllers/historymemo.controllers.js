const Historymemo = require("../models/historymemo.model")

module.exports = {
    HistoryGetAllMemo: async (req, res, next) => {
        Historymemo.find({})
            .then(historys => {
                res.status(200).json(historys)
            })
            .catch(err => {
                next(err)
            })
    },
    HistoryNewOneMemo: async (req, res, next) => {
        const NewHistoryMemo = new Historymemo(req.body);
        NewHistoryMemo.save()
            .then(historys => {
                res.json(historys)
            })
            .catch(err => {
                next(err)
            })
    },
    HistoryDeleteOneMemo: (req, res, next) => {
        Historymemo.remove({ _id: req.params.postId })
            .then(historys => {
                res.json(historys)
            })
            .catch(err => {
                next(err)
            })
    }
}
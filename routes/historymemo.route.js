const express = require('express');
const router = express.Router();

const htrMemoController = require('../controllers/historymemo.controllers');
//content

router.route('/')
    .get(htrMemoController.HistoryGetAllMemo)
    .post(htrMemoController.HistoryNewOneMemo)
router.route('/:postId')
    .delete(htrMemoController.HistoryDeleteOneMemo)

module.exports = router;
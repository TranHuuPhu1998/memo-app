const express = require('express');
const router = express.Router();

const memoController = require('../controllers/memo.model');

router.route('/')
    .get(memoController.GetAllMemo)
    .post(memoController.NewOneMemo)
router.route('/:postId')
    .delete(memoController.DeleleOneMemo)
    .put(memoController.UpdateOneMemo)

module.exports = router;
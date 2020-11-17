const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.route('/register')
    .post(userController.Register)
router.route('/login')
    .post(userController.Login)
router.route('/checkToken')
    .get(userController.checkToken, userController.protectedRoute,
        (req, res) => {
            if (req.user) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        }
    )
    .post(userController.checkToken, userController.protectedRoute,
        (req, res) => {
            if (req.user) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        }
    )



module.exports = router;
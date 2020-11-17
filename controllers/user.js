const User = require("../models/user")
const Login = require("../models/login.model")
const { secretOrKey } = require('../helpers/key');
const jwt = require('jsonwebtoken');
module.exports = {
    Register: (req, res, next) => {
        const newUser = new User({
            username: req.body.username.toString(),
            password: req.body.password.toString()
        });
        // Nếu tạo user thành công thì chúng ta response lại status code là 200, còn thất bại thì là 400
        newUser.save()
            .then(success => res.status(200).send('Successful to create new user'))
            .catch(err => res.status(400).send('Failed to create new user'));
    },
    Login: (req, res, next) => {
        User.findOne({ username: req.body.username })
            .then(user => {

                // Check nếu không user nào tộn tại với username nhận được từ req.body
                if (!user) {
                    return res.status(404).send('No user found');
                }
                // Ở đây mình mặc định là password đã đúng rồi nên không cần check nữa
                // Tạo 1 token và payload data và response lại với status code là 200 cùng với payloaded data
                const token = jwt.sign({ userId: user._id }, secretOrKey);
                res.status(200).json({
                    userId: user._id,
                    token: token
                })
            })
            .catch(err => {
                res.status(400).send('Invalid username or password')
            });
    },


    checkToken: (req, res, next) => {
        try {
            const token = req.headers.authorization;

            // Xác thực token
            jwt.verify(token, secretOrKey, (err, payload) => {
                if (payload) {
                    req.user = payload;
                    next();
                } else {
                    // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
                    res.status(401).send('Unauthorized');
                }
            })
        } catch (err) {
            // Nếu không có token ở header, server sẽ response status code 401 với msg bên dưới        
            res.status(401).send('No token provided');
        }
    },
    protectedRoute: (req, res, next) => {
        // Nếu req.user tồn tại nghĩa là token cũng tồn tại
        if (req.user) {
            return next();
        }

        // Ngược lại server sẽ response status code 401 với msg bên dưới 
        res.status(401).send('Unauthorized');
    }
}
// Define Dependences
require ('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')


// content
const app = express();
app.use(express.json())
app.use(cors());
// Import file router config ./app/
const http = require('http').createServer(app)

const categorys = require('./routes/categorys.route');
const projects = require('./routes/projects.route');
const memos = require('./routes/memo.route');
const htrdeletes = require('./routes/historymemo.route');
const users = require('./routes/user.route');
const jwtUsers = require('./routes/user');
const userController = require('./controllers/user');

//Middlewares
/* set up mocgan */
app.use(logger('dev'))

/* Set up body parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Router đăng ký trong file router
app.use('/projects', projects);
app.use('/category', categorys);
app.use('/dataMemo', memos);
app.use('/htrdelete', htrdeletes);
app.use('/user', users);
app.use('/api', jwtUsers);


//Catch 404 Errors and forwoed them to error handle

app.use((req, res, next) => {
    const err = new Error('Not fonud');
    err.status = 404;
    next(err);
})

//Error handler fun it me loi cua minh code

app.use((req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500;
    //Respend to client

    res.status(status).json({
        error: {
            message: error.message
        }
    })
})

const URI = process.env.MONGODB_URL
mongoose.connect(URI , {
    useCreateIndex: true,
    useFindAndModify : false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('connected to mongoodb')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
// Listen server
http.listen(PORT,()=>{
    console.log('Server is running on port ' , PORT)
})
// Module exports

const teacherRouter = require('./teacher.js')
const userRouter = require('./user.js')
const requireAPIKey = require('../middleware/requireAPIKey')
function route(app) {
    app.use('/teachers', requireAPIKey);
    app.use("/teachers", teacherRouter);
    app.use('/users', userRouter);
    app.use('/', (req, res) => {
        res.send('Hello, this is homepage')
    })


}
module.exports = route;

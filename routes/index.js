const teacherRouter = require('./teacher.js')
function route(app) {
    app.use("/teachers", teacherRouter);
    app.use('/', (req, res) => {
        res.send('Hello, this is homepage')
    })
}
module.exports = route;

const teacherRouter = require('./teacher.js')
const userRouter = require('./user.js')
const studentRouter = require('./student.js')
const requireAPIKey = require('../middlewares/requireAPIKey.js');
const teachers = require('../mock/teacher.js');
const students = require('../mock/student.js');
const { generateJwt, verifyJwt } = require('../middlewares/verifyAuth.js');
function route(app) {
    app.post('/login', (req, res) => {
        const { name, age } = req.query;
        const teacher = teachers.find(teacher => teacher.name === name && teacher.age === parseInt(age));
        if (teacher) {
            const token = generateJwt(teacher, 'teacher');
            return res.send({ token });
        }
        const student = students.find(student => student.name === name && student.age === parseInt(age));
        if (student) {
            const token = generateJwt(student, 'student');
            return res.send({ token });
        }
        return res.send({ error: 'Invalid credentials' });
    });
    app.use("/teachers", verifyJwt, teacherRouter);
    app.use('/students', verifyJwt, studentRouter);
    app.use('/users', userRouter);



}
module.exports = route;

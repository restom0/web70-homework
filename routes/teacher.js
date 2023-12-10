const express = require("express");
const router = express.Router();
const teacher = require('../mock/teacher.js');

router.use(express.json());

router.get('/', (req, res) => {
    if (req.query.from && req.query.to) {
        const filteredTeachers = teacher.filter(el => el.age >= req.query.from && el.age <= req.query.to);
        return res.send(filteredTeachers);
    } else {
        return res.send(teacher);
    }
});

router.get('/:id', (req, res) => {
    const foundTeacher = teacher.find(el => el.id === parseInt(req.params.id));

    if (foundTeacher) {
        return res.send(foundTeacher);
    } else {
        return res.status(404).send({ msg: 'Giáo viên không tồn tại' });
    }
});

router.post('/', (req, res) => {
    const newTeacher = {
        id: teacher.length + 1,
        name: req.query.name,
        age: parseInt(req.query.age),
        subject: req.query.subject,
        experience: parseInt(req.query.experience),
    };

    teacher.push(newTeacher);

    return res.send({
        msg: "Thêm giáo viên thành công",
        data: teacher
    });
});

router.put('/:id', (req, res) => {
    const foundTeacher = teacher.find(el => el.id === parseInt(req.params.id));

    if (foundTeacher) {
        foundTeacher.name = req.query.name || foundTeacher.name;
        foundTeacher.age = req.query.age ? parseInt(req.query.age) : foundTeacher.age;
        foundTeacher.subject = req.query.subject || foundTeacher.subject;
        foundTeacher.experience = req.query.experience ? parseInt(req.query.experience) : foundTeacher.experience;

        return res.send({ msg: "Chỉnh sửa thành công", data: teacher });
    } else {
        return res.status(404).send({ msg: "Tài khoản không tồn tại" });
    }
});

router.delete('/:id', (req, res) => {
    const teacherId = parseInt(req.params.id);
    const foundTeacherIndex = teacher.findIndex(el => el.id === teacherId);

    if (foundTeacherIndex !== -1) {
        teacher.splice(foundTeacherIndex, 1);
        return res.send({ msg: "Xóa thành công", data: teacher });
    } else {
        return res.status(404).send({ msg: "Giáo viên không tồn tại" });
    }
});

module.exports = router;

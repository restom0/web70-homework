const student = require('../mock/student.js');
class studentsController {
    async getStudents(req, res, next) {
        if (req.query.from && req.query.to) {
            const filteredstudents = student.filter(el => el.age >= req.query.from && el.age <= req.query.to);
            return res.send(filteredstudents);
        } else {
            return res.send(student);
        }
    }
    async getStudent(req, res, next) {
        const foundstudent = student.find(el => el.id === parseInt(req.params.id));

        if (foundstudent) {
            return res.send(foundstudent);
        } else {
            return res.status(404).send({ msg: 'Giáo viên không tồn tại' });
        }
    }
    async postStudent(req, res, next) {
        const newstudent = {
            id: student.length + 1,
            name: req.query.name,
            age: parseInt(req.query.age),
            subject: req.query.subject,
            experience: parseInt(req.query.experience),
        };

        student.push(newstudent);

        return res.send({
            msg: "Thêm giáo viên thành công",
            data: student
        });
    }
    async putStudent(req, res, next) {
        const foundstudent = student.find(el => el.id === parseInt(req.params.id));

        if (foundstudent) {
            foundstudent.name = req.query.name || foundstudent.name;
            foundstudent.age = req.query.age ? parseInt(req.query.age) : foundstudent.age;
            foundstudent.subject = req.query.subject || foundstudent.subject;
            foundstudent.experience = req.query.experience ? parseInt(req.query.experience) : foundstudent.experience;

            return res.send({ msg: "Chỉnh sửa thành công", data: student });
        } else {
            return res.status(404).send({ msg: "Tài khoản không tồn tại" });
        }
    }
    async deleteStudent(req, res, next) {
        const studentId = parseInt(req.params.id);
        const foundstudentIndex = student.findIndex(el => el.id === studentId);

        if (foundstudentIndex !== -1) {
            student.splice(foundstudentIndex, 1);
            return res.send({ msg: "Xóa thành công", data: student });
        } else {
            return res.status(404).send({ msg: "Giáo viên không tồn tại" });
        }
    }
}
module.exports = new studentsController();
const db = require('../utils/database/index.js');
class teachersController {
    async getTeachers(req, res, next) {
        try {
            if (req.query.from && req.query.to) {
                const query = {
                    age: { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) }
                };
                const filteredTeachers = await db.teachers.find(query).toArray();
                return res.send(filteredTeachers);
            } else {
                const allTeachers = await db.teachers.find({}).toArray();
                return res.send(allTeachers);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: 'Lỗi máy chủ' });
        }
    }
    async getTeacher(req, res, next) {
        try {
            const teacherId = parseInt(req.params.id);
            const foundTeacher = await db.teachers.findOne({ id: teacherId });

            if (foundTeacher) {
                return res.send(foundTeacher);
            } else {
                return res.status(404).send({ msg: 'Giáo viên không tồn tại' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: 'Lỗi máy chủ' });
        }
    }
    async postteacher(req, res, next) {
        try {
            const newTeacher = {
                name: req.query.name,
                age: parseInt(req.query.age),
                subject: req.query.subject,
                experience: parseInt(req.query.experience),
            };
            await db.teachers.insertOne(newTeacher);

            return res.send({
                msg: "Teacher added successfully",
                data: newTeacher
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: 'Lỗi máy chủ' });
        }
    }
    async putTeacher(req, res, next) {
        try {
            const teacherId = parseInt(req.params.id);
            const foundTeacher = await db.teachers.findOne({ id: teacherId });

            if (foundTeacher) {
                foundTeacher.name = req.query.name || foundTeacher.name;
                foundTeacher.age = req.query.age ? parseInt(req.query.age) : foundTeacher.age;
                foundTeacher.subject = req.query.subject || foundTeacher.subject;
                foundTeacher.experience = req.query.experience ? parseInt(req.query.experience) : foundTeacher.experience;

                await db.teachers.updateOne({ id: teacherId }, { $set: foundTeacher });

                return res.send({ msg: "Chỉnh sửa thành công", data: foundTeacher });
            } else {
                return res.status(404).send({ msg: "Giáo viên không tồn tại" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: 'Lỗi máy chủ' });
        }
    }
    async deleteTeacher(req, res, next) {
        try {
            const teacherId = parseInt(req.params.id);
            const result = await db.teachers.deleteOne({ id: teacherId });

            if (result.deletedCount === 1) {
                return res.send({ msg: "Xóa thành công" });
            } else {
                return res.status(404).send({ msg: "Giáo viên không tồn tại" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: 'Lỗi máy chủ' });
        }
    }
}
module.exports = new teachersController();
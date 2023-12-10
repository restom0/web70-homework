const user = require('../mock/user.js');
class usersController {
    async postUser(req, res, next) {
        const { username, password, isAdmin } = req.query
        let check = false;
        user.map((el) => {
            if (el.username === username) {
                check = true;
                return res.send({
                    msg: "Tài khoản bị trùng"
                })
            }
        })
        if (!check) {
            user.push({
                id: user.length + 1,
                username: username,
                password: password,
                isAdmin: isAdmin ? true : false,
            })
        }
        return res.send({
            msg: "Thêm giáo viên thành công",
            data: user
        })
    }
    async postLogin(req, res, next) {
        const { username, password } = req.query
        const check = user.find(el => el.username === req.query.username);
        if (check) {
            const checkpass = user.find(el => el.password === req.query.password);
            if (checkpass) {
                return res.send({
                    msg: "Đăng nhập thành công",
                })
            }
            else {
                return res.send({
                    msg: "Mật khẩu không đúng",
                })
            }
        }
        else {
            return res.send({
                msg: "Tài khoản không tồn tại",
            })
        }
    }
    async getUsers(req, res, next) {
        const { isAdmin } = req.query
        if (isAdmin) {
            return res.send(user)
        }
        return res.send({ msg: "Forbidden" })
    }
    async getUser(req, res, next) {
        const { isAdmin } = req.query
        if (isAdmin) {
            user.map((el) => {
                if (el.id === parseInt(req.params.id)) {
                    return res.send(el)
                }
            })
            return res.send({ msg: "Tài khoản không tồn tại" })
        }
        return res.send({ msg: "Forbidden" })
    }
    async putUser(req, res, next) {
        const { isAdmin } = req.query
        if (isAdmin) {
            const check = user.find(el => el.username === req.query.username);
            if (check) {
                return res.send({ msg: "Tài khoản bị trùng" });
            }
            else {
                const foundUser = user.find(el => el.id === parseInt(req.params.id));
                if (foundUser) {
                    foundUser.username = req.query.username || foundUser.username;
                    foundUser.password = req.query.password || foundUser.password;
                    foundUser.isAdmin = req.query.isAdmin === "true" ? true : false || foundUser.isAdmin;
                    return res.send({ msg: "Chỉnh sửa thành công", data: user });
                }
                return res.send({ msg: "Tài khoản không tồn tại" });
            }
        }
        return res.send({ msg: "Forbidden" })
    }
    async deleteUser(req, res, next) {
        const { isAdmin } = req.query
        if (isAdmin) {
            const userId = parseInt(req.params.id);
            if (userId > user.length || userId <= 0) {
                return res.send({
                    msg: "Tài khoản không tồn tại"
                });
            } else {
                user = user.filter((_, index) => (index + 1) !== userId);
                return res.send({
                    msg: "Xóa thành công",
                    data: user
                });
            }
        }
        return res.send({ msg: "Forbidden" })
    }
}
module.exports = new usersController();
const jwt = require('jsonwebtoken');

function generateJwt(user, userType) {
    const token = jwt.sign({ ...user, type: userType }, 'secret', { expiresIn: '1h' });
    return token;
}

function verifyJwt(req, res, next) {
    if (!req.headers.authorization) {
        return res.send({ msg: "Fobidden" });
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.send({ msg: "Token không khả dụng" });
        }
        if (decoded.type === 'teacher' && req.baseUrl !== '/teachers') {
            return res.send({ msg: "Lượt truy cập bị từ chối" });
        }

        if (decoded.type === 'student' && req.baseUrl !== '/students') {
            return res.send({ msg: "Lượt truy cập bị từ chối" })
        }

        req.user = decoded;
        next();
    });
}

module.exports = { verifyJwt, generateJwt };

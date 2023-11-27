const express = require("express");
const router = express.Router();
const teacher = require('../mock/teacher.js')
router.get('/', (req, res) => {
    if (req.query.from && req.query.to) {
        teacher.map((el) => {
            if (el.age >= req.query.from && el.age <= req.query.to) {
                res.send(el);
            }
        })
    }
    else {
        res.send(teacher)
    }

})
router.get('/:id', (req, res) => {
    res.send(teacher[req.params.id - 1])
})
module.exports = router;

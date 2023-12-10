const express = require("express");
const studentsController = require("../controllers/studentsController");
const router = express.Router();
router.use(express.json());
router.get('/', studentsController.getStudents);
router.get('/:id', studentsController.getStudent);
router.post('/', studentsController.postStudent);
router.put('/:id', studentsController.putStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;

const express = require("express");
const teachersController = require("../controllers/teachersController");
const router = express.Router();

router.use(express.json());
router.get('/', teachersController.getTeachers);
router.get('/:id', teachersController.getTeacher);
router.post('/', teachersController.postteacher);
router.put('/:id', teachersController.putTeacher);
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;

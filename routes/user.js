const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
router.post('/', usersController.postUser)
router.post('/login', usersController.postLogin)
router.get('/', usersController.getUser)
router.get('/:id', usersController.getUser)
router.put('/:id', usersController.putUser)
router.delete('/:id', usersController.deleteUser)
module.exports = router;
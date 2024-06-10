const express = require("express");
const router = express.Router();
const {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/StudentController.js");

const login = require('../controllers/LoginController.js');
const verifyToken = require("../middleware/verifyToken.js");

router.route('/').get(verifyToken, getAllStudents);
router.route('/:id').get(getStudentById);
router.route("/").post(createStudent);
router.route("/:id").put(updateStudent);
router.route("/:id").delete(deleteStudent);
router.route("/login").post(login);

module.exports = router;

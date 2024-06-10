const express = require("express");
const router = express.Router();
const {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/UserController.js")

const login = require('../controllers/LoginController.js')
const verifyToken = require("../middleware/verifyToken.js")

router.route('/').get(verifyToken, getAllUser)
router.route('/:id').get(getUserById)
router.route("/").post(createUser)
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser);
router.route("/login").post(login)

module.exports = router
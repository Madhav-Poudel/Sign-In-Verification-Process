const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize'); // Import Sequelize
const sequelize = require("../config/db.js");


// @desc Get User
// @route GET /api/user/
// @access public
const getAllUser = async (req, res) => {
    try {
        const allUserDetails = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        if (allUserDetails.length > 0) {
            return res.status(200).json({ message: "User fetched successfully!!", data: allUserDetails })
        } else {
            return res.status(500).json({ message: "Internal server error!!" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

// @desc Create User
// @route POST /api/user/
// @access public
const createUser = async (req, res) => {
    console.log(req.body)
    try {
        const existingEmail = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        const allowedGenderValues = ["male", "female", "others"]
        const enteredGenderValue = (req.body.gender).toLowerCase();
        if (!allowedGenderValues.includes(enteredGenderValue)) {
            return res.status(400).json({ message: "Invalid gender. Must be male, female or others" })

        }

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exist!!" })
        }

        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        if (!hashPassword) {
            return res.status(500).json({ message: "Internal Server error!!" })
        }

        const newUser = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            mobileNumber: req.body.mobileNumber,
            password: hashPassword,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth
        })

        if (newUser) {
            return res.status(201).json({ message: "User Created Successfully!!" })
        } else {
            return res.status(500).json({ message: "Internal Server Error!!" })

        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })

    }
};


// @desc Get User By Id
// @route GET /api/user/:id
// @access public
const getUserById = async (req, res) => {
    let userId = req.params.id
    try {
        const userData = await User.findOne({
            where: {
                id: userId,
            }
        })
        if (userData) {
            return res.status(200).json({ message: "User fetched..", data: userData })
        } else {
            return res.status(500).json({ message: "User not found" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

// @desc Update User
// @route PUT /api/user/:id
// @access public
const updateUser = async (req, res) => {
    let userId = req.params.id;
    try {
        const userData = await User.findOne({
            where: {
                id: userId,
            }
        })

        const existingEmail = await User.findOne({
            where: {
                email: req.body.email,
                id: { [Sequelize.Op.not]: userId } // Exclude the current user from the check
            }
        })

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exist" })
        }

        if (userData) {
            const updatedUserData = await userData.update({
                fullName: req.body.fullName,
                email: req.body.email,
                address: req.body.address,
                mobileNumber: req.body.mobileNumber,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth
            })
            if (updatedUserData) {
                return res.status(201).json({ message: "User updated successfully!!" })
            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        } else {
            return res.status(404).json({ message: "User not found" })
        }


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
};




// @desc Delete User
// @route DELETE /api/user/:id
// @access public
const deleteUser = async (req, res) => {
    let userId = req.params.id;
    try {
        const userData = await User.findOne({
            where: {
                id: userId,
            }
        })

        if (userData) {
            await userData.destroy();
            res.status(200).json({ message: 'User deleted successfully!!' });
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal Server error!!" })
    }
}

module.exports = {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}
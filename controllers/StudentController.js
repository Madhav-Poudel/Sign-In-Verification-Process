// const student = require('../models/User.js')
// const bcrypt = require('bcryptjs');
// const Sequelize = require('sequelize'); // Import Sequelize
// const sequelize = require("../config/db.js");


// const getAllStudent = async (req, res) => {
//     try {
//         const allStudentDetails = await User.findAll({
//             attributes: {
//                 exclude: ['password']
//             }
//         });
//         if (allStudentDetails.length > 0) {
//             return res.status(200).json({ message: "Student Details fetched successfully!!", data: allStudentDetails })
//         } else {
//             return res.status(500).json({ message: "Internal server error!!" })
//         }
//     } catch (error) {
//         console.log("Error", error)
//         return res.status(500).json({ message: "Internal Server Error!!" })
//     }
// }


// const createStudent = async (req, res) => {
//     console.log(req.body)
//     try {
//         const existingEmail = await User.findOne({
//             where: {
//                 email: req.body.email,
//             }
//         })

//         const allowedGenderValues = ["male", "female", "others"]
//         const enteredGenderValue = (req.body.gender).toLowerCase();
//         if (!allowedGenderValues.includes(enteredGenderValue)) {
//             return res.status(400).json({ message: "Invalid gender. Must be male, female or others" })

//         }

//         if (existingEmail) {
//             return res.status(400).json({ message: "Email already exist!!" })
//         }

//         const hashPassword = bcrypt.hashSync(req.body.password, 10);
//         if (!hashPassword) {
//             return res.status(500).json({ message: "Internal Server error!!" })
//         }

//         const newUser = await User.create({
//             fullName: req.body.fullName,
//             email: req.body.email,
//             address: req.body.address,
//             faculty:req.body.faculty,
//             dateOfBirth: req.body.dateOfBirth
//         })

//         if (newUser) {
//             return res.status(201).json({ message: "User Created Successfully!!" })
//         } else {
//             return res.status(500).json({ message: "Internal Server Error!!" })

//         }
//     } catch (error) {
//         console.log("Error", error)
//         return res.status(500).json({ message: "Internal Server Error!!" })

//     }
// };
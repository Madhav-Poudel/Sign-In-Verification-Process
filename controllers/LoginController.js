const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


// @desc Login
// @route POST /api/login/
// @access public
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await User.findOne({
            where: {
                email
            }
        });
        console.log(userExist)
        if (!userExist) {
            return res.status(404).json({ message: "User not found!!" })
        }

        // check if password is correct 
        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if (isPasswordValid) {
            const token = jwt.sign({
                userId: userExist.id,
                email: userExist.email,
                mobileNumber: userExist.mobileNumber
            }, "secretKey", { expiresIn: 120 })

            if (token) {
                res.status(200).json({ message: "LoggedIn Successfully!!", accessToken: token })
            } else {
                return res.status(500).json({ message: "Internal Server Error!!" })
            }
        } else {
            return res.status(401).json({ message: "Invalid Credientails. Couldn't Log in!!" });
        }


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

module.exports = login

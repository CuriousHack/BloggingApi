const User = require('../models/userModel')
const { generateToken } = require('../utils/jwt')

const registerUser = async (firstname, lastname, email, password) => {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const newUser = new User({ firstname, lastname, email, password });
    const payload = ({firstname, lastname, email});
    await newUser.save();
    return generateToken(payload);
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){throw new Error("Invalid Credentials")}
    const isMatch = await user.isValidPassword(password)
    if(!isMatch){throw new Error("Invalid Credentials")}
    return generateToken(user)
}

module.exports = {
    registerUser,
    loginUser
}
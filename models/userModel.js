const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// run this function before creating the user account
userSchema.pre(
    'save',
    async function (next) {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);


const userModel = mongoose.model('user', userSchema)
module.exports = userModel
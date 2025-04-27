const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: [3, 'Name must have at least 3 characters'],
        maxlength: [50, 'Name must have at most 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must have at least 6 characters'],
    },
})

UserSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: '6h'})
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password) 
}

const User = mongoose.model('User', UserSchema)

module.exports = User


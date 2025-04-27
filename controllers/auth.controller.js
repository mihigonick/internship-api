const {BadRequest, UnauthenticatedError} = require('../errors/index.error')

const User = require('../models/User')



const register = async(req, res, next) => {
    const user = await User.create(req.body)
    const token = user.generateToken()
    res.status(201).json({user: {name: user.name}, token})
}


const login = async(req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        return next(new BadRequest("Please provide email and password"))
    }
    const user = await User.findOne({email: email})
    
    if(!user){
        return next(new UnauthenticatedError("Invalid Email"))
    }
    
    if(!await user.comparePassword(password)){
        return next(new UnauthenticatedError("Invalid password"))
    }

    const token = user.generateToken()
    res.status(200).json({user: {name: user.name}, token})
}


module.exports = {
    register,
    login
}
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require("../errors/index.error")

const AuthMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith('Bearer ')){
        return next(new UnauthenticatedError('Authentication failed: No token provided'))
    }

    try{
        const token = authHeaders.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET) 
        req.user = {id: payload.id}
        next()
    }catch(err){
        next(new UnauthenticatedError('Authentication failed: Invalid or expired token'))
    }    
}

module.exports = AuthMiddleware
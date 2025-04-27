const express = require('express')

const authRoutes = require("./routes/auth.route")
const internshipRoutes = require("./routes/internship.route")

//SECURITY
const cors = require("cors")
const helmet = require("helmet")

const rateLimiter = require("express-rate-limit")

const AuthMiddleware = require("./middleware/auth")
const PageNotFoundMiddleware = require('./middleware/not.found')
const ErrorHandlerMiddleware = require('./middleware/error.handler')

const app = express()


app.set('trust proxy', 1);

app.use(express.json()); 

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(cors());
app.use(helmet());





app.use("/api/auth", authRoutes)
app.use("/api/internships", AuthMiddleware, internshipRoutes)

    

app.use(PageNotFoundMiddleware)
app.use(ErrorHandlerMiddleware)


module.exports = app
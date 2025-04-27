const {NotFoundError} = require("../errors/index.error")

const PageNotFound = (req, res, next) => next(new NotFoundError('Route does not exist'))

module.exports = PageNotFound
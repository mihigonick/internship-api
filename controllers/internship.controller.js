const Internship = require("../models/internship")
const {BadRequest, UnauthenticatedError} = require("../errors/index.error")
const asyncWrapper = require("../middleware/async.wrapper")


const getAllInternships = async(req, res, next) => {
    const internships = await Internship.find({createdBy: req.user.id}).sort('-createdAt')
    res.json({internships: internships})
}

const getInternship = asyncWrapper(async(req, res, next) => {
    const {user: {id: userID}, params: {id: internshipID}} = req //RENAME FOR CLARITY
    const internship = await Internship.findOne({_id: internshipID, createdBy: userID})
    if(!internship) return next(new BadRequest("No internship found"))
    res.json(internship);
})

const postInternship = asyncWrapper(async (req, res, next) => {
    req.body.createdBy = req.user.id
    const internship= await Internship.create(req.body)
    res.status(201).json(internship)
})

const updateInternship = asyncWrapper(async(req, res, next) => {
    const {user: {id: userId}, params: {id: internShipID}} = req
    const internship = await Internship.findOneAndUpdate(
        {_id: internShipID, createdBy:userId},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    if(!internship) return next(new BadRequest("No internship found"))
    res.json(internship)
})

const deleteInternship = asyncWrapper(async(req, res, next) => {
    const {user: {id: userId}, params: {id: internShipID}} = req
    const internship = await Internship.findOneAndDelete({_id: internShipID, createdBy:userId})
    
    if(!internship) return next(new BadRequest("No internship found"))
    res.json({msg: "Successfully deleted", internship})
})


module.exports = {
    getAllInternships,
    getInternship,
    postInternship,
    updateInternship,
    deleteInternship
}
const express = require('express')

const {
    getAllInternships,
    getInternship,
    postInternship,
    updateInternship,
    deleteInternship
} = require('../controllers/internship.controller')

const router = express.Router()


router.route("/")
    .get(getAllInternships)
    .post(postInternship)

router.route("/:id")
    .get(getInternship)
    .patch(updateInternship)
    .delete(deleteInternship)

module.exports = router
const mongoose = require('mongoose')

const internshipSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide a company name"],
        minlength: [2, "Company name must be at least 2 characters"]
    },
    title: {
        type: String,
        required: [true, "Please provide a title for the internship"],
        minlength: [5, "Title must be at least 5 characters"]
    },
    duration: {
        type: String,
        required: [true, "Please provide duration"],
        minlength: [3, "Duration must be at least 3 characters"]
    },
    paid: {
        type: Boolean,
        required: [true, "Please specify if the internship is paid"]
    },
    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide userId"]
    }
}, { timestamps: true })

const Internship = mongoose.model('Internship', internshipSchema)

module.exports = Internship

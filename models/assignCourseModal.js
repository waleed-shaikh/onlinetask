const mongoose = require("mongoose");

const assignCourseSchema = new mongoose.Schema(
  {
    batche: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses' // Reference to courses schema
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // Reference to users schema
    },
    deleted: {
        type: Boolean,
        default: false
    },
  },
);

assignCourseSchema.set('autoIndex', true);

const assignCourseModal = mongoose.model("assignCourses", assignCourseSchema);
module.exports = assignCourseModal;

// models/student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }]
});

module.exports = mongoose.model('Student', studentSchema);

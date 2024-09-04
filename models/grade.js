// models/grade.js

const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    grade: String
});

module.exports = mongoose.model('Grade', gradeSchema);
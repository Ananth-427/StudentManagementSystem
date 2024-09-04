const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/StudentManagementDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define mongoose schemas and models (Student, Course, Admin)

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }]
});

const courseSchema = new mongoose.Schema({
    name: String,
    instructor: String
});

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    userType: String
});

const gradeSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    grade: String
});

const Student = mongoose.model('Student', studentSchema);
console.log('Student model created');

const Course = mongoose.model('Course', courseSchema);
console.log('Course model created');

const Admin = mongoose.model('Admin', adminSchema);
console.log('Admin model created');

const Grade = mongoose.model('Grade', gradeSchema);
console.log('Grade model created');


// Middleware
app.use(bodyParser.json());

// Routes for Student Module
app.post('/students', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newStudent = new Student({ name, email });
        console.log('New student instance created:', newStudent);

        const savedStudent = await newStudent.save();
        console.log('Student saved:', savedStudent);

        res.json(savedStudent);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});


app.get('/students/:studentId/profile', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findById(studentId);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/students/:studentId/enroll', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const courseId = req.body.courseId;

        const student = await Student.findById(studentId);
        student.enrolledCourses.push(courseId);

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/students/:studentId/grades', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findById(studentId).populate('grades');
        res.json(student.grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes for Course Module
app.post('/courses/add', async (req, res) => {
    try {
        const { name, instructor } = req.body;
        const newCourse = new Course({ name, instructor });
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/courses/:courseId/edit', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { name, instructor } = req.body;

        const course = await Course.findByIdAndUpdate(courseId, { name, instructor }, { new: true });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/courses/:courseId/delete', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/courses/:courseId/assign-instructor', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const instructor = req.body.instructor;

        const course = await Course.findByIdAndUpdate(courseId, { instructor }, { new: true });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/courses/:courseId/details', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes for Admin Module
app.post('/admin/user-management', async (req, res) => {
    try {
        const { userType, name, email } = req.body;

        if (userType === 'student') {
            const newStudent = new Student({ name, email });
            const savedStudent = await newStudent.save();
            res.json(savedStudent);
        } else if (userType === 'admin') {
            const newAdmin = new Admin({ name, email, userType });
            const savedAdmin = await newAdmin.save();
            res.json(savedAdmin);
        } else {
            res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/admin/grade-management', async (req, res) => {
    try {
        const { studentId, courseId, grade } = req.body;

        const newGrade = new Grade({ studentId, courseId, grade });
        const savedGrade = await newGrade.save();

        const student = await Student.findById(studentId);
        student.grades.push(savedGrade._id);
        await student.save();

        res.json(savedGrade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/admin/course-allocation', async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const student = await Student.findById(studentId);
        student.enrolledCourses.push(courseId);

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// student.js

$(document).ready(function () {
    // Student Registration
    $('#registration-form').submit(function (e) {
        e.preventDefault();
        console.log('Form submitted');
        const name = $('#name').val();
        const email = $('#email').val();
        console.log('Name:', name, 'Email:', email);
        alert('Student registered successfully!');

        $.ajax({
            url: '/students',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name, email }),
            success: function (data) {
                setStudentIdCookie(data.studentId); // Set studentId cookie after successful registration
                alert('Student registered successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Student Profile
    $('#profile-display').ready(function () {
        const studentId = getStudentId();
        $.ajax({
            url: `/students/:studentId/profile`,
            method: 'GET',
            success: function (data) {
                // Display student profile data
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Course Enrollment
    $('#enrollment-form').submit(function (e) {
        e.preventDefault();
        const studentId = getStudentId();
        const courseId = $('#courseId').val();
        alert('Enrolled in course successfully!');
        $.ajax({
            url: `/students/:studentId/enroll`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ courseId }),
            success: function (data) {
                alert('Enrolled in course successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // View Grades
    $('#grades-list').ready(function () {
        const studentId = getStudentId();
        $.ajax({
            url: `/students/:studentId/grades`,
            method: 'GET',
            success: function (data) {
                // Display student grades
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Helper function to retrieve student ID
    function getStudentId() {
        const cookieName = 'studentId';
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${cookieName}=`))
            ?.split('=')[1];

        return cookieValue || '';
    }

    // Helper function to set student ID cookie
    function setStudentIdCookie(studentId) {
        document.cookie = `studentId=${studentId}; path=/`;
    }
});
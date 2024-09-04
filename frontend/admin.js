// admin.js

$(document).ready(function () {
    // User Management
    $('#user-management-form').submit(function (e) {
        e.preventDefault();
        const userType = $('#userType').val();
        const name = $('#name').val();
        const email = $('#email').val();

        $.ajax({
            url: '/admin/user-management',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ userType, name, email }),
            success: function (data) {
                alert('User added successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Grade Management
    $('#grade-management-form').submit(function (e) {
        e.preventDefault();
        const studentId = $('#studentId').val();
        const courseId = $('#courseId').val();
        const grade = $('#grade').val();
        alert('Grade assigned successfully!');
        $.ajax({
            url: '/admin/grade-management',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ studentId, courseId, grade }),
            success: function (data) {
                alert('Grade assigned successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Course Allocation
    $('#course-allocation-form').submit(function (e) {
        e.preventDefault();
        const studentId = $('#studentId').val();
        const courseId = $('#courseId').val();

        $.ajax({
            url: '/admin/course-allocation',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ studentId, courseId }),
            success: function (data) {
                alert('Course allocated successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
});

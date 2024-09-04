// course.js

$(document).ready(function () {
    // Course Addition
    $('#add-course-form').submit(function (e) {
        e.preventDefault();
        const name = $('#course-name').val();
        const instructor = $('#instructor').val();
        alert('Course added successfully!');
        $.ajax({
            url: '/courses/add',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name, instructor }),
            success: function (data) {
                alert('Course added successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Course Editing
    $('#edit-course-form').submit(function (e) {
        e.preventDefault();
        const courseId = $('#course-id').val();
        const name = $('#edited-course-name').val();
        const instructor = $('#edited-instructor').val();

        $.ajax({
            url: `/courses/:courseId/edit`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name, instructor }),
            success: function (data) {
                alert('Course edited successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Course Deletion
    $('#delete-course-form').submit(function (e) {
        e.preventDefault();
        const courseId = $('#delete-course-id').val();

        $.ajax({
            url: `/courses/:courseId/delete`,
            method: 'DELETE',
            success: function (data) {
                alert('Course deleted successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Instructor Assignment
    $('#assign-instructor-form').submit(function (e) {
        e.preventDefault();
        const courseId = $('#assign-course-id').val();
        const instructor = $('#assign-instructor').val();

        $.ajax({
            url: `/courses/:courseId/assign-instructor`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ instructor }),
            success: function (data) {
                alert('Instructor assigned successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Course Details
    $('#course-details-display').ready(function () {
        const courseId = getCourseId();
        $.ajax({
            url: `/courses/:courseId/details`,
            method: 'GET',
            success: function (data) {
                // Display course details
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Helper function to retrieve course ID
    function getCourseId() {
        const cookieName = 'courseId';
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${cookieName}=`))
            ?.split('=')[1];

        return cookieValue || '';
    }

    // Helper function to set course ID cookie
    function setCourseIdCookie(courseId) {
        document.cookie = `courseId=${courseId}; path=/`;
    }
});

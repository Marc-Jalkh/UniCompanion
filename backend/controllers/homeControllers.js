require('dotenv').config();
const db = require('../config/dbconfig.js');
const getCurrentSemester = require('../utils/semester.js');

const convertToGPA = (grade) => {
    if (grade >= 90) return 4.0;
    if (grade >= 87) return 3.66;
    if (grade >= 83) return 3.33;
    if (grade >= 80) return 3.0;
    if (grade >= 77) return 2.66;
    if (grade >= 73) return 2.33;
    if (grade >= 70) return 2.0;
    if (grade >= 67) return 1.66;
    if (grade >= 63) return 1.33;
    if (grade >= 60) return 1.0;
    return 0.0;
};

const getHome = async (req, res) => {
    const user_id = req.user_id;
    const role = req.role;
    try {
        const user = await db('users').select('salutation', 'first_name', 'last_name').where({ user_id }).first();

        const posts = await db('posts').select('*');

        const semester = getCurrentSemester();

        if (role !== 'student') {
            data = {
                user: user.salutation + ' ' + user.first_name + ' ' + user.last_name,
                posts,
                semester: semester.semesterString + ' ' + (semester.year - 1) + '-' + semester.year,
                gpa: 0,
                grade: 0
            }
            res.status(200).json(data);
            return;
        }
        // First, retrieve the grades and credits for the student
        const results = await db('users_courses')
            .join('courses_offering', 'users_courses.course_id', 'courses_offering.courses_offering_id')
            .join('courses', 'courses_offering.course_id', 'courses.course_id')
            .select('users_courses.grade', 'courses.credits')
            .where('users_courses.user_id', user_id);

        // Calculate the total weighted grades and the total credits
        let totalWeightedGrades = 0;
        let totalCredits = 0;
        let totalWeightedGPA = 0;
        results.forEach(result => {
            const credits = parseFloat(result.credits);
            const grade = parseFloat(result.grade);
            const gpa = convertToGPA(grade);

            if (grade === 0) {
                return;
            }

            totalWeightedGrades += grade * credits;
            totalCredits += credits;
            totalWeightedGPA += gpa * credits;
        });

        const grade = totalWeightedGrades / totalCredits;
        const gpa = totalWeightedGPA / totalCredits;


        // Calculate the weighted average grade
        data = {
            user: user.salutation + ' ' + user.first_name + ' ' + user.last_name,
            posts,
            semester: semester.semesterString + ' ' + (semester.year - 1) + '-' + semester.year,
            gpa,
            grade
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

module.exports = {
    getHome
}
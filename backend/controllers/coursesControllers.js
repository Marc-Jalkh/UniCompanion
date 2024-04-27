const db = require('../config/dbconfig.js');

const getCourses = async (req, res) => {
    const user_id  = req.user_id;
    try {
        const courses = await db('programs_courses as pc')
            .join('programs as p', 'p.program_id', 'pc.program_id')
            .join('users_degree as ud', 'ud.program_id', 'p.program_id')
            .leftJoin('courses as c', 'pc.course_id', 'c.course_id')
            .leftJoin('users_courses as uc', function () {
                this.on('uc.course_id', '=', 'pc.course_id').andOn('uc.user_id', '=', db.raw('?', [user_id]))
            })
            .select('c.course_id', 'c.title', 'uc.grade')
            .where('ud.user_id', user_id)
            .orderByRaw('uc.grade IS NULL ASC');  // Courses with no grade (not taken) will be listed last

        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getCourses
}

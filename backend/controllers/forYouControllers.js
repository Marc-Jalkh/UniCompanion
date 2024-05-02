const db = require('../config/dbconfig.js');

const getforYou = async (req, res) => {
    const user_id = req.user_id;
    try {
        const role = await db('users_roles')
            .join('roles', 'users_roles.role_id', 'roles.role_id')
            .where('users_roles.user_id', user_id)
            .andWhere('roles.name', 'student')
            .select('users_roles.user_id', 'roles.name as role_name').first()

        if (!role) {
            const faculty = await db('users_degree')
                .where('user_id', user_id)
                .join('programs', 'users_degree.program_id', 'programs.program_id')
                .join('departments', 'programs.department_id', 'departments.department_id')
                .join('faculties', 'departments.faculty_id', 'faculties.faculty_id')
                .select('faculties.name as faculty_name').first()
            res.json({ faculty: faculty.faculty_name });
            return;

        }


        const result = await db('users_courses as uc')
            .join('courses as c', 'uc.course_id', '=', 'c.course_id')
            .join('users_degree as ud', 'ud.user_id', '=', 'uc.user_id')
            .join('programs as p', 'p.program_id', '=', 'ud.program_id')
            .select(db.raw('SUM(c.credits::integer) as total_credits_earned'))
            .select('p.credits as total_credits_required', 'p.name as degree')
            .where('uc.user_id', user_id)
            .groupBy('p.credits', 'p.name').first();

        if (result) {
            const total_credits_earned = result.total_credits_earned;
            const total_credits_required = result.total_credits_required;
            const percentageCompleted = (total_credits_earned / total_credits_required);
            const degree = result.degree.split(' ')[0];
            const degreeName = result.degree.substring(degree.length + 4, result.degree.length);
            res.json({ progress: `${percentageCompleted.toFixed(2)}%`, level: degree, degree: degreeName });
        } else
            res.status(404).json({ error: 'No data found for this user.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getforYou
}
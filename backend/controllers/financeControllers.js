const db = require('../config/dbconfig.js');

function transformFinances(finances) {
    const grouped = finances.reduce((acc, item) => {
        let semester = item.semester_id % 10;
        let year = Math.floor(item.semester_id % 10)
        if (semester === 1)
            semester = 'Fall';

        else if (semester === 2)
            semester = 'Spring';

        else
            semester = 'Summer';

        let total = item.amount
        let discount = item.amount * item.scholarship / 100;
        if (!acc[item.semester_id]) {
            acc[item.semester_id] = {
                semester_id: semester + ' ' + year + '-' + (year + 1),
                finances: [],
                discount: 0,
                total: 0
            };
        }
        acc[item.semester_id].finances.push({
            source: item.source,
            amount: item.amount
        });
        acc[item.semester_id].discount += discount;
        acc[item.semester_id].total += total - discount;
        return acc;
    }, {});

    // Convert object to array and sort by semester_id in descending order
    const semesters = Object.values(grouped).sort((a, b) => b.semester_id - a.semester_id);

    return semesters;
}



const getFinance = async (req, res) => {
    const user_id = req.user_id;

    try {
        const finances = await db('finance')
            .select('semester_id', 'source', 'amount', 'scholarship')
            .where({ user_id });

        // Group and transform data as required
        const result = transformFinances(finances);

        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {
    getFinance
};
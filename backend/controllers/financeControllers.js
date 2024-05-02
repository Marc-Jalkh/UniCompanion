const db = require('../config/dbconfig.js');

function transformFinances(finances) {
    const grouped = finances.reduce((acc, item) => {
        // Ensure semester_id is treated as a string
        let semester = item.semester_id % 10;
        let year = Math.floor(item.semester_id / 10);
        if (semester === 1) {
            semester = 'Fall';
        } else if (semester === 2) {
            semester = 'Spring';
        } else {
            semester = 'Summer';
        }
        const semesterId = `${semester} ${year}-${parseInt(year) + 1}`;

        if (!acc[semesterId]) {
            acc[semesterId] = {
                finances: [],
                discount: 0,
                total: 0
            };
        }

        let discount = item.amount * (item.scholarship / 100);
        let total = item.amount - discount;

        // Add to the existing financials, discount, and total for the semester
        acc[semesterId].finances.push({
            source: item.source,
            amount: item.amount
        });
        acc[semesterId].discount += discount;
        acc[semesterId].total += total;

        return acc;
    }, {});

    // Convert the internal structure to an array format as required
    return Object.entries(grouped).reduce((acc, [key, value]) => {
        acc[key] = [
            ...value.finances,
            { source: 'Discount', amount: value.discount },
            { source: 'Total', amount: value.total }
        ];
        if (value.discount === 0) {
            acc[key] = acc[key].filter(item => item.source !== 'Discount');
        }
        return acc;
    }, {});
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

const db = require('../config/dbconfig.js');

const getAllEvents = async (req, res) => {
    const user_id = req.user_id;
    try {
        const events = await db('events as e')
            .leftJoin('courses_offering as co', 'co.courses_offering_id', 'e.course_id')  // Using leftJoin to include rows with null course_id
            .leftJoin('users_courses as uc', 'uc.course_id', 'co.courses_offering_id')
            .select('e.*')
            .where(function () {
                this.where('uc.user_id', user_id)
                    .orWhereNull('e.course_id');  // Include events where course_id is null
            });


        const formattedEvents = events.map(event => {
            // If the event is repeating, expand into individual occurrences
            if (event.repeat) {
                const startDate = new Date(event.start_repeat);
                const endDate = new Date(event.end_repeat);
                const daysOfWeek = event.repeated_days.split(',').map(Number);
                const occurrences = [];

                for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                    if (daysOfWeek.includes(date.getDay())) {
                        let start = new Date(date);
                        start.setHours(event.start_time.getHours());
                        start.setMinutes(event.start_time.getMinutes());
                        start.setSeconds(event.start_time.getSeconds());

                        let end = new Date(date);
                        end.setHours(event.end_time.getHours());
                        end.setMinutes(event.end_time.getMinutes());
                        end.setSeconds(event.end_time.getSeconds());

                        occurrences.push({
                            start: start.toISOString(),
                            end: end.toISOString(),
                            title: event.title,
                            location: event.location,
                            description: event.description
                          });
                    }
                }

                return occurrences;
            } else {
                // For non-repeating events, simply return start and end times
                return [{
                    start: event.start_time.toISOString(),
                    end: event.end_time.toISOString(),
                    title: event.title,
                    location: event.location,
                    description: event.description
                  }];
            }
        }).flat();

        res.json(formattedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllEvents
}
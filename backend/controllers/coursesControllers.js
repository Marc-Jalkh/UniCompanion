const db = require("../config/dbconfig.js");

const getCourses = async (req, res) => {
    const userId = req.user_id; // Assuming this comes from authentication middleware

  try {
    const courses = await db('users_courses as uc')
      .join('courses_offering as co', 'uc.course_id', 'co.courses_offering_id')
      .join('courses as c', 'co.course_id', 'c.course_id')
      .select(
        'c.title',
        'co.crn',
        'co.location',
        'uc.grade'
      )
      .where('uc.user_id', userId);

    const semesterGroups = {};

    courses.forEach(course => {
        let semester = course.crn % 10;
        let year = Math.floor(course.crn / 10)
        if (semester === 1)
            semester = 'Fall';

        else if (semester === 2)
            semester = 'Spring';

        else
            semester = 'Summer';
      
      const semesterKey = `${semester} ${year}-${year + 1}`;

      if (!semesterGroups[semesterKey]) {
        semesterGroups[semesterKey] = [];
      }
      
      semesterGroups[semesterKey].push({
        title: course.title,
        location: course.location,
        grade: course.grade
      });
    });

    res.json(semesterGroups);
  } catch (error) {
    console.error('Error fetching registered courses:', error);
    res.status(500).send('Internal Server Error');
  }
}

const getDone = async (req, res) => {
  const user_id = req.user_id;
  try {
    const courses = await db("programs_courses as pc")
      .join("programs as p", "p.program_id", "pc.program_id")
      .join("users_degree as ud", "ud.program_id", "p.program_id")
      .leftJoin("courses as c", "pc.course_id", "c.course_id")
      .leftJoin("users_courses as uc", function () {
        this.on("uc.course_id", "=", "pc.course_id").andOn(
          "uc.user_id",
          "=",
          db.raw("?", [user_id])
        );
      })
      .select("c.course_id", "c.title", "uc.grade")
      .where("ud.user_id", user_id)
      .orderByRaw("uc.grade IS NULL ASC"); // Courses with no grade (not taken) will be listed last;

    const categorizedCourses = {
      Done: [],
      Future: [],
    };

    courses.forEach((course) => {
      if (course.grade !== null) {
        categorizedCourses.Done.push({
          "Course Title": course.title,
        });
      } else {
        categorizedCourses.Future.push({
          "Course Title": course.title,
        });
      }
    });

    res.json(categorizedCourses);
  } catch (error) {}
};

module.exports = {
  getCourses,
  getDone,
};

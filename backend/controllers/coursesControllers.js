const db = require("../config/dbconfig.js");
const { use } = require("../routes/courses.js");
const getCurrentSemester = require("../utils/semester.js");

const getCourses = async (req, res) => {
  const userId = req.user_id;
  const role = req.role;
  try {

    if (role !== 'student') {
      let courses = await getInstructorCourses(userId)
      console.log(courses)
      res.json(courses)
      return;
    }
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
  const role = req.role;
  try {
    if (role !== 'student') {
      let courses = await getInstructorCourses(user_id)
      res.send(courses)
      return;
    }
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
  } catch (error) { }
};

async function getInstructorCourses(userId) {
  
  const courses = await db('courses_offering as co')
    .join('courses as c', 'co.course_id', 'c.course_id')
    .select('c.title', 'co.crn', 'co.location')
    .where('co.instructor_id', userId);
  
  const semester = getCurrentSemester();
  let crn = semester.year * 10 + semester.semester;
  const semesterString = semester.semesterString + ' ' + (semester.year - 1) + '-' + semester.year;
  const filteredCourses = courses.filter(course => course.crn == crn);
  
  // Organize courses into an object by semester string
  let coursesBySemester = {};
  for (let course of filteredCourses) {
    // Assuming we have a function to get the semester string by semester_id
    if (!coursesBySemester[semester]) {
      coursesBySemester[semesterString] = [];
    }
    coursesBySemester[semesterString].push({
      title: course.title,
      location: course.location,
      crn: course.crn
    });
  }
  return coursesBySemester;
}

module.exports = {
  getCourses,
  getDone,
};

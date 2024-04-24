require('dotenv').config();
const db = require('../config/dbconfig.js');
const CryptoJS = require("crypto-js");

const getStudent = async (req, res) => {
    const { user_id } = req.params;
    const row = await db('users').select(
                    'users.user_id as id',
                    db.raw("CONCAT(users.first_name, ' ', users.last_name) AS name"),
                    'users.usek_id as usekId',
                    'faculties.name as faculty')
                    .join('users_degree', 'users.user_id', '=', 'users_degree.user_id')
                    .join('programs', 'users_degree.program_id', '=', 'programs.program_id')
                    .join('departments', 'programs.department_id', '=', 'departments.department_id')
                    .join('faculties', 'departments.faculty_id', '=', 'faculties.faculty_id')
                    .where('roles.name', 'student')
                    .where('users.user_id', user_id)
                    .first();

    if (!row) {
        res.status(404).send("Student not found");
        return;
    }

    const student = {
        id: row.id,
        name: row.name,
        usekId: row.usekId,
        faculty: row.faculty
      };

    res.json(student);
}

const getAllStudents = async (req, res) => {
    const rows = await db('users').select(
                    'users.user_id as id',
                    db.raw("CONCAT(users.first_name, ' ', users.last_name) AS name"),
                    'users.usek_id as usekId',
                    'faculties.name as faculty')
                    .join('users_degree', 'users.user_id', '=', 'users_degree.user_id')
                    .join('programs', 'users_degree.program_id', '=', 'programs.program_id')
                    .join('departments', 'programs.department_id', '=', 'departments.department_id')
                    .join('faculties', 'departments.faculty_id', '=', 'faculties.faculty_id')
                    .where('roles.name', 'student');

    if (!rows) {
        res.status(404).send("No students found");
        return;
    }

    const students = rows.map(row => ({
        id: row.id,
        name: row.name,
        usekId: row.usekId,
        faculty: row.faculty
      }));

    res.json(students);
}

const updatUser = async (req, res) => {
    const { userId } = req.params;
    const { newData } = req.body;

    const row = await db('users')
                .where({ user_id: userId })
                .update(newData);

    if (!row) {
        res.status(404).send("Student not found");
        return;
    }

    res.json({ message: 'Update successful' });
}

const deleteUser = async(req, res) => {
    const { userId } = req.params;

    const row = await db('users')
                .where({ user_id: userId })
                .del();

    if (!row) {
        res.status(404).send("Student not found");
        return;
    }

    res.json({ message: 'Delete successful' });
}

const addUser = async(req, res) => {
    const { userData, role } = req.body;

    const HASH_KEY = process.env.HASH_KEY || 'key'

    // Hash the provided password
    const hashedPassword = CryptoJS.HmacSHA256(userData.password, HASH_KEY).toString(CryptoJS.enc.Hex);

    const modifiedUserData = {
        ...userData,
        password: hashedPassword
    };

    const row = await db('users')
        .insert(modifiedUserData);


    if (!row) {
        res.status(404).send("User could not be created");
        return;
    }

    const role_id = await db('roles').select('role_id').where({ name: role }).first();

    await db('users_roles').insert({ user_id: row, role_id })

    

    res.json(row);
}

const getDegree = async(req, res) => {
    const { userId } = req.params;

    const row = await db('users_degree')
                .select('programs.name as program', 'departments.name as department', 'faculties.name as faculty')
                .join('programs', 'users_degree.program_id', '=', 'programs.program_id')
                .join('departments', 'programs.department_id', '=', 'departments.department_id')
                .join('faculties', 'departments.faculty_id', '=', 'faculties.faculty_id')
                .where('users_degree.user_id', userId)
                .first();

    if (!row) {
        res.status(404).send("Student not found");
        return;
    }

    res.json(row);
}


module.exports = {
    getStudent,
    getAllStudents,
    updatUser,
    deleteUser,
    addUser,
    getDegree
}

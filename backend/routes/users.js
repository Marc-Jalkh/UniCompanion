var express = require('express');
var router = express.Router();
const controller = require('../controllers/studentsControllers.js');

/* GET users listing. */
router.get('/allStudents', controller.getAllStudents);
router.get('/all', controller.getAllUsers);
router.get('/student/:user_id', controller.getStudent);
router.get('/degree/:user_id', controller.getDegree);
router.post('/update/:user_id', controller.updatUser);
router.post('/delete/:user_id', controller.deleteUser);
router.post('/add', controller.addUser);


module.exports = router;

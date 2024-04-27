var express = require('express');
var router = express.Router();
const controller = require('../controllers/studentsControllers.js');

/* GET users listing. */
router.get('/allStudents', controller.getAllStudents);
router.get('/student/:user_id', controller.getStudent);
router.get('/degree/:user_id', controller.getDegree);
router.post('/update', controller.updatUser);
router.post('/delete', controller.deleteUser);
router.post('/add', controller.addUser);


module.exports = router;

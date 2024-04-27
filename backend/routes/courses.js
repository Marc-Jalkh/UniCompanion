const { Router } = require('express'); 
  
const controller = require('../controllers/coursesControllers.js');
  
const router = Router(); 

router.get('/', controller.getCourses);

  
module.exports = router;
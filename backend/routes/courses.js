const { Router } = require('express'); 
  
const controller = require('../controllers/coursesControllers.js');
  
const router = Router(); 

router.get('/grades', controller.getCourses);
router.get('/done', controller.getDone);

  
module.exports = router;
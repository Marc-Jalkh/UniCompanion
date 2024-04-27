const { Router } = require('express'); 
  
const controller = require('../controllers/eventControllers.js');
  
const router = Router(); 

router.get('/getAll', controller.getAllEvents);

  
module.exports = router;
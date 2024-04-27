const { Router } = require('express'); 
  
const controller = require('../controllers/homeControllers.js');
  
const router = Router(); 

router.get('/get', controller.getHome);

  
module.exports = router;
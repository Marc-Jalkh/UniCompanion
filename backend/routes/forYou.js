const { Router } = require('express'); 
  
const controller = require('../controllers/forYouControllers.js');
  
const router = Router(); 

router.get('/', controller.getforYou);

  
module.exports = router;
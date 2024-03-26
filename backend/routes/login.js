const { Router } = require('express'); 
  
const controller = require('../controllers/loginController.js'); 
  
const router = Router(); 
  
router.post('/', controller.login); 
  
module.exports = router;
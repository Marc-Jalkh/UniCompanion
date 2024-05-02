const { Router } = require('express'); 
  
const controller = require('../controllers/loginController.js'); 
  
const router = Router(); 
  
router.post('/', controller.login); 

router.post('/logout', controller.logout);

router.post('/admin', controller.loginAdmin);
  
module.exports = router;
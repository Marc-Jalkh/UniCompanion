const { Router } = require('express'); 
  
const controller = require('../controllers/financeControllers.js');
  
const router = Router(); 

router.get('/', controller.getFinance);

  
module.exports = router;
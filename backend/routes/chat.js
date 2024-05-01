const { Router } = require('express'); 
  
const controller = require('../controllers/chatAIcontrollers.js');
  
const router = Router(); 
  
router.post('/AI', controller.chatAI); 

router.get('/history', controller.history);

router.get('/normalChats', controller.normalChats);
  
module.exports = router;
const { Router } = require('express'); 
  
const controller = require('../controllers/chatAIControllers.js');
  
const router = Router(); 
  
router.post('/AI', controller.chatAI); 
  
module.exports = router;
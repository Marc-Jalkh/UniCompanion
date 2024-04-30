const { Router } = require('express'); 
  
const controller = require('../controllers/postControllers.js');
  
const router = Router(); 

router.post('/create', controller.createPost);
router.get('/getAll', controller.getPosts);
router.post('/edit/:post_id', controller.editPost);
router.post('/delete/:post_id', controller.deletePost);
router.get('/get/:post_id', controller.getPost);

  
module.exports = router;
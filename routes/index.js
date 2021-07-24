const router = require('express').Router();
const blogController = require('../controllers/blogController');
const registerController = require('../controllers/registerController');
const schemaValidate = require('../middlewares/schemaValidation');
const userValidation = require('../middlewares/userValidation');
const checkExistence = require('../middlewares/checkExistence');
const loginController = require('../controllers/loginController');
const checkToken = require('../middlewares/checkToken');

router.route('/myways/blog')
    .get(checkToken,blogController.getBlogs)
    .post(checkToken,schemaValidate,blogController.postBlog)
    .delete(checkToken,checkExistence.checkBeforeDelete,blogController.deleteBlog)
    .put(checkToken,checkExistence.checkBeforeDelete,blogController.updateBlog);


router.route('/register')
    .post(userValidation.registerValidation,checkExistence.checkAlreadyExists,registerController.getRegister);


router.route('/login')
    .post(loginController.getlogin)


module.exports = router;
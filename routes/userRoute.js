const express = require('express');

const User = require('../models/User');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');


const router = express.Router();

//page route'daki işlemler localhost3000:/users/ 'den sonra gözükür.


router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please enter your name'),


        body('email').isEmail().withMessage('Please enter valid e-mail').custom((userEmail) => {
            return User.findOne({email: userEmail}).then(user => {
                if(user){
                    return Promise.reject('Email is already exists.')
                }})

        } ),


        body('password').not().isEmpty().withMessage('Please enter your password'),

    ],
    authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);





//slug: req.params.slug burdaki :slug ile eşleşiyor.
//Slug ekledikten sonra eğer başka modellerde slug yoksa, sayfaya tekrar geri döner. Slugı olmayanları Databaseden silmek gerekir.

module.exports = router;
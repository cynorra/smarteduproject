const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

//page route'daki işlemler localhost3000:/users/ 'den sonra gözükür.


router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);


//slug: req.params.slug burdaki :slug ile eşleşiyor.
//Slug ekledikten sonra eğer başka modellerde slug yoksa, sayfaya tekrar geri döner. Slugı olmayanları Databaseden silmek gerekir.

module.exports = router;

const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);


//slug: req.params.slug burdaki :slug ile eşleşiyor.
//Slug ekledikten sonra eğer başka modellerde slug yoksa, sayfaya tekrar geri döner. Slugı olmayanları Databaseden silmek gerekir.

module.exports = router;

const express = require('express');

const courseController = require('../controllers/courseController');

const router = express.Router();

router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
//slug: req.params.slug burdaki :slug ile eşleşiyor.
//Slug ekledikten sonra eğer başka modellerde slug yoksa, sayfaya tekrar geri döner. Slugı olmayanları Databaseden silmek gerekir.
router.route('/:slug').get(courseController.getCourse);

module.exports = router;
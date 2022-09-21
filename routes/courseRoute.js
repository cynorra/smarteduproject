
const express = require('express');

const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');


const router = express.Router();

router.route('/').post(roleMiddleware(["teacher","admin"]),courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
//slug: req.params.slug burdaki :slug ile eşleşiyor.
//Slug ekledikten sonra eğer başka modellerde slug yoksa, sayfaya tekrar geri döner. Slugı olmayanları Databaseden silmek gerekir.
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourse); //courses/enroll şeklinde url olacak.
router.route('/release').post(courseController.releaseCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);




module.exports = router;
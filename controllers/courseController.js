const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req,res) => {
    try {
    const course = await Course.create(req.body);

    //Yeni oluşturma statusu 201
    
        res.status(201).json({
            status: 'success',
            course
        })
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}


exports.getAllCourses = async (req,res) => {
    try {

    //Query Yakalama (URL'deki - Category için)
    const categorySlug = req.query.categories;

    const category = await Category.findOne({slug: categorySlug});
    
    let filter = {};


    //if'deki filter = category: category_.id 'deki birinci category Course modelindeki category'den geliyor. Diğer category_.id ise
    //Category findone'dan (Database araması) category slug'la gidiyoruz. Category slugı'da url'de querydan arama yaparak parametre şeklinde
    //gönderdik.
    //Kullanım: http://localhost:3000/courses?categories=programming
    //Query sorgusu yoksa normal sayfa yüklenir çünkü filter true dönmeyecek.
    if(categorySlug) {
        filter = {category: category._id}
    }



    const courses = await Course.find(filter);


    const categories = await Category.find();


    //Yeni oluşturma statusu 201
    
        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses'
        })
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}


exports.getCourse = async (req,res) => {
    try {
    const course = await Course.findOne({slug: req.params.slug});
    //Yeni oluşturma statusu 201 - req.params.id url'deki id'ye eşit.
    //find by id; eğer _id (Databasedeki) 'ye göre aratırsak kullanılcak yoksa sayfayı açmaz.
    //find one; slugify kullanırsak kullanılcak.
    
        res.status(200).render('course', {
            course,
            page_name: 'courses'
        })
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}
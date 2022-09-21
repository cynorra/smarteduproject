const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const flash = require('connect-flash');

exports.createCourse = async (req,res) => {
    try {
    const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID
    });

    //Yeni oluşturma statusu 201
    
        req.flash("success", "We succesfully created your course.");
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
    //SEARCH BAR
    const query = req.query.search;

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

    if(query) {
        filter = {name: query}
    }

    if(!query && !categorySlug) {
        filter.name = '',
        filter.category = null
    }


    //createdAt başında '-' koyarak en son post edileni en başta görürüz.
    //find'ın içindeki parametreler search alanı için.
    const courses = await Course.find({
        $or:[{
            name: {$regex: '.*' + filter.name + '.*', $options: 'i'}
        },
        { category: filter.category}
     
    ]
    }).sort('-createdAt').populate('user');


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

    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({slug: req.params.slug}).populate('user');
    const categories = await Category.find();
    //populate'yi tekil kurs sayfasında <%= course.user.name %> için kullandık
    //Yeni oluşturma statusu 201 - req.params.id url'deki id'ye eşit.
    //find by id; eğer _id (Databasedeki) 'ye göre aratırsak kullanılcak yoksa sayfayı açmaz.
    //find one; slugify kullanırsak kullanılcak.
    
        res.status(200).render('course', {
            course,
            categories,
            user,
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


exports.enrollCourse = async (req,res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.push({_id: req.body.course_id});
        await user.save();
        req.flash("success", "You are succesfully enrolled your course.");
        res.status(200).redirect('/users/dashboard');
        //form'da body'e aslında post ederken course_id'yi post ettik. ona req.body'dan ulaşıyoruz.
        //inputta name = course_id olduğu için
    
    
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}

exports.releaseCourse = async (req,res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({_id: req.body.course_id});
        await user.save();
        res.status(200).redirect('/users/dashboard');
        //form'da body'e aslında post ederken course_id'yi post ettik. ona req.body'dan ulaşıyoruz.
        //inputta name = course_id olduğu için
    
    
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}


exports.deleteCourse = async (req,res) => {
    try {
        await Course.findOneAndRemove({
            slug: req.params.slug
        });
        req.flash("error", "You succesfully deleted your course.");
        res.status(200).redirect('/users/dashboard');
 
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}


exports.updateCourse = async (req,res) => {
    try {
        const course = await Course.findOne({
            slug:req.params.slug,
        })
        course.name = req.body.name;
        course.description = req.body.description;
        course.category = req.body.category;
        course.save();
        res.status(200).redirect('/users/dashboard');
        //FORM OLDUGU ICIN REQ PARAMS KULLANMADIK BODY'DEN GELIYOR

    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}
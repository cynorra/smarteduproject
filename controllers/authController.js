const User = require('../models/User');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');





exports.createUser = async (req,res) => {
    try {
    const user = await User.create(req.body);
    //Yeni oluşturma statusu 201
    
        res.status(201).redirect('/login');
    } catch(error) {
        const errors = validationResult(req);
        console.log(error);
        console.log(errors.array()[0].msg) //Please enter your name yazdırıyor.

        for(let i=0; i < errors.array().length ; i++) {
        req.flash("error", ` ${errors.array()[i].msg} `);
        }
        res.status(400).redirect('/register');
    }
    
}

exports.loginUser = async (req,res) => {
    try {
        //email ve passwod, request'in bodysinden gelip atanıcak- Destructring.
        const {email, password} = req.body;

        User.findOne({email}, (err, user) => {
            if(user){
                //girilen şifreyle db'deki password karşılaştırılır.
                bcrypt.compare(password, user.password, (err,same) => {
                    if(same){
                        // USER SESSION
                        req.session.userID = user._id;

                        res.status(200).redirect('/users/dashboard');
                    } else {
                        req.flash("error", `Your password is not correct.`);
                        res.status(400).redirect('/login');
                    }
                });


            } else {
                req.flash("error", `User is not exists`);
                res.status(400).redirect('/login');
            }

        });
   
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}

exports.logoutUser = async (req,res) => {
   req.session.destroy(() => {
    res.redirect('/');
   })
}

exports.getDashboardPage = async (req,res) => {
    const user = await User.findOne({
        _id: req.session.userID
    }).populate('courses');

    const users = await User.find();

    const categories = await Category.find();
    const courses = await Course.find({
        user: req.session.userID
        //kursun user type'ı o anki login olan sessiondaki userID 'ile eşitse, dashboardda ilgili öğretmen tarafından oluşturulan kurslar gözükcek

    });

    res.status(200).render('dashboard', {
        page_name: "dashboard",
        user,
        categories,
        users

        
    });
};


exports.deleteUser = async (req,res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        await Course.deleteMany({
            user: req.params.id
        })
       
        res.status(200).redirect('/users/dashboard');
 
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}





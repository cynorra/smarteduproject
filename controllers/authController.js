const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req,res) => {
    try {
    const user = await User.create(req.body);
    //Yeni oluşturma statusu 201
    
        res.status(201).json({
            status: 'success',
            user
        })
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
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
                        res.status(200).send('You are logged in');
                    }
                });


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
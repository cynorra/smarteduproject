const Category = require('../models/Category');

exports.createCategory = async (req,res) => {
    try {
    const category = await Category.create(req.body);
    //Yeni oluşturma statusu 201
    
        res.status(201).redirect('/users/dashboard');
        
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}

exports.deleteCategory = async (req,res) => {
    try {

        await Category.findByIdAndRemove(req.params.id);
        
        res.status(200).redirect('/users/dashboard');
 
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}


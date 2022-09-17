const Category = require('../models/Category');

exports.createCategory = async (req,res) => {
    try {
    const category = await Category.create(req.body);
    //Yeni oluşturma statusu 201
    
        res.status(201).json({
            status: 'success',
            category
        })
    } catch(error) {
        //Bad Request 400
        res.status(400).json({
            status: 'fail',
            error
        })
    }
    
}

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    name:  {
        type: String,
        required: true
    },

    email:  {
        type: String,
        required: true,
        unique: true //Başında ve sonundaki boşluklar kaldırılır.
    },

    password: {
        type: String,
        required:true
    },

    

   
    // Kurs oluşturulduktan sonra url'de id gözükmemesi için slugify paketi kullandık, middleware kullanarak otomatik olarak slug oluşturuyoruz.
    
});


UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next()
    })
})

//pre methodu databaseye kayıt etmeden önce gerçekleşmesini sağlıyor. aşağıdaki bir middleware'dir.



//yukarıda arrow function kullansaydık this'i kullanamazdık.
//Strict; ?!: gibi karakterleri es geçmeye yarıyor slugify ederken.



const User = mongoose.model('User', UserSchema); //Modele Çevirme

module.exports = User;
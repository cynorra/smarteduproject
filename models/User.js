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

    role: {
        type: String,
        enum: ["student",,"teacher","admin"],
        default: "student"
    },

    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
      

    

   
    // Kurs oluşturulduktan sonra url'de id gözükmemesi için slugify paketi kullandık, middleware kullanarak otomatik olarak slug oluşturuyoruz.
    
});

// Şifre değiştiği için aşağıdaki middleware geçerli olmadı hatalı, (kurs ekleyince)
/*
UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next()
    })
})
*/

//pre methodu databaseye kayıt etmeden önce gerçekleşmesini sağlıyor. aşağıdaki bir middleware'dir.


//Kurs ekledikten sonra şifre değiştiği için ek middleware

UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


//yukarıda arrow function kullansaydık this'i kullanamazdık.
//Strict; ?!: gibi karakterleri es geçmeye yarıyor slugify ederken.



const User = mongoose.model('User', UserSchema); //Modele Çevirme

module.exports = User;
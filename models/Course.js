const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const CourseSchema = new Schema({
    name:  {
        type: String,
        unique: true,
        required: true
    },

    description:  {
        type: String,
        required: true,
        trim: true //Başında ve sonundaki boşluklar kaldırılır.
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    // Kurs oluşturulduktan sonra url'de id gözükmemesi için slugify paketi kullandık, middleware kullanarak otomatik olarak slug oluşturuyoruz.
    slug: {
        type: String,
        unique: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' //Category Modeli Referans Ediliyor.
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //User Modeli referans ediliyor.
    }

});

//pre methodu databaseye kayıt etmeden önce gerçekleşmesini sağlıyor. aşağıdaki bir middleware'dir.

CourseSchema.pre('validate', function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
})

//yukarıda arrow function kullansaydık this'i kullanamazdık.
//Strict; ?!: gibi karakterleri es geçmeye yarıyor slugify ederken.



const Course = mongoose.model('Course', CourseSchema); //Modele Çevirme

module.exports = Course;
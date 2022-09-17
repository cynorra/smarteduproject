const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const CategorySchema = new Schema({
    name:  {
        type: String,
        unique: true,
        required: true
    },

    // Kurs oluşturulduktan sonra url'de id gözükmemesi için slugify paketi kullandık, middleware kullanarak otomatik olarak slug oluşturuyoruz.
    slug: {
        type: String,
        unique: true
    }

});

//pre methodu databaseye kayıt etmeden önce gerçekleşmesini sağlıyor. aşağıdaki bir middleware'dir.

CategorySchema.pre('validate', function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
})

//yukarıda arrow function kullansaydık this'i kullanamazdık.
//Strict; ?!: gibi karakterleri es geçmeye yarıyor slugify ederken.



const Category = mongoose.model('Category', CategorySchema); //Modele Çevirme

module.exports = Category;
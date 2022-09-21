const express = require('express');
const app = express();


//MONGOOSE (DATABASE)//
const mongoose = require('mongoose');

//MONGOOSE CONNECT
mongoose.connect('mongodb+srv://cynorra:eReN1212@cluster0.pkdhm9q.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('DB CONNECTED SUCCESFULLY')
})



//Page Route Import//
const session = require('express-session');
const MongoStore = require('connect-mongo'); //App.js dursa bile session devam etmesini sağlıyor opsiyonel.
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const flash = require('connect-flash');
const methodOverride = require('method-override');


// TEMPLATE ENGINE //
app.set('view engine', 'ejs');

// GLOBAL VARIABLE //
global.userIN = null;

// MIDDLEWARES


app.use(express.static("public"));
// -Post Requestlerin Bodylerini almak için; yoksa post methodu kullanamayız.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://cynorra:eReN1212@cluster0.pkdhm9q.mongodb.net/?retryWrites=true&w=majority' })
  }))


app.use(flash());
app.use((req,res,next)=> {
    res.locals.flashMessages = req.flash();
    next();
})

app.use(methodOverride('_method', {
    methods:['POST','GET'],
}))

// ROUTES - PageController(controller klasöründe) ve routes oluşturduğumuz için get'ten use'a çevirdik.
// Route'daki işlemler localhost3000:${app.use'daki parantez içindeki birinci parametre} 'den sonra gözükür.
// mesela userRoute'daki işlemler /users/xxx şeklinde devam eder.


//session middleware
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
})
//
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

// Postman'da kursu kategoriyle bir şekilde post ederken, category alanına databasedeki ObjectID girilir.

// Flash Modülü (Email gönderdikten sonra bilgi versin diye)






const port = 3000;

app.listen(port, () => {
    console.log(`App started on ${port}`);
});

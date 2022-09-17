const express = require('express');
const app = express();


//MONGOOSE (DATABASE)//
const mongoose = require('mongoose');

//MONGOOSE CONNECT
mongoose.connect('mongodb+srv://cynorra:eReN1212@cluster0.pkdhm9q.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('DB CONNECTED SUCCESFULLY')
})



//Page Route Import//
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

// TEMPLATE ENGINE //
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static("public"));
// -Post Requestlerin Bodylerini almak için; yoksa post methodu kullanamayız.
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// ROUTES - PageController(controller klasöründe) ve routes oluşturduğumuz için get'ten use'a çevirdik.
// Route'daki işlemler localhost3000:${app.use'daki parantez içindeki birinci parametre} 'den sonra gözükür.
// mesela userRoute'daki işlemler /users/xxx şeklinde devam eder.

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
// Postman'da kursu kategoriyle bir şekilde post ederken, category alanına databasedeki ObjectID girilir.





const port = 3000;

app.listen(port, () => {
    console.log(`App started on ${port}`);
});

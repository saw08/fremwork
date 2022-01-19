const express = require('express')
const ceritaRouter = require('./router/cerita')
const app = express()
const port = 3000

//Aktifkan tambahan setting default untuk req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Membuat koneksi ke database menggunakan mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cerita');

//Tambahkan pesan jika koneksi ke database berhasil
const db = mongoose.connection
db.on('error', function () {
    console.log('Koneksi Gagal')
})
db.once('open', function () {
    console.log('Koneksi Berhasil')
})
    
const requestTime = function(request, respon, next) {
    date = new Date(); //pesan yang ingin ditampilkan
    console.log(date);
    next();
};

app.use(requestTime); //nama properti middleware bebas
app.set ('view engine','ejs')//baru
// app.get("/", function (request, respon){
//     const tanggal = "Selamat Belajar Express Js </br>" +
//     "<p><small>Requested at: " + date + "</small>"; //properti pesan dari middleware yang akan ditampilkan
//     respon.send(tanggal);
// });


app.use(ceritaRouter)

app.listen(port, () => {
    console.log(`Server baik-baik saja`)
})


//Routing halaman utama
// app.get('/', function(request,respon){
//     respon.send('Hallo! Nama Saya Avita')
// })

// membuat URL/about
app.get("/", function(request,respon){
    respon.render('pages/index')
});
app.get("/about", function(request,respon){
    respon.render('pages/about')
});
app.use(express.static("public"));
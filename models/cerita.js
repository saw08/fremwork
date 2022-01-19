const mongoose = require('mongoose');
const { Schema } = mongoose

//membuat tabel cerita dengan schema
const ceritaSchema = new Schema({
    judul: String,
    ceritaa: String,
    img: {
        data: Buffer, contentType: String
    },
}, { timestamps: true });
  
//ekspor tabel cerita
const Cerita = mongoose.model('Cerita', ceritaSchema)
module.exports = Cerita
const { req } = require("express")
const res = require("express/lib/response")

const Cerita = require("../models/cerita")

module.exports = {
    index: function (req, res) {
        let keyword = {}
        //Membuat query pencarian berdasarkan kata kunci
        if (req.query.keyword) {
            keyword = { judul: {$regex: req.query.keyword}}
        }
        Cerita.find(keyword, " judul _id", function (error, cerita) {
            if (error) console.log(error)
            // console.log(cerita)
            res.render('pages/cerita/index',{cerita})
        })
    },

    show: function (req, res) {
        const id = req.params.id

        Cerita.findById(id, function (error, data) {
            if (error) console.log(error)
            // console.log(data)
            res.render('pages/cerita/show', {cerita: data})
        })
    },

    create: function (req, res) {
      res.render('pages/cerita/create')  
    },

    tambah: function (req, res) {
        const cerita = new Cerita({
             judul: req.body. judul,
             ceritaa: req.body. ceritaa,
        })
        cerita.save(function (error) {
            if (error) return handleError(error);
            res.redirect('/cerita')
        })
    },

    update: function (req, res) {
        const id = req.params.idcerita;
        let isFound = false
        console.log(id)
        Cerita.filter(proj => {
            if (proj.idcerita == id) {
                proj. judul = req.body. judul
                proj. ceritaa = req.body. ceritaa

                res.send({
                    status: true,
                    data: cerita,
                    message: "Data berhasil diupdate",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
                return proj
            }
        })
        if (isFound == false) {
            res.send({
                status: false,
                message: "cerita tidak ditemukan"
            })
        }
        res.json(cerita)
    },
    baharui: function (req, res) {
        const _id = req.body._id
        const  judul = req.body. judul
        const  ceritaa = req.body. ceritaa
        const filter = { _id: _id };
        const update = {
             judul:  judul,
             ceritaa:  ceritaa
        };
        Cerita.updateOne(filter, update, function (err) {
            console.log( judul, harga,  cerita)
            res.redirect('/cerita')
        });


    },
    renderUpdate: function (req, res) {
        const id = req.params._id
        Cerita.findById(id, function (error, data) {
            if (error) console.log(error)
            res.render('pages/cerita/update', { cerita: data })
        })
    },

    hapus: function (req, res) {
        const id = req.params.id
        Cerita.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            res.redirect('/cerita')
        });
    },
    delete: function (req, res) { //Menghapus data
        const id = req.params.idcerita;
        let isFound = false
        cerita.filter(proj => {
            if (proj.idcerita == id) {
                const index = cerita.indexOf(pro)
                cerita.splice(index, 1)
                res.send({
                    status: true,
                    data: cerita,
                    message: "Data cerita berhasil dihapus",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
            }
        })
        if (isFound == false) {
            res.json({
                status: false,
                message: "Data tidak ditemukan"
            })
        }
        res.json(cerita)
    }
}
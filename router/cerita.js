const express = require('express')
const router = express.Router()
const ceritaControllers = require('../controllers/cerita')
const fs = require('fs');
var multer = require('multer');
var path = require('path');
const Cerita = require('../models/cerita');
const storage = multer.diskStorage({
    destination: (ceritaControllersreq, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

router.route('/cerita')
        .get(ceritaControllers.index)
router.route('/cerita').post(upload.single('image'), (req, res, next) => {
    const cerita = new Cerita({
         judul: req.body. judul,
         ceritaa: req.body. ceritaa,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    });
    cerita.save(function (error) {
        if (error) return handleError(error);
        res.redirect('/cerita')
    });
});
router.route('/cerita/update').post(upload.single('image'), (req, res, next) => {
    const _id = req.body._id
    const  judul = req.body. judul
    const  ceritaa = req.body. ceritaa
    const filter = { _id: _id };
    const update = {
        _id: _id,
         judul:  judul,
         ceritaa:  ceritaa,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    };
    Cerita.updateOne(filter, update, function (err) {
        res.redirect('/cerita')
    });
});
router.get ('/cerita/create', ceritaControllers.create)
router.get ('/cerita/:id', ceritaControllers.show)

router.route('/cerita/update').post(ceritaControllers.baharui)
router.get('/cerita/hapus/:id', ceritaControllers.hapus)
router.route('/cerita/update/:_id/:judul/:ceritaa').get(ceritaControllers.renderUpdate)

router.put('/cerita/:idcerita', ceritaControllers.update)

//HAPUS DATA
router.delete('/cerita/:idcerita', ceritaControllers.delete)

router.put('/cerita/:id', ceritaControllers.update)
router.delete('/cerita/:id', ceritaControllers.delete)

module.exports = router
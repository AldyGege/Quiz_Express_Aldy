var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');
const Model_Keahlian = require('../model/Model_Keahlian.js');
const Model_Mahasiswa = require('../model/Model_Mahasiswa.js');

router.get('/', async function(req, res, next) {
        let rows = await Model_Keahlian.getAll();
        res.render('keahlian/index', {
            data: rows
        })
});

router.get('/create', async function (req, res, next) {
    let rows = await Model_Mahasiswa.getAll();
    res.render('keahlian/create', {
        nama_keahlian: '',
        tingkat_keahlian: '',
        id_mahasiswa: '',
        data: rows
    })
})

router.post("/store", async function (req, res, next) {
  try {
    let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
    let Data = {
    nama_keahlian, tingkat_keahlian, id_mahasiswa
    };
    await Model_Keahlian.Store(Data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/keahlian");
  } catch {
    req.flash("error", "gagal menyimpan data");
    res.redirect("/keahlian");
  }
});

router.get('/edit/(:id)', async function (req, res, next) {
    let id = req.params.id;
    let mhs = await Model_Mahasiswa.getAll();
    let rows = await Model_Keahlian.getId(id);
    res.render('keahlian/edit', {
        id: rows[0].id_keahlian,
        nama_keahlian: rows[0].nama_keahlian,
        tingkat_keahlian: rows[0].tingkat_keahlian,
        id_mahasiswa: rows[0].id_mahasiswa,
        data: mhs,
    })
})

router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
        let Data = { 
        nama_keahlian, tingkat_keahlian, id_mahasiswa
        };

        await Model_Keahlian.Update(id, Data);
        req.flash('Success', 'Berhasil menyimpan data');
        res.redirect('/keahlian')
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/keahlian');
    }
});

router.get('/delete/(:id)', async function(req, res) {
    let id = req.params.id;
    await Model_Keahlian.Delete(id);
    req.flash('Success', 'berhasil menghapus data');
    res.redirect('/keahlian')
});



module.exports = router;
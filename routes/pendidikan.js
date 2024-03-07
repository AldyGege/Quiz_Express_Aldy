var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');
const Model_Pendidikan = require('../model/Model_Pendidikan.js');
const Model_Mahasiswa = require('../model/Model_Mahasiswa.js');

router.get('/', async function(req, res, next) {
        let rows = await Model_Pendidikan.getAll();
        res.render('pendidikan/index', {
            data: rows
        })
});

router.get('/create', async function (req, res, next) {
    let rows = await Model_Mahasiswa.getAll();
    res.render('pendidikan/create', {
        nama_instansi: '',
        jurusan: '',
        tahun_masuk: '',
        tahun_lulus: '',
        nomor_ijazah: '',
        id_mahasiswa: '',
        data: rows
    })
})

router.post("/store", async function (req, res, next) {
  try {
    let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa } = req.body;
    let Data = {
    nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa
    };
    await Model_Pendidikan.Store(Data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/pendidikan");
  } catch {
    req.flash("error", "gagal menyimpan data");
    res.redirect("/pendidikan");
  }
});

router.get('/edit/(:id)', async function(req, res, next){
    let id = req.params.id;
    let mhs = await Model_Mahasiswa.getAll();
    let rows = await Model_Pendidikan.getId(id);
    res.render('pendidikan/edit', {
    id: rows[0].id_pendidikan,
    nama_instansi: rows[0].nama_instansi,
    jurusan: rows[0].jurusan,
    tahun_masuk: rows[0].tahun_masuk,
    tahun_lulus: rows[0].tahun_lulus,
    nomor_ijazah: rows[0].nomor_ijazah,
    id_mahasiswa: rows[0].id_mahasiswa,
    data: mhs,
    })
 });

router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah,id_mahasiswa } = req.body;
        let Data = { 
        nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa
        };

        await Model_Pendidikan.Update(id, Data);
        req.flash('Success', 'Berhasil menyimpan data');
        res.redirect('/pendidikan')
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/pendidikan');
    }
});

router.get('/delete/(:id)', async function(req, res) {
    let id = req.params.id;
    await Model_Pendidikan.Delete(id);
    req.flash('Success', 'berhasil menghapus data');
    res.redirect('/pendidikan')
});



module.exports = router;
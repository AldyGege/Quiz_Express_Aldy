const connection = require('../config/database');

class Model_Keahlian {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT a.id_keahlian, a.nama_keahlian, a.tingkat_keahlian, b.nama_depan, b.id_mahasiswa FROM keahlian as a INNER JOIN mahasiswa as b ON a.id_mahasiswa = b.id_mahasiswa ORDER BY a.id_keahlian DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('insert into keahlian set ?', Data, function(err, result){
                if(err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
    
    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM keahlian where id_keahlian = ' + id, (err, rows) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('update keahlian set ? where id_keahlian = ' + id, Data, function(err, result) {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
    }
    
    
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from keahlian where id_keahlian = ' + id, function(err, result) {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Model_Keahlian;
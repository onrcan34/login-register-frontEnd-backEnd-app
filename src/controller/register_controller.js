const User = require('../model/user_model');; // register işleminde User modeli gerekli olacaktır
const bcrypt = require('bcrypt'); // Parolaları veritabanında şifreleyerek (hash) tutmak için dahil edildi


const registerSayfasiniGetir = (req, res, next) => {
    res.render('index', { // render edilen index.ejs sayfası içerisinde herhangi bir değer yoktur. Projede layout yapısı kullanılmıştır
        dubErr: '',  // render edilen register.ejs dosyasında basarili, dubErr ve hata değerleri
        basarili: '', // bulunmadığından dolayı proje hata vermesin diye boş string olarak atama yapıldı
        hata: '',
        layout: './layout/register', // layout klasörü içerisindeki register.ejs layout yapısı çalıştırıldı
    });
};

const registerIslemleriniYap = async (req, res, next) => {
    try { // aşağıda kullanılan async-await işlemlerinde gerçekleşecek herhangi bir hatayı yakalamak için try - catch kullanıldı
        let yeniKullanici = User(req.body); // register işlemi için girilen bilgilerle User nesnesi oluşturuldu
        if (req.body.sifre !== '' && req.body.sifre.length >= 4) { // sifre kontrol işlemi yapılır
            let user = req.body
            user.sifre = await bcrypt.hash(user.sifre, 8) // parola db ye kaydedilmeden önce şifrelenir (hashlenir)
            yeniKullanici.sifre = user.sifre;
        }
        const kayitSonucu = await yeniKullanici.save(); // isim, email ve sifre bilgisi veritabanına kaydedilir
        res.render('index', {  // register işlemi sorunsuz tamamlanırsa register.ejs layout dosyası çalışır
            hata: '',
            basarili: 'Kayıt İşlemi Başarılı', // ekrena kayıt başarılı mesajı gönderilir
            dubErr: '',
            layout: './layout/register'
        })
    } catch (err) { // register işlemi yapılırken herhangi bir hata oluşursa catch bloğu çalışır ve bu hata/hatalar ekrana yansıtılır
        res.render('index', {
            basarili: '',
            dubErr: err, // eğer Dublicate error olursa, kullanıcının anlayacağı şekilde bu error türkçeleştirilir
            hata: err.errors, // hata değeri register.ejs layout dosyasında kullanılacağı için options kısmına yazılır
            email: req.body.email, 
            isim: req.body.isim, // isim değeri register.ejs layout dosyasında kullanılacağı için options kısmına yazılır
            layout: './layout/register',
        })
    }
}

module.exports = {
    registerSayfasiniGetir,
    registerIslemleriniYap
}
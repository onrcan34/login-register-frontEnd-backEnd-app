const User = require('../model/user_model'); // login işleminde User modeli gerekli olacaktır
const joiValidate = require('../controller/joiValidate') // joi validation kuralları dahil edildi
const bcrypt = require('bcrypt'); // Parolaları veritabanında şifreleyerek (hash) tutmak için dahil edildi

const loginSayfasiniGetir = (req, res, next) => {
    res.render('index', { // render edilen index.ejs sayfası içerisinde herhangi bir değer yoktur. Projede layout yapısı kullanılmıştır
        basarili: '',// render edilen login.ejs dosyasında basarili ve hata 
        hata: '', // değerleri bulunmuyor. Proje hata vermesin diye boş string olarak atama yapıldı
        layout: './layout/login'  // /login rotasına get isteği yapıldığında login.ejs layout dosyası çalışır 
    });
};

const loginIslemleriniYap = async (req, res, next) => {
    try { // aşağıda kullanılan async-await işlemlerinde gerçekleşecek herhangi bir hatayı yakalamak için try - catch kullanıldı

    const kontrol = await joiValidate.validateAsync(req.body) // login için girilen değerler db de kontrol edilmeden önce joi validation işlemlerinden geçer
    const bulunanKullanici = await User.findOne({email: req.body.email}) // girilen mail değeri db de varmı diye kontrol edilir
    if (bulunanKullanici === null) { // girilen mail bilgisi db de yok buradaki if çalışır
        res.render('index', { 
            basarili: '',
            email: req.body.email,
            hata: 'Email yanlış', // email bilgisinin db de bulunmadığını söyler
            layout: './layout/login' 
        })
    } 
    if (bulunanKullanici) { // girilen email bilgisi db de kayıtlı ise buradaki if çalışır
        const sifreKontrol = await bcrypt.compare(req.body.sifre, bulunanKullanici.sifre) // veritabanında parola bilgisi hashlenerek tutulduğu için şifrelerin kontrolünü gerçekleştirmek için bcrypt.compare fonksiyonu kullanılır
        if (!sifreKontrol) { // girilen parola bilgisi veritabanında ki sifre bilgisi ile uyuşmuyorsa buradaki if çalışır
            res.render('index', {
                basarili: '',
                email: req.body.email, // input olarak girilen email bilgisi sayfa render edilirken silinmesin diye render edilen sayfaya gönderildi 
                hata: 'Şifre yanlış', // hata bilgisi ekrana yansıtılmak için login.ejs layout dosyasına render edildi.
                layout: './layout/login'
            })
        } else { // girilen parola ile db deki parola uyuşuyorsa, login işlemi başarılıyla gerçekleşmiştir. 
            res.render('index', {
                basarili: 'Giriş başarılı', // basarili giris bilgisi ekrana yansıtılmak için login.ejs sayfasına render edilir
                isim: bulunanKullanici.isim,
                hata: '',
                layout: './layout/login'
            })
        }

    }
    }  catch (e) { // yukarıdaki post işlemlerin herhangi birinde hata çıkarsa, bu hata değeri catch bloğu tarafından yakalanır ve kodların akışı buradan devam eder
        res.render('index', {
            basarili: '',
            email: req.body.email, // input olarak girilen email bilgisi sayfa render edilirken silinmesin diye render edilen sayfaya gönderildi
            hata: e.details[0].message, // Bu sayfada gelen hata bilgisi, mesaj değerine parse edilir ve diğerki sayfaya render edilir 
            layout: './layout/login'
        })
    }
}

module.exports = {
    loginSayfasiniGetir,
    loginIslemleriniYap
}
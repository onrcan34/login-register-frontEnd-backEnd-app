
const User = require('../model/user_model'); // parola sıfırlama işleminde User modeli gerekli olacaktır
const bcrypt = require('bcrypt'); // Parolaları veritabanında şifreleyerek (hash) tutmak için dahil edildi


const forgetSayfasiniGetir = (req, res, next) => {
    res.render('index', { // render edilen index.ejs sayfası içerisinde herhangi bir değer yoktur. Projede layout yapısı kullanılmıştır
        basarili: '', // render edilen forget_password dosyasında basarili, hata ve yeniPencere 
        hata: '', // değerleri bulunmuyor. Proje hata vermesin diye boş string olarak atama yapıldı
        yeniPencere: '',
        layout: './layout/forget_password' // /forget rotasına get isteği yapıldığında forget_password.ejs layout dosyası çalışır 
    });
};

const forgetPasswordIsleminiYap = async (req, res, next) => {
    try { // aşağıda kullanılan async-await işlemlerinde gerçekleşecek herhangi bir hatayı yakalamak için try - catch kullanıldı
    const bulunanKullanici = await User.findOne({email: req.body.email}) // Parolasını değiştirecek kullanıcının email bilgisi veritabanında var mı diye kontrol edilir

    if (bulunanKullanici === null) { // input olarak girilen email bilgisi db de kayıtlı değilse aşağıdaki yapı çalışır
        res.render('index', {
            basarili: '',
            hata: 'Geçerli bir mail giriniz', // hata nın sebebi yazıldı, forget_password.ejs dosyasında kullanılmak üzere render edildi 
            yeniPencere: '',
            layout: './layout/forget_password'
        })
    } 
    if (bulunanKullanici) { // email bilgisi veritabanında kayıtlı ise buradaki if bloğu çalışır
        let sifre = req.body.sifre // parola bilgisi sifre değişkenine atandı
        
        // parolası değiştirilecek kullanıcı, email bilgisi ile bulunur, input olarak girilen değer ile db üzerinde güncellenir
        // runValidators: true option ile update işlemleri yapılırken mongoose, validation işlemlerinide yapar 
        const sifreDegistir = await User.findOneAndUpdate({email: bulunanKullanici.email}, {sifre: req.body.sifre}, {runValidators: true})
        
        if (sifre) {  // sifre bilgisi boş olarak post edilirse burası çalışmaz
            if (sifre.length >= 4 ) {  // input olarak girilen parola bilgisi 4 karaktere eşit veya büyükse burası çalışır 
            const yeniSifre = await bcrypt.hash(sifre, 8) // girilen şifre saltRounds isimli girilen sabit bir değer ile şifrelenir (hashlenir).
            const sifreDegistir = await User.findOneAndUpdate({email: bulunanKullanici.email}, {sifre: yeniSifre}, {runValidators: true}) // şifrelenen parola bilgisi db de güncellenir
            res.render('index', { 
                basarili: 'Şifre başarılı şekilde değiştirildi', // şifre başarılı şekilde değiştirilmişse ekrana yeşil uyarı mesajı verilir
                hata: '',
                email: req.body.email,
                yeniPencere: 'ac', // yeşil uyarı mesajı için bu yapıyı kullanırız
                layout: './layout/forget_password'
            })
            } else {
                res.render('index', {
                    basarili: '',
                    hata: 'Sifre 4 karakterden fazla olmalıdır', // parola bilgisi 4 karakterden az girilmişse ekrana hata mesajı verilir
                    email: req.body.email,
                    yeniPencere: 'ac', // kırmızı hata mesajı için bu yapıyı kullanırız
                    layout: './layout/forget_password'
                })
            }

        } else {
            res.render('index', {
                basarili: '',
                hata: '',
                email: req.body.email,
                yeniPencere: 'ac',
                layout: './layout/forget_password'
            })
        }
    }
    }  catch (e) { // yukarıdaki post işlemlerin herhangi birinde hata çıkarsa, bu hata değeri catch bloğu tarafından yakalanır ve kodların akışı buradan devam eder
        res.render('index', {
            basarili: '',
            email: req.body.email, // input olarak girilen email bilgisi sayfa render edilirken silinmesin diye render edilen sayfaya gönderildi
            hata: e.errors, // Bu sayfada gelen hata bilgisi, mesaj değerine parse edilir ve diğerki sayfaya render edilir 
            yeniPencere: 'ac',
            layout: './layout/forget_password'
        })
    }
}

module.exports = {
    forgetSayfasiniGetir,
    forgetPasswordIsleminiYap,
}

const hataYakala = (req, res, next) => { // Tüm geçersiz rotalar bu fonksiyon tarafından yakalanacak
    res.json({
        message: "Geçersiz Rota",
        kullanilabilirRotalar: {
            login: "http://localhost:3000/login",
            register: "http://localhost:3000/register",
            forgetPassword: "http://localhost:3000/forget"
        }
    });
};

module.exports = hataYakala; // hataYakala fonksiyonu, app.js dosyası tarafından kullanabilmek için dışaya export edildi 
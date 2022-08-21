const dotenv = require('dotenv').config(); // .env dosyasındaki verileri kullanabilmek için ilk başta paketi dahil ederiz daha sonra config() ile çağırırız
const express = require('express'); // sunucu işlemlerini yapabilmek için express dahil edildi
const app = express(); // bir express uygulaması oluşturuldu
const path = require('path'); // dizin ile ilgili işlemleri ele almak için pat hdahil edildi
const ejs = require('ejs'); // ejs yapısı projeye dahil edilir
const expressLayouts = require('express-ejs-layouts'); // projede ejs layout yapısından faydalanmak için dahil edildi

// db bağlantısı
require('./config/database');

// default view engine yapısı uygulamaya tanıtıldı
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));
app.use(expressLayouts); // layout yapısını kullanabilmek için dahil ettim
app.use(express.static('public')); // layoutların css dosyalarına ulaşabilmesi için public klasörü static olarak tanımlandı

app.use(express.json()); // post işlemlerinde express in verileri json yapısına parse edebilmesi için bu middleware dahil edildi
app.use(express.urlencoded({ extended: true })); // form yapısından gönderilen verilerin express sunucusu tarafından parse edilmesi için bu middleware dahil edildi

// rotalar dosyaları edildi
const registerRouter = require('./src/routers/register_router');
const loginRouter = require('./src/routers/login_router');
const forgetRouter = require('./src/routers/forget_router');

// hatalar middleware
const hatalarMiddleware = require('./src/middleware/hatalar_middleware')

// rotalar tanımlandı
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/forget', forgetRouter);
app.use(hatalarMiddleware)

app.listen(process.env.PORT, () => {
    console.log('Server running at http://localhost:3000');
})
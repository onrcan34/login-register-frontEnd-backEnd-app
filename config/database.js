
const mongoose = require('mongoose'); // Mongoose paketi dahil edildi

mongoose.connect(process.env.MONGODB_CONNECTION_STRING) // mongoose bağlantı adresini tanıtıldı
    .then((result) => console.log("DB ye bağlandı"))
    .catch((error) => console.log("DB ye bağlanılamadı"))
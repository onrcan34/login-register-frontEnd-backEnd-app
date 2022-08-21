
const mongoose = require('mongoose'); // Mongoose paketi dahil edildi

const Schema = mongoose.Schema; // kısaltma yapıldı

const userSchema = new Schema({ // userSchema nın kuralları belirlendi
    isim: { // hatalar türkçeleştirildi
        type: String,
        minlength: [2, '2 karakterden az olamaz.']
    },
    email: {
        type: String,
        required: [true, 'Zorunlu alan.'],
        unique: [true, 'Bu mail kullanımda.'],
    },
    sifre: {
        type: String,
        minlength: [4, '4 karakterden az olamaz.']
    }
}, {collection: 'users', timestamps: true}); // users isimli collection ı mongoose üzerinde newdb veritabanı içerisine oluşturdu
                         // timestamps: true ile bir kullanıcı oluşturulduğunda createdAt ve updatedAt alanları otomatik olarak oluşturulur

const User = mongoose.model('user', userSchema); // User model tanımı yapıldı

module.exports = User; // User model sınıfı dışarıya export edildi
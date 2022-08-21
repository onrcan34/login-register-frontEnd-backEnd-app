
const Joi = require('joi'); // validataion (doğrulama) işlemlerini yapan joi paketi eklendi 

const schema = // kuralların belirlendiği schema tanımlandı
    Joi.object({ // hatalar aşağıdaki şekilde Türkçe leştirilerek kullanıcın anlaması kolaylaştırıldı
        email: Joi.string().email().required().messages({
            "string.empty": `"email boş bırakılmamalı"`, 
            "any.required": `"email alanı zorunludur"`,
            "string.email": `"geçerli mail giriniz"`,
        }),

        sifre: Joi.string().min(4).required().messages({
            "string.empty": `"sifre boş bırakılmamalı"`,
            "any.required": `"sifre alanı zorunludur"`,
            "string.min": `"Şifre mininmum 4 karakter olmalıdır"`,
        })
    });

module.exports = schema; // joi validation schema sı , gerekli dosyalar tarafından kullanılabilmek için dışaya export edildi 


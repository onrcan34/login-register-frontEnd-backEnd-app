const router = require('express').Router(); // istekleri rotalar üzerinden yönlendirmek için projeye dahil edildi
const forgetController = require('../controller/forget_controller')  // forget işlemlerinin yapıldığı forget_controller modülü dahil edildi

// /forget rotasına get isteği yapıldığında aşağıdaki işlemler gerçekleşir 
router.get('', forgetController.forgetSayfasiniGetir);

// /forget rotasına post isteği yapıldığında aşağıdaki işlemler gerçekleşir 
router.post('', forgetController.forgetPasswordIsleminiYap);

module.exports = router; // rotalar, gerekli dosyalar tarafından kullanılabilmek için dışaya export edildi 
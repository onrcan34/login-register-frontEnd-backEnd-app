const router = require('express').Router();// istekleri rotalar üzerinden yönlendirmek için projeye dahil edildi
const registerController = require('../controller/register_controller'); // register işlemlerinin yapıldığı register_controller modülü dahil edildi

// /login rotasına get isteği yapıldığında aşağıdaki işlemler gerçekleşir 
router.get('', registerController.registerSayfasiniGetir);

// /register rotasına post isteği yapıldığında aşağıdaki işlemler gerçekleşir 
router.post('', registerController.registerIslemleriniYap);

module.exports = router; // rotalar, gerekli dosyalar tarafından kullanılabilmek için dışaya export edildi 
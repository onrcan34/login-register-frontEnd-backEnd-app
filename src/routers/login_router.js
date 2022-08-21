const router = require('express').Router(); // istekleri rotalar üzerinden yönlendirmek için projeye dahil edildi
const loginController = require('../controller/login_controller'); // login işlemlerinin yapıldığı login_controller modülü dahil edildi

// /login rotasına get isteği yapıldığında aşağıdaki işlemler gerçekleşir 
router.get('', loginController.loginSayfasiniGetir);

// /login rotasına post isteği yapıldığında aşağıdaki işlemler gerçekleşir 
router.post('', loginController.loginIslemleriniYap);


module.exports = router; // rotalar, gerekli dosyalar tarafından kullanılabilmek için dışaya export edildi 
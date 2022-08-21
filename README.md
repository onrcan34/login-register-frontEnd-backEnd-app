# login-register-frontEnd-backEnd-app
Login, Register ve Reset Password işlemlerini gerçekleştirebilen FrontEnd & Backend server uygulaması

# Getting Started - Proje Hakkında
Bu proje nodeJS kullanılarak geliştirmiştir. Projede kullanılan npm paketlerinden express ile sunucu oluşturulur. express-ejs-layouts ile render işlemlerinde layouts yapıları kullanılır. mongoose ile veritabanı işlemleri yapılır. bcrypt ile parolalar şifrelenerek (hashlenerek) veritabanına kaydedilir. dotenv paketi ile sabit veriler .env isimli bir dosyada tutulur ve gerekli durumlarda bu dosyadan çağırılır. ejs paketi ile html kodları arasına js kodlarını direkt olarak dahil ederiz. joi paketi ile input olarak girilen değerler database de kontrol edilmeden önce joi validation(doğrulama) işlemlerinden geçer. Böylelikle veritabanı üzerindeki işlem yükü azaltılır. 
Proje npm start komutu ile başlatıldığında, ilk olarak express sunucusu oluşur ve mongoose veritabanı bağlantısı gerçekleşir. newdb isminde veritabanı ve users isminde collection oluşur. Tarayıcı ile localhost:3000 adresi üzerinden /register, /login ve /forget sayfalarına ulaşılabilir. Bu istekler dışında yapılan tüm localhost:3000 istekleri "Geçersiz Rota" olarak algılanır. localhost:3000/register sayfasında kullanıcı kayıt işlemleri, localhost:3000/login sayfasında kullanıcı giriş işlemleri ve localhost:3000/forget sayfasında parola sıfırlama işlemi yapılır. Tüm bu işlemler yapılırken oluşabilecek tüm hatalar ele alınmıştır. Başarılı veya başarısız tüm işlemler ekrana mesaj olarak yansıtılmıştır.  
```
NOT!!!
Bu proje ile veriler mongoose driver sayesinde MongoDB veritabanında tutulur. Böylelikle uygulama yeniden başlatıldığında veriler kaybolmaz
```

# Prerequisites - Gereklilikler
| Gerekli Paket ve Modüller | İndirme İşlemi |
| ------ | ------ |
| node module | https://nodejs.org/en/download/ |
| mongodb | https://www.mongodb.com/try/download/community |
| all npm packages | npm install |

# Installing - Kurulum

### Projeyi terminal üzerinden indirmek için
```
git clone https://github.com/onrcan34/login-register-frontEnd-backEnd-app.git
```
![image](https://user-images.githubusercontent.com/64845818/185812422-2781dd88-1bcb-4953-9095-d181f2712783.png)

### 'git' is not recognized hatası
```
Bu hatayı alıyorsanız, ya git bilgisarınızda kurulu değildir ya da bilgisayarınız git dizin yolunu bulamıyor.
Öncelikle git bilgisayarınızda var mı diye kontrol edin yoksa  https://git-scm.com/download/win adresinden 
git progamını indirip kurulumunu yapın. Daha sonra bilgisayara git dizinini tanıtmak için 
https://www.youtube.com/watch?v=v3RCp26naoI adresinden gerekli ayarlamayı yapın. 
```
![image](https://user-images.githubusercontent.com/64845818/185812974-9b9310f7-2210-4840-a0fd-50f4a3e847ff.png)


### Proje dizinine geçmek için
```
cd login-register-frontEnd-backEnd-app
```
![image](https://user-images.githubusercontent.com/64845818/185813021-0aef79bd-fd16-4df5-a500-e2c4788b2521.png)

### Tüm paketleri tek seferde kurmak için
```
npm i
```
![image](https://user-images.githubusercontent.com/64845818/185813196-ae4df9ef-f0c4-4926-8603-0a1b22c0ec79.png)

### Uygulamayı çalıştırmak için
```
npm start 
```
![image](https://user-images.githubusercontent.com/64845818/185813226-5278fd59-90df-4f77-9a1d-d31ec4fab6ac.png)

```
Görüldüğü gibi sunucu 3000 portunu gelebilecek herhangi bir http isteğine response (cevap) göndermek
için dinler. Program ilk kez çalıştırıldığında mongoose ile newdb isimli database yoksa bu 
veritabanını ve onun "users" isminde bir collection nunu oluşturur.
```

![image](https://user-images.githubusercontent.com/64845818/185813256-a2a2bd27-6e8d-46b6-8be4-c27e60c71f14.png)

```
mongoDB Compass veritabanı gösterimi 
```
![p0_Send](https://user-images.githubusercontent.com/64845818/183240884-3d736014-70f6-47c4-902f-93d6753caee1.png)


### 'nodemon' is not recognized hatası için
```
Bu hata, nodejs projeyi çalıştırmak için nodemon paketini bulamıyor. Çünkü böyle bir paket nodejs de tanımlı değil.
```

![image](https://user-images.githubusercontent.com/64845818/185813567-76609480-3650-4ae2-a88e-d1104fb997ca.png)

```
npm i -g nodemon ile nodemon paketi nodejs e glbal olarak (her dizinden ulaşılabilecek) şekilde eklenir.
```

![image](https://user-images.githubusercontent.com/64845818/185813659-cec38ae6-dde2-4c28-839e-c7a4a7c292a3.png)


### localhost:3000/register get isteğinde bulunmak
```
localhost:3000/register şeklinde sunucuya get isteği yapıldığında "Register" sayfası görüntülenir. Kullanıcı
bu sayfada yeni bir hesap oluşturabilir. 
```
![p1_Send](https://user-images.githubusercontent.com/64845818/183239143-9ff8cebd-8baf-4a20-b885-b96eb1597ac1.png)

```
Register işleminde kullanıcı girdilerinden dolayı herhangi bir hata oluşursa mesaj şeklinde ekrana yansıtılır
```

![p1_Send](https://user-images.githubusercontent.com/64845818/183239143-9ff8cebd-8baf-4a20-b885-b96eb1597ac1.png)


### localhost:3000/login get isteğinde bulunmak
```
localhost:3000/login şeklinde sunucuya get isteği yapıldığında "Login" sayfası görüntülenir. Kullanıcı
register sayfasında oluşturduğu hesap bilgileri ile login sayfasında giriş işlemi gerçekleştirebilir.
```
![p2_Send](https://user-images.githubusercontent.com/64845818/183239750-18cf1eed-c3b2-4d3f-993d-5670b2c20e17.png)

```
Başarılı bir giriş işleminde sayfa aşağıdaki gibi görüntülenir
```

![p2_Send](https://user-images.githubusercontent.com/64845818/183239750-18cf1eed-c3b2-4d3f-993d-5670b2c20e17.png)


### localhost:3000/forget get isteğinde bulunmak
```
localhost:3000/forget şeklinde sunucuya get isteği yapıldığında "Reset Password" sayfası görüntülenir. 
Kullanıcı bu sayfada, daha önceden oluşturduğu hesabının parolasını değiştirebilir.
```
![p3_Send](https://user-images.githubusercontent.com/64845818/183239761-1d926825-b027-44d5-8bbf-353d01744008.png)

```
Başarısız bir parola değiştirme işleminde sayfa aşağıdaki gibi görüntülenir.
```

![p3_Send](https://user-images.githubusercontent.com/64845818/183239761-1d926825-b027-44d5-8bbf-353d01744008.png)


### localhost:3000/ get isteğinde bulunmak
```
localhost:/3000 veya bu adres üzerinden yapılan /login, /register ve /forget istekleri dışında yapılan tüm
isteklerde aşağıdaki sayfa görüntülenir. Böylelikle kullanıcı, isteğimiz dışında bir rota girdiğinde 
program çalışmayı durdurmaz.

NOTE! 
Tarayıcıda json çıktıların aşağıdaki gibi görünmesi için json formatter eklentisini indirebilirsiniz.
```

![p4_Send](https://user-images.githubusercontent.com/64845818/183241584-ed2a3695-f255-4b08-b0e9-ddb3ea13a706.png)




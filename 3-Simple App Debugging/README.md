# CodeDebugging

---

## Berikut ini merupakan proses Debugging yang saya lakukan

---

### 1. Inisialisasi

---

Pada tahapan ini, saya mempersiapkan segala kebutuhan yang perlu disiapkan untuk menjalankan aplikasi,
seperti instalasi paket-paket dari npm, mendaftarkan aplikasi ke OAuth GitHub, dan mengisi env.

Setelah saya melakukan hal tersebut, dilanjutkan dengan proses Debugging itu sendiri.

---

### 2. Debugging

---

Pada tahapan ini, saya mulai menjalankan aplikasi sembari membenahi error yang terjadi pada aplikasi.

Error pertama yang saya temui terdapat pada penaaman file `env`, yang seharusnya dinamai `.env`. Setelah itu, di file yang sama, terdapat error dimana data konfigurasi pada file `.env` tidak dapat terbaca, sehingga diperlukan perubahan posisi blok kode program pada file `index.js` berikut:

```javascript
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
```

Dimana blok kode program tersebut dipindahkan ke bagian awl, sehingga dapat dilakukan eksekusi sesegera mungkin, selain itu juga dilakukan *unpacking* untuk data JSON konfigurasi, sehingga pada saat `require("../config")` diubah menjadi `require("../config").config`.

Selanjutnya terdapat error dalam `module-exports` di file `authService.js` untuk function `redirectUri()` dan di file `userInfoService.js` untuk function `getUserInfo()`. Perbaikan berupa pembenaran typo dan styling. Selain itu juga terdapat perbaikan nama variabel return dari promise pertama pada fungsi `callback()` pada file `authCallbackService.js`, dari res menjadi resp.

Error terakhir yang ditemukan dan diperbaiki adalah permasalahan perpindahan data antara file `authCallbackService.js` dan file `userInfoService.js` melalui function `getUserInfo()`, serta kesalahan nama endpoint API.
Untuk endpoint API, yang benar adalah `/user`, sedangkan awalnya adalah `/users`. Sedangkan untuk masalah perpindahan data, dilakukan modifikasi function `getUserInfo()` menjadi async function sebagai berikut:

```javascript
async function getUserInfo(token) {
  try {
    const { data } = await axios({
      method: "get",
      url: `${config.apiUrl}/user`,
      headers: {
        Authorization: "token " + token,
      },
    });

    return data;

  } catch (error) {
    console.log(error)
  }
  
  }
```

Dan di file `authCallbackService.js` ditambahkan `then()` untuk menangkap *promise* dari function async tersebut.

---

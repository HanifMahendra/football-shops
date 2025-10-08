README Tugas 2

Link app PWS saya: https://hanif-awiyoso-footballshops.pbp.cs.ui.ac.id/

Saya izin menjawab pertanyaan-pertanyaan berikut:
1. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
2. Buatlah bagan yang berisi request client ke web aplikasi berbasis Django beserta responnya dan jelaskan pada bagan tersebut kaitan antara urls.py, views.py, models.py, dan berkas html.
3. Jelaskan peran settings.py dalam proyek Django!
4. Bagaimana cara kerja migrasi database di Django?
5. Menurut Anda, dari semua framework yang ada, mengapa framework Django dijadikan permulaan pembelajaran pengembangan perangkat lunak?
6. Apakah ada feedback untuk asisten dosen tutorial 1 yang telah kamu kerjakan sebelumnya?

Berikut jawaban saya:

1. Untuk mengimplementasikan checklist di atas dalam proyek Django, saya biasanya mulai dari merancang model data di models.py, karena model ini merepresentasikan struktur   data dan relasi antar entitas di database. Setelah itu, saya membuat fungsi atau class di views.py yang akan mengeksekusi logika ketika ada permintaan (request) dari client, misalnya mengambil data dari model, memprosesnya, atau menampilkan halaman tertentu. Selanjutnya, saya membuat urls.py untuk memetakan setiap URL endpoint ke view yang sesuai, sehingga ketika client mengakses URL tertentu, Django tahu view mana yang harus dijalankan. Terakhir, saya menyiapkan kode HTML yang akan dirender oleh view untuk menampilkan data ke client, biasanya melalui context yang dikirim dari views.

2. User -- Request ke --> URLConf --> Pilih view ke --------> Views <-- Query dan respon ke --> Model <-- Kirim data ke --> Database
   ^                                                           akan
   |--- Tampil hal web ke <-- Template <-- Pilih HTML (template) ke
   
Dalam bagan tersebut, urls.py berfungsi sebagai penghubung antara URL yang diminta client dengan fungsi view yang relevan. views.py mengeksekusi logika aplikasi, termasuk interaksi dengan database melalui models.py, sedangkan HTML bertugas menampilkan data tersebut ke client.

4. settings.py berperan penting sebagai pusat konfigurasi proyek Django, termasuk pengaturan database, aplikasi terinstal, middleware, static files, template engine, dan konfigurasi keamanan. Semua komponen Django mengacu pada pengaturan ini agar proyek berjalan sesuai konfigurasi yang diinginkan.

Untuk migrasi database, Django menggunakan perintah makemigrations untuk mendeteksi perubahan di models.py dan membuat berkas migrasi, lalu migrate untuk mengeksekusi perubahan tersebut di database. Dengan mekanisme ini, struktur database selalu sinkron dengan model aplikasi tanpa harus menulis query SQL secara manual.

4. Django sering dijadikan framework awal pembelajaran karena menyediakan banyak fitur bawaan yang mempermudah pembuatan aplikasi web, seperti ORM, routing, authentication, dan template engine. Ini memungkinkan pemula fokus pada logika aplikasi tanpa terlalu banyak bergulat dengan konfigurasi atau boilerplate code.

5. Sebagai catatan untuk feedback tutorial 1, asisten dosen sudah cukup jelas dalam menjelaskan langkah-langkah dasar.

Sekian jawaban pertanyaan-pertanyaan untuk Tugas 2, mohon maaf apabila ada kesalahan kata. Hanif Awiyoso Mahendra 2406439854

README Tugas 3

Saya izin menjawab pertanyaan-pertanyaan berikut:
1. Jelaskan mengapa kita memerlukan data delivery dalam pengimplementasian sebuah platform?
2. Menurutmu, mana yang lebih baik antara XML dan JSON? Mengapa JSON lebih populer dibandingkan XML?
3. Jelaskan fungsi dari method is_valid() pada form Django dan mengapa kita membutuhkan method tersebut?
4. Mengapa kita membutuhkan csrf_token saat membuat form di Django? Apa yang dapat terjadi jika kita tidak menambahkan csrf_token pada form Django? Bagaimana hal tersebut dapat dimanfaatkan oleh penyerang?
5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
6. Apakah ada feedback untuk asdos di tutorial 2 yang sudah kalian kerjakan?

Berikut jawaban saya:
1. Dalam mengembangkan sebuah platform, kita memerlukan data delivery karena hal ini berhubungan langsung dengan bagaimana data bisa berpindah dari satu bagian sistem ke bagian lain dengan aman dan konsisten. Tanpa mekanisme data delivery yang baik, integrasi antar komponen bisa terganggu, performa aplikasi bisa menurun, dan resiko data tidak terkirim atau tidak sinkron akan semakin besar. Dengan adanya data delivery, proses seperti pengiriman notifikasi, integrasi ke sistem pihak ketiga, sampai pencatatan log menjadi lebih terjamin.

2. Jika membandingkan XML dengan JSON, keduanya sama-sama digunakan sebagai pertukaran data. Namun, JSON lebih sering dipakai saat ini karena lebih ringkas, lebih mudah dibaca, parsing lebih cepat. Hal ini membuat JSON lebih praktis dalam pengembangan aplikasi web modern. XML memang masih dipakai di beberapa sistem tertentu, terutama yang sifatnya legacy atau membutuhkan fitur tambahan seperti namespaces atau XSD, tetapi secara umum JSON lebih populer karena sederhana dan efisien.

3. Pada Django, method **is_valid()** memiliki fungsi penting dalam validasi form. Method ini digunakan untuk mengecek apakah data yang dikirim user sesuai dengan aturan yang ditentukan di form, misalnya apakah sebuah field wajib diisi atau apakah data memiliki format yang benar. Jika valid, data akan disimpan dalam cleaned_data sehingga bisa diproses lebih lanjut dengan aman. Dengan begitu, kita bisa memastikan bahwa data yang masuk ke database sudah melalui validasi dan sesuai kebutuhan aplikasi.

4. Kemudian, **csrf_token** diperlukan pada form Django untuk melindungi aplikasi dari serangan Cross-Site Request Forgery (**CSRF**). Token ini berfungsi memastikan bahwa request yang dikirim benar-benar berasal dari form yang sah, bukan dari website lain yang berusaha memanfaatkan sesi login pengguna. Jika kita tidak menambahkan _csrf_token_, seorang penyerang bisa membuat form di situs berbahaya yang sebenarnya akan menjalankan aksi tertentu di aplikasi kita tanpa sepengetahuan pengguna. Hal ini bisa menimbulkan masalah serius seperti perubahan data, transaksi palsu, atau penghapusan data penting.

5. Jika saya mencoba mengimplementasikan hal-hal di atas, langkah-langkah yang saya lakukan adalah pertama mendefinisikan model dan format data yang akan digunakan, biasanya JSON karena lebih sederhana. Setelah itu saya membuat form Django dengan validasi yang sesuai, lalu menggunakan **is_valid()** untuk mengecek kebenaran data. Selanjutnya, saya menambahkan **{% csrf_token %}** di dalam template agar setiap form terlindungi dari CSRF. Jika ada kebutuhan pengiriman data ke sistem lain, saya bisa menambahkan mekanisme task queue agar prosesnya lebih aman dan tidak membebani aplikasi utama. Terakhir, saya melakukan pengujian dengan unit test dan menambahkan log agar alur data bisa lebih mudah dipantau.

6. Sebagai feedback untuk asdos pada tutorial 2, menurut saya penjelasan yang diberikan sudah membantu karena disertai contoh praktis. Namun, akan lebih baik kalau penjelasan dibuat lebih detail, karena sering membuat bingung. Kalau bisa, disertakan juga contoh singkat tentang cara membuat unit test, supaya mahasiswa terbiasa melakukan pengujian sejak awal.

Terlampir link gdrive untuk hasil screenshot Postman saya: https://drive.google.com/drive/folders/1RmMSs1khdIuJFtiMLP7fyydIGSSKtjaQ?usp=sharing

README tugas 4

Pertanyaan:
1. Apa itu Django AuthenticationForm? Jelaskan juga kelebihan dan kekurangannya.
2. Apa perbedaan antara autentikasi dan otorisasi? Bagaiamana Django mengimplementasikan kedua konsep tersebut?
3. Apa saja kelebihan dan kekurangan session dan cookies dalam konteks menyimpan state di aplikasi web?
4. Apakah penggunaan cookies aman secara default dalam pengembangan web, atau apakah ada risiko potensial yang harus diwaspadai? Bagaimana Django menangani hal tersebut?
5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).

Berikut jawaban saya:
1. **AuthenticationForm** adalah form yang disediakan Django di django.contrib.auth.forms. Fungsinya untuk menangani proses login: menerima input username/password (atau sesuai `USERNAME_FIELD` pada User model), memanggil authenticate() untuk memverifikasi kredensial, dan memudahkan validasi/error message. LoginView (class-based view bawaan) menggunakan `AuthenticationForm` secara default.
Kelebihan:
Siap pakai, teruji, integrasi mulus dengan authenticate() dan login().
Menyediakan error handling dan message standar.
Mendukung request di constructor (dipakai oleh beberapa backend yang butuh request).
Mudah dipakai dengan LoginView.
Kekurangan:
Default berasumsi login via `USERNAME_FIELD`. Jika ingin login pakai email/OTP/2FA → perlu customisasi (custom form / backend).
Tidak ada fitur "remember me" otomatis, maka harus ditambahkan secara manual.
Kalau butuh validasi level objek, dibutuhkan override/extend.

2. `Autentikasi (Authentication)` = "Siapa kamu?" -> proses memverifikasi identitas (username/password, token, OAuth).
`Otorisasi (Authorization)` = "Boleh apa yang kamu lakukan?" -> proses memeriksa apakah identitas tersebut punya hak untuk mengakses resource/aksi tertentu.
`**Autentikasi di Django:**`
django.contrib.auth menyediakan model User, fungsi authenticate(), login() dan logout().
Authentication backends (AUTHENTICATION_BACKENDS) menentukan cara memverifikasi kredensial. Default ModelBackend memeriksa username/password terhadap DB.
AuthenticationMiddleware + SessionMiddleware mengisi request.user tiap request (user atau AnonymousUser).
login(request, user) menyimpan identitas ke session dan memanggil request.session.cycle_key() untuk mencegah session fixation.
`Otorisasi di Django:`
Sistem permission built-in: model Permission, user_permissions, Group.
API: user.has_perm('app_label.codename'), user.has_perms([...]_, user.has_module_perms('app').
Dekorator: @login_required, @permission_required, LoginRequiredMixin untuk class-based views.
Untuk object-level permissions Django tidak menyediakan full solution built-in — biasa pakai library seperti django-guardian atau implementasi manual.

3. **Cookies (client-side)**
**Kelebihan:**
Tidak butuh penyimpanan server (skala horizontal mudah).
Berguna untuk preference kecil (tema, bahasa).
Bisa membuat aplikasi sepenuhnya stateless bila menyimpan seluruh state di cookie (umumnya disarankan hanya untuk data kecil dan aman).
**Kekurangan:**
Terbatas ukuran (≈4KB).
Rentan terhadap XSS (jika bukan HttpOnly) dan manipulasi (kecuali ditandatangani/terenkripsi).
Dikirim ke server di setiap request → overhead jaringan & kebocoran info.
Penyimpanan sensitif pada client berarti kontrol invalidasi/penarikan kembali sulit.

**Sessions (server-side, + sessionid cookie)**
**Kelebihan:**
Data disimpan di server — lebih aman terhadap manipulasi klien.
Mudah menghapus/invalidate sesi (mis. logout, forced logout).
Bisa menyimpan data besar tanpa mengirimkannya setiap request (hanya session id di cookie).
**Kekurangan:**
Butuh penyimpanan server (DB/Cache/Redis) → kompleksitas & cost; harus dipikirkan saat scaling (shared sessions).
Jika skala horizontal, butuh backend session terpusat (Redis/DB) atau sticky sessions.
Jika menggunakan backend “signed cookie” (Django: signed_cookies), maka risikonya mirip cookie biasa (meskipun data ditandatangani).

4. **Tidak**. Cookies sendiri tidak otomatis aman — ada beberapa vektor serangan yang harus diperhatikan: XSS (script yang baca cookie), CSRF (aksi atas nama user), Man-in-the-Middle (jika tidak pakai HTTPS), session fixation, dan cookie tampering.
**Risiko utama:**
XSS: jika attacker bisa menyuntik JS, dia dapat membaca cookie yang tidak HttpOnly.
CSRF: cookie otomatis dikirim oleh browser, sehingga permintaan berbahaya dari situs lain bisa menggunakan cookie korban.
Sniffing (MITM): jika koneksi HTTP, cookie bisa dicuri.
Tampering: jika cookie berisi data sensitif dan tidak ditandatangani/encrypted.
**Bagaimana Django membantu / best practices:**
Session storage server-side (default): hanya sessionid disimpan di cookie; data ada di server.
CSRF protection: CsrfViewMiddleware + template tag {% csrf_token %} (mencegah request POST cross-site).
Cookie flags (dapat/diharus dikonfigurasi di settings.py):
`SESSION_COOKIE_HTTPONLY` = True → cookie session tidak bisa diakses JS (kurangi XSS impact).
`SESSION_COOKIE_SECURE` = True → hanya dikirim via HTTPS (hindari sniffing).
`SESSION_COOKIE_SAMESITE` = 'Lax'/'Strict' → mengurangi risiko CSRF via third-party requests.
`CSRF_COOKIE_SECURE` dan `CSRF_COOKIE_SAMESITE` mirip untuk cookie CSRF.
Rotate session key: login() memanggil session.cycle_key() untuk mencegah session fixation.
Signed cookies / signing: jika memakai signed_cookies backend atau menyimpan data di cookie, Django menggunakan SECRET_KEY untuk menandatangani sehingga tamper akan terdeteksi.
SecurityMiddleware: aktifkan untuk header security (HSTS, X-Content-Type-Options, X-Frame-Options).
Password hashing & auth protections: Django pakai algoritma hashing yang kuat untuk password dan mekanisme pengecekan.

5. Untuk mengimplementasikan checklist tersebut, pertama saya membuat fitur registrasi, login, dan logout dengan memanfaatkan form bawaan Django seperti `UserCreationForm` untuk registrasi dan `AuthenticationForm` untuk login, lalu menggunakan fungsi `login()` dan `logout()` agar status autentikasi pengguna tersimpan dalam session. Setelah itu, saya menghubungkan model `Product` dengan `User` melalui `ForeignKey` sehingga setiap produk dimiliki oleh satu pengguna tertentu. Selanjutnya, saya menambahkan dua akun pengguna di lokal menggunakan Django shell dan membuat masing-masing tiga data dummy `Product` untuk setiap akun agar bisa diuji pada aplikasi. Pada halaman utama, saya menampilkan detail pengguna yang sedang login seperti `username` dengan memanfaatkan `request.user`, serta menerapkan cookies untuk menyimpan informasi `last_login` yang diambil sebelum proses login agar bisa ditampilkan kembali saat pengguna berhasil masuk. Dengan alur ini, aplikasi dapat membedakan akses berdasarkan status login/logout, menyimpan kepemilikan data berdasarkan akun, serta memberikan pengalaman yang lebih personal lewat informasi login terakhir yang disimpan melalui cookie.


README Tugas 5:

Pertanyaan:
1. Jika terdapat beberapa CSS selector untuk suatu elemen HTML, jelaskan urutan prioritas pengambilan CSS selector tersebut!
2. Mengapa responsive design menjadi konsep yang penting dalam pengembangan aplikasi web? Berikan contoh aplikasi yang sudah dan belum menerapkan responsive design, serta jelaskan mengapa!
3. Jelaskan perbedaan antara margin, border, dan padding, serta cara untuk mengimplementasikan ketiga hal tersebut!
4. Jelaskan konsep flex box dan grid layout beserta kegunaannya!
5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial)!

Jawaban saya:
1. Urutan Prioritas CSS Selector

Kalau satu elemen HTML kebanyakan CSS yang nargetin, browser bakal pilih yang **paling spesifik** dulu, baru yang kurang spesifik. Urutannya kira-kira gini:

1. **Inline style** (`<div style="color:red;">`) → paling kuat.
2. **ID selector** (`#id`) → lebih spesifik dari class atau tag.
3. **Class, pseudo-class, attribute selector** (`.class`, `:hover`, `[type="text"]`) → medium.
4. **Tag selector** (`div`, `p`, `h1`) → paling weak.
5. Kalau spesifisitas sama, yang ditulis **belakangan** di CSS bakal menang (cascade).

Contoh:

```css
p { color: blue; }        /* tag selector */
.text { color: green; }   /* class selector */
#main { color: red; }     /* ID selector */
```

Kalau ada `<p id="main" class="text">` → teks bakal **merah**, karena ID lebih spesifik.

2. Pentingnya Responsive Design

Responsive design itu penting banget karena sekarang orang buka web dari **laptop, HP, tablet**, dan lain-lain. Kalau nggak responsive, layout bisa berantakan, tulisan susah dibaca, tombol susah ditekan.

**Contoh:**
**Responsive:** Google, Tokopedia -> layout fleksibel, menu gampang diakses di HP maupun desktop.
**Belum responsive:** Website kampus lama -> layout tetap sama di HP dan desktop, kadang menu ilang atau teks terlalu kecil.

Teknik yang biasanya dipakai: **media queries**, **flexbox**, **grid**.

3. Perbedaan Margin, Border, dan Padding

| Properti    | Fungsinya                                        | Contoh CSS                 |
| ----------- | ------------------------------------------------ | -------------------------- |
| **Margin**  | Jarak **luar** elemen ke elemen lain             | `margin: 10px;`            |
| **Border**  | Garis **pinggir** elemen                         | `border: 2px solid black;` |
| **Padding** | Jarak **dalam** elemen, antara konten dan border | `padding: 5px;`            |
Pls rapih, udah effort haha

Contoh implementasi:

```css
div.box {
  margin: 20px;          /* jarak dari elemen lain */
  border: 2px solid red; /* garis tepi */
  padding: 10px;         /* jarak antara konten dan border */
}
```

4. Konsep Flexbox dan Grid Layout

**Flexbox**

Layout satu dimensi (cuma baris **atau** kolom).
Cocok buat bikin navigasi, daftar kartu, atau elemen yang pengen rapi dan fleksibel.

```css
.container {
  display: flex;
  justify-content: space-between; /* jarak antar elemen */
  align-items: center;            /* rata vertikal */
}
```

**Grid Layout**

Layout dua dimensi (baris **dan** kolom).
Cocok buat layout kompleks kayak dashboard atau halaman produk.

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

5. Cara Saya Ngerjain Checklist Ini Step-by-Step

Baca soal, terus pikirin elemen mana aja yang perlu di-style.
Cari referensi kode elemen-elemen untuk design yang ingin digunakan
Bikin struktur HTML dulu -> header, section, article, dll.
Tulis CSS -> warna, font, margin/padding, layout awal.
Pilih selector yang pas -> ID, class, atau tag biar style tepat.
Buat responsive -> pakai media queries, flexbox, grid.
Cek di layar beda-beda -> desktop, tablet, HP, pastiin nggak pecah. (CTRL ALT I + M)
Finishing -> rapihin spacing, alignment, font size.
Catet di README biar langkah-langkahnya jelas. (termasuk checklist kan ya?)


README Tugas 6:

```Pertanyaan:
1. Apa perbedaan antara synchronous request dan asynchronous request?
2. Bagaimana AJAX bekerja di Django (alur request–response)?
3. Apa keuntungan menggunakan AJAX dibandingkan render biasa di Django?
4. Bagaimana cara memastikan keamanan saat menggunakan AJAX untuk fitur Login dan Register di Django?
5. Bagaimana AJAX mempengaruhi pengalaman pengguna (User Experience) pada website?```

```Jawaban:
1.
Synchronous Request:
Browser mengirim permintaan ke server dan menunggu hingga mendapat respons
Selama menunggu, halaman web diblokir (tidak responsif)
Setiap interaksi mengakibatkan refresh halaman penuh
Alurnya linear dan berurutan: request → tunggu → response → lanjut

Asynchronous Request:
Browser mengirim permintaan namun tidak perlu menunggu respons
Halaman web tetap responsif selama menunggu respons dari server
Memperbarui hanya bagian tertentu dari halaman tanpa refresh penuh
Alurnya non-linear: request → lanjutkan eksekusi → handle response ketika datang

2.
Event Trigger:
Pengguna melakukan aksi (klik tombol, submit form, dll)

JavaScript Inisiasi:
JavaScript membuat objek XMLHttpRequest atau menggunakan Fetch API
Request Dikirim: Browser mengirim permintaan HTTP asinkron ke URL Django tertentu

Server Processing:
Django menerima request di URL yang ditentukan
View Django memproses request seperti biasa
Alih-alih merender template HTML penuh, Django mengembalikan data (biasanya JSON)

Response Handling:
Browser menerima data JSON
JavaScript mengolah data dan memperbarui DOM secara selektif
Perubahan ditampilkan tanpa refresh halaman penuh

3.
Performa Lebih Baik:
Mengurangi transfer data (hanya mengambil data yang diperlukan)
Mengurangi beban server (tidak perlu merender template lengkap)
Waktu respons lebih cepat karena hanya memperbarui sebagian halaman

User Experience Superior:
Tidak ada "flash" putih saat berpindah antar halaman
Aplikasi terasa lebih responsif dan mulus
Interaksi tanpa gangguan navigasi

Fleksibilitas Pengembangan:
Pemisahan jelas antara backend (data) dan frontend (UI)
Memungkinkan pembaruan real-time tanpa reload
Memudahkan implementasi fitur modern (infinite scroll, auto-save, dll)

Mengurangi Redundansi:
Elemen statis (header, footer, sidebar) tidak perlu dimuat ulang
Hanya data yang berubah yang ditransfer dan diperbarui

4.
CSRF Protection:
Menyertakan CSRF token dalam setiap request AJAX
Contoh implementasi:
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
fetch('/api/login/', {
  method: 'POST',
  headers: {
    'X-CSRFToken': csrftoken,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});

Validasi Server-Side:
Tetap melakukan validasi ketat di server meskipun ada validasi client-side
Jangan pernah mengandalkan validasi JavaScript saja

Penggunaan HTTPS:
Mengenkripsi semua traffic untuk mencegah MITM attacks
Sangat penting untuk login/register yang mentransmit kredensial

Rate Limiting:
Menerapkan pembatasan percobaan login untuk mencegah brute force
Menambahkan delay pada respons login gagal

Penanganan Error yang Aman:
Tidak mengekspos detail sistem saat error terjadi
Memberikan pesan error generik yang tidak membantu attacker

HTTP-Only Cookies:
Menggunakan HTTP-only cookies untuk token autentikasi
Mencegah akses JavaScript ke cookie sensitif

5.
Responsivitas Tinggi:
Feedback instan tanpa delay refresh halaman
Aplikasi terasa seperti aplikasi desktop/native

Indikator Status yang Lebih Baik:
Dapat menampilkan loading spinner selama proses
Toast notifications untuk konfirmasi aksi
Feedback visual real-time

Navigasi yang Mulus:
Pengguna tetap dalam konteks yang sama
Tidak ada gangguan alur kerja pengguna

Peningkatan Interaktivitas:
Validasi form real-time sebelum submit
Autosuggest dan autocomplete yang responsif
Filter dan sorting tanpa reload halaman

Optimasi untuk Koneksi Lambat:
Pengguna masih dapat berinteraksi saat loading
Data dapat dimuat secara progresif (lazy loading)
Pengalaman browsing tetap mulus bahkan di koneksi lambat
```

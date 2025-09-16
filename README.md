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

6. Sebagai feedback untuk asdos pada tutorial 2, menurut saya penjelasan yang diberikan sudah membantu karena disertai contoh praktis. Namun, akan lebih baik kalau penjelasan tentang **is_valid()** dan cleaned_data dibuat lebih detail, karena bagian ini sering membuat bingung. Selain itu, contoh penerapan **csrf_token** dalam request AJAX juga akan sangat membantu supaya mahasiswa tidak bingung ketika POST request mereka ditolak. Penjelasan perbedaan antara Django Form biasa dan serializer pada DRF juga bisa ditambahkan, agar mahasiswa tahu kapan sebaiknya menggunakan masing-masing. Kalau bisa, disertakan juga contoh singkat tentang cara membuat unit test, supaya mahasiswa terbiasa melakukan pengujian sejak awal.

Terlampir link gdrive untuk hasil screenshot Postman saya: https://drive.google.com/drive/folders/1RmMSs1khdIuJFtiMLP7fyydIGSSKtjaQ?usp=sharing

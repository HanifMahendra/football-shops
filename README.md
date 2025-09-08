[# football-shops](https://pbp.cs.ui.ac.id/web/project/hanif.awiyoso/footballshops)

Untuk mengimplementasikan checklist di atas dalam proyek Django, saya biasanya mulai dari merancang model data di models.py, karena model ini merepresentasikan struktur data dan relasi antar entitas di database. Setelah itu, saya membuat fungsi atau class di views.py yang akan mengeksekusi logika ketika ada permintaan (request) dari client, misalnya mengambil data dari model, memprosesnya, atau menampilkan halaman tertentu. Selanjutnya, saya membuat urls.py untuk memetakan setiap URL endpoint ke view yang sesuai, sehingga ketika client mengakses URL tertentu, Django tahu view mana yang harus dijalankan. Terakhir, saya menyiapkan kode HTML yang akan dirender oleh view untuk menampilkan data ke client, biasanya melalui context yang dikirim dari views.

Client Request (HTTP) ──> urls.py ──> views.py ──> models.py ──> Database
       │                     │              │
       │                     │              └─ ambil/simpan data
       │                     │
       │                     └─ proses logika, kirim context
       │
       └─ Response HTML <── templates.html <── context dari views.py

Dalam bagan tersebut, urls.py berfungsi sebagai penghubung antara URL yang diminta client dengan fungsi view yang relevan. views.py mengeksekusi logika aplikasi, termasuk interaksi dengan database melalui models.py, sedangkan HTML bertugas menampilkan data tersebut ke client.

settings.py berperan penting sebagai pusat konfigurasi proyek Django, termasuk pengaturan database, aplikasi terinstal, middleware, static files, template engine, dan konfigurasi keamanan. Semua komponen Django mengacu pada pengaturan ini agar proyek berjalan sesuai konfigurasi yang diinginkan.

Untuk migrasi database, Django menggunakan perintah makemigrations untuk mendeteksi perubahan di models.py dan membuat berkas migrasi, lalu migrate untuk mengeksekusi perubahan tersebut di database. Dengan mekanisme ini, struktur database selalu sinkron dengan model aplikasi tanpa harus menulis query SQL secara manual.

Django sering dijadikan framework awal pembelajaran karena menyediakan banyak fitur bawaan yang mempermudah pembuatan aplikasi web, seperti ORM, routing, authentication, dan template engine. Ini memungkinkan pemula fokus pada logika aplikasi tanpa terlalu banyak bergulat dengan konfigurasi atau boilerplate code.

Sebagai catatan untuk feedback tutorial 1, asisten dosen sudah cukup jelas dalam menjelaskan langkah-langkah dasar.

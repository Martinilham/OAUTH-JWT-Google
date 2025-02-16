# Google OAuth Login dengan Session JWT Token

## 🚀 Pendahuluan
Proyek ini mengimplementasikan autentikasi pengguna menggunakan **Google OAuth** dengan sistem **session-based authentication** menggunakan **JWT (JSON Web Token)**. Pengguna dapat login menggunakan akun Google, dan sesi mereka akan dikelola dengan **JWT** yang disimpan di database dan cookie.

## ✨ Fitur
- Login menggunakan Google OAuth
- Pembuatan dan penyimpanan **JWT access token** dan **refresh token**
- Penyimpanan token di database untuk keamanan tambahan
- Middleware untuk otentikasi dan otorisasi pengguna
- Logout dengan penghapusan sesi token

## 🛠️ Teknologi yang Digunakan
- **Node.js** + **Express.js** - Backend API
- **MongoDB / PostgreSQL** - Penyimpanan user dan token
- **Passport.js** - Google OAuth2.0 authentication
- **JWT (jsonwebtoken)** - Token management
- **Express-session** - Manajemen sesi

## ⚙️ Instalasi & Konfigurasi
### 1. Clone Repository
```sh
git clone https://github.com/Martinilham/OAUTH-JWT-Google.git
cd OAUTH-JWT-Google
```
### 2. Install Dependencies
```sh
npm install
```
### 3. Konfigurasi Environment
Buat file **.env** dan isi dengan:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
CALLBACK_URL=http://localhost:5000/auth/google/callback
DB_URI=your_database_connection_uri
```

### 4. Jalankan Server
```sh
npm start
```

## 🔑 Cara Kerja
1. **User mengklik tombol login** ➝ Redirect ke Google OAuth
2. **Google memverifikasi user** ➝ Mengembalikan kode authorization
3. **Server menukar kode dengan token** ➝ Membuat JWT untuk sesi
4. **JWT disimpan di database dan dikirim ke client** ➝ User terautentikasi
5. **Setiap request dilindungi middleware** ➝ Memeriksa validitas token
6. **User logout** ➝ Token dihapus dari database

## 📌 API Endpoint
| Method | Endpoint | Deskripsi |
|--------|---------|------------|
| GET | /auth/google | Redirect ke Google OAuth |
| GET | /auth/google/callback | Callback setelah login |
| GET | /profile | Mengambil data user |
| POST | /logout | Logout dan hapus sesi |

## 📷 Preview
_Tambahkan screenshot UI atau diagram arsitektur di sini_

## 💡 Catatan
- Gunakan **HTTPS** untuk pengamanan lebih baik
- Implementasikan **refresh token** agar sesi tetap aktif lebih lama

## 📜 Lisensi
Proyek ini menggunakan lisensi 

---
Kreasikan sesuai yang Anda mau Saya hanya belajar menyediakan library OKE


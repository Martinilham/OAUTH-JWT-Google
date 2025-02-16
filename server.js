import express from 'express';
import cors from "cors";
import session from 'express-session'; // Pastikan ini diaktifkan
import passport from './config/passport.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import startWhatsApp from "./config/koneksi-WA.js"
import Oauth from "./routes/oauth-route.js"
import Karyawan from "./routes/karyawan-routes.js"

import "./config/database.js"
dotenv.config();

/* Inisialisasi Express */
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());


/* Setup Session */
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Jika pakai HTTPS, ubah ke true
}));

/* Setup Passport */
app.use(passport.initialize());
app.use(passport.session()); // Gunakan session agar login tetap tersimpan

app.use(Oauth)
app.use(Karyawan)

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

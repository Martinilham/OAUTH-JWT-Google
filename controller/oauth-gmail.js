import passport from "../config/passport.js";
import jwt from 'jsonwebtoken';
import Karyawan from "../models/karyawan.js"

/* Redirect user to Google login */
export const passportAuth = passport.authenticate("google", { scope: ["email", "profile"] },{prompt: "select_account"});

/* Handle Google OAuth callback */
export const authCallback = (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
        if (err) {
            console.error("🚨 Authentication Error:", err);
            return next(err);
        }
        if (!user) {
            console.warn("⚠️ User tidak Terautentikasi:", info);
            return res.status(400).json({ error: info?.message || "Authentication failed" });
        }

        try {
            if(user.status == true){
                // Generate JWT & Refresh Token
            const accessToken = jwt.sign({ userId: user._id, statusEmail: user.status, roleUser:user.role }, process.env.JWT_SECRET, {
                expiresIn: "15m",
              });
              const refreshToken = jwt.sign(
                { userId: user._id, roleUser:user.role},
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "7d" }
              );
        
              // Simpan refresh token ke database
              // user.refreshToken = refreshToken;
              // await user.save();
        
              // Simpan token di cookie
              res.cookie("accessToken", accessToken, { httpOnly: true, secure: false });
              res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
            //   localStorage.setItem("token",accessToken)
        

              res.json({ message: "Login successful", accessToken, refreshToken, user });
            } else {
                res.json({ message: "Login gagal Akun Anda status offline"});
            }
          } catch (error) {
            console.error("❌ Error saving refresh token:", error);
            return res.status(500).json({ error: "Server error" });
          }
        })(req, res, next);
      };


/* Handle logout */
export const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: "Logout failed" });

        req.session.destroy((err) => {
            if (err) return res.status(500).json({ error: "Session destruction failed" });

            res.status(200).json({ message: "Logout successful!" });
        });
    });
};

export const verifyToken = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);

  const authHeader = req.headers["authorization"];
  const token =
    req.cookies?.accessToken ||
    (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Tidak Terdapat Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
};



export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
  
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized: tidak Terdapat Refresh token" });
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await Karyawan.findById(decoded.userId);
  
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: "Forbidden: Refresh Token Tidak Sesuai" });
      }
  
      const newAccessToken = jwt.sign({ userId: user._id,  roleUser:user.role}, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
  
      res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: false });
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      return res.status(403).json({ message: "Forbidden: Refresh Token Tidak Sesuai" });
    }
  };
  
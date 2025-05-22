const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = async (req, res) => {
  const { studentNumber, password } = req.body;

  try {
    // öğrenci var mı? (aktif durum kontrolü kaldırıldı)
    const [rows] = await pool.query(
      "SELECT * FROM ogrenciler WHERE studentNumber = ?",
      [studentNumber]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Öğrenci bulunamadı" });
    }

    const user = rows[0];

    // Şifre kontrolü (hash'li değilse direkt eşle)
    const passwordMatches =
      user.password.startsWith("$2b$") // bcrypt hash mi?
        ? await bcrypt.compare(password, user.password)
        : password === user.password;

    if (!passwordMatches) {
      return res.status(401).json({ message: "Şifre hatalı" });
    }

    // Token oluştur
    const token = jwt.sign(
      { id: user.id, studentNumber: user.studentNumber },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ token, ad: user.ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
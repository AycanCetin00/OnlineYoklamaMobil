const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/authRoutes"));

// Basit canlılık testi
app.get("/", (_, res) => res.send("API ayakta, çaylar benden!"));

app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

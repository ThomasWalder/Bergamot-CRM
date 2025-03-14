require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Adatbázis kapcsolat
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT
  }
);

// Teszteljük az adatbázis kapcsolatot
sequelize
  .authenticate()
  .then(() => console.log("✅ Sikeres adatbázis kapcsolat!"))
  .catch((err) => console.error("❌ Adatbázis hiba:", err));

// Route-ok importálása
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Szerver indítása
app.listen(PORT, () => console.log(`🚀 Szerver fut: http://localhost:${PORT}`));


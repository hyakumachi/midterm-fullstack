const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root@@",
  database: process.env.DB_NAME || "itelective",
  waitForConnections: true,
  connectionLimit: 5,
});

// Ensure table exists
pool.query(
  `CREATE TABLE IF NOT EXISTS dog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dogname VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    subreed VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) {
      console.error("Failed to create dog table", err);
    } else {
      console.log("Table is ready.");
    }
  }
);


// 1. Get random dog image
app.get("/dog/random", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch random dog" });
  }
});

// 2. Get multiple random dog images
app.get("/dog/random/:count", async (req, res) => {
  const { count } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breeds/image/random/${count}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch multiple dogs" });
  }
});

// 3. Get all breeds list
app.get("/dog/breeds/all", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch breeds list" });
  }
});

// 4. Get images by specific breed
app.get("/dog/breed/:breed", async (req, res) => {
  const { breed } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch breed images" });
  }
});

// 5. Get sub-breeds list for a specific breed
app.get("/dog/breed/:breed/list", async (req, res) => {
  const { breed } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${encodeURIComponent(breed)}/list`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sub-breeds" });
  }
});

// 6. Get images by breed and sub-breed
app.get("/dog/breed/:breed/:subbreed", async (req, res) => {
  const { breed, subbreed } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${encodeURIComponent(
        breed
      )}/${encodeURIComponent(subbreed)}/images`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sub-breed images" });
  }
});

// Save a dog record
app.post("/dog/save", (req, res) => {
  const { dogname, breed, subreed } = req.body;
  if (!dogname || !breed) {
    return res.status(400).json({ error: "dogname and breed are required" });
  }
  const sql = `INSERT INTO dog (dogname, breed, subreed) VALUES (?, ?, ?)`;
  pool.query(sql, [dogname, breed, subreed || null], (err, result) => {
    if (err) {
      console.error("Insert failed", err);
      return res.status(500).json({ error: "DB insert failed" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Get all dog records when loading pge
app.get("/dog/all", (req, res) => {
  pool.query("SELECT * FROM dog ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      console.error("Select failed", err);
      return res.status(500).json({ error: "DB fetch failed" });
    }
    res.json({ success: true, data: rows });
  });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  database: process.env.DB_NAME || "platformdb",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD
});

app.get("/", (req, res) => {
  res.json({
    application: "Platform Engineering POC",
    service: "backend",
    status: "running"
  });
});

app.get("/db-health", async (req, res) => {

  try {

    const result = await pool.query("SELECT NOW()");

    res.json({
      database: "connected",
      time: result.rows[0].now
    });

  } catch (error) {

    res.status(500).json({
      database: "failed",
      error: error.message
    });

  }

});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
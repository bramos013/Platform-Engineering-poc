const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    application: "Platform Engineering POC",
    service: "backend",
    status: "running"
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
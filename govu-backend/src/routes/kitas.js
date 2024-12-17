const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Endpoint to Serve GeoJSON Data
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/kitas_ms.geojson");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading GeoJSON file:", err);
      return res.status(500).json({ error: "Failed to load data." });
    }

    console.log("GeoJSON data sent successfully.");
    res.status(200).json(JSON.parse(data));
  });
});

module.exports = router;

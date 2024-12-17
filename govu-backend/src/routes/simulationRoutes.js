const express = require("express");
const router = express.Router();

// Controller importieren
const { simulateCoverage } = require("../controllers/simulationController");

// Simulationsroute definieren
router.post("/", simulateCoverage);

module.exports = router;

// Beispielhafte Simulationslogik
function simulateCoverage(req, res) {
  const {
    population,
    capacityPerFacility,
    existingFacilities,
    newFacilities,
  } = req.body;

  // Simulationsberechnung
  const totalCapacity =
    (existingFacilities + newFacilities) * capacityPerFacility;
  const coverage = Math.min(100, (totalCapacity / population) * 100);
  const neededFacilities = Math.max(
    0,
    Math.ceil((population - totalCapacity) / capacityPerFacility)
  );

  res.status(200).json({
    coverage: coverage.toFixed(2),
    neededFacilities,
    totalCapacity,
  });
}

module.exports = { simulateCoverage };

import React, { useState } from "react";
import axios from "axios";
import Map from "./components/Map";

function App() {
  const [result, setResult] = useState(null);
  const [newFacilities, setNewFacilities] = useState(0);

  // Simulation Function
  const startSimulation = async () => {
    const simulationData = {
      population: 2000,
      capacityPerFacility: 80,
      existingFacilities: 3,
      newFacilities,
    };

    try {
      const response = await axios.post("http://localhost:5001/api/simulate", simulationData);
      setResult(response.data);
    } catch (error) {
      console.error("Error running simulation:", error);
    }
  };

  return (
    <div className="App">
      <h1>Govu - Simulation Dashboard</h1>

      <Map />

      <div style={{ marginTop: "20px" }}>
        <h2>Simulation Control</h2>
        <label>
          New Facilities:{" "}
          <input
            type="number"
            value={newFacilities}
            onChange={(e) => setNewFacilities(Number(e.target.value))}
            placeholder="Number of Facilities"
          />
        </label>
        <button onClick={startSimulation}>Run Simulation</button>
      </div>

      {result && (
        <div>
          <h2>Simulation Result</h2>
          <p><strong>Coverage:</strong> {result.coverage}%</p>
          <p><strong>Needed Facilities:</strong> {result.neededFacilities}</p>
          <p><strong>Total Capacity:</strong> {result.totalCapacity}</p>
        </div>
      )}
    </div>
  );
}

export default App;

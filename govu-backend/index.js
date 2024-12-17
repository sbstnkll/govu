const express = require("express");
const cors = require("cors");
const simulationRoutes = require("./src/routes/simulationRoutes");
const kitasRoute = require("./src//routes/kitas");

const app = express();
const PORT = 5001;

// Enable CORS
app.use(cors());

// Use JSON Middleware
app.use(express.json());

// Register API Routes
app.use("/api/simulate", simulationRoutes);
app.use("/api/kitas", kitasRoute);

// Start the Server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

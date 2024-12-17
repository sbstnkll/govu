import axios from "axios";

// Backend-API-URL
const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const runSimulation = (data) => API.post("/simulate", data);

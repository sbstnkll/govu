import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

function Map() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://demotiles.maplibre.org/style.json",
      center: [7.6257, 51.9607], // Münster coordinates
      zoom: 14,
    });

    map.on("load", async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/kitas");

        // Add Kita Data as GeoJSON
        map.addSource("kitas", {
          type: "geojson",
          data: response.data,
        });

        map.addLayer({
          id: "kita-layer",
          type: "circle",
          source: "kitas",
          paint: {
            "circle-radius": 8,
            "circle-color": "#FF5722",  // Kita Highlight Color
            "circle-stroke-width": 2,
            "circle-stroke-color": "#FFFFFF",
          },
        });

        // Popups for Kitas
        map.on("click", "kita-layer", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { name, capacity } = e.features[0].properties;

          new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<strong>${name}</strong><br>Capacity: ${capacity}`)
            .addTo(map);
        });

        // Cursor Interaction
        map.on("mouseenter", "kita-layer", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "kita-layer", () => {
          map.getCanvas().style.cursor = "";
        });
      } catch (error) {
        console.error("Error loading Kita data:", error);
      }
    });

    return () => map.remove();  // Clean up on unmount
  }, []);

  return <div id="map" style={{ width: "100%", height: "600px" }}></div>;
}

export default Map;

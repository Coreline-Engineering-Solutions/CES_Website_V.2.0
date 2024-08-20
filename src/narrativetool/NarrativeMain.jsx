import React, { useState, useCallback } from "react";
import MapToolbar from "./MapToolbar";
import Narrative from "./Narrative";
import ProjectMain from "./ProjectMain";
import { TILE_LAYERS } from "./map_tile_provider";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function NarrativeMain() {
  const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
  const [projectLines, setProjectLines] = useState({});
  const [currentTileLayer, setCurrentTileLayer] = useState(
    TILE_LAYERS.OpenStreetMapUK
  );
  const [coordinates, setCoordinates] = useState([]); // State to hold coordinates
  const [glowingLineIndex, setGlowingLineIndex] = useState(null); // State to track the glowing line index
  const UserLocation = useLocation();
  const username = UserLocation.state?.username || "";
  const [selectedProject, setSelectedProject] = useState("");
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);

  const parseCoordinates = (lineAsText) => {
    try {
      if (!lineAsText) {
        throw new Error("Line text is null or undefined");
      }
      let parsed;
      if (typeof lineAsText === "string") {
        try {
          parsed = JSON.parse(lineAsText);
        } catch (jsonError) {
          throw new Error("Line text is not a valid JSON string");
        }
      } else {
        parsed = lineAsText;
      }

      if (!Array.isArray(parsed)) {
        throw new Error("Parsed line text is not an array");
      }

      return parsed.map((coord) => ({
        lat: coord.lat || coord.latitude,
        lng: coord.lng || coord.longitude,
      }));
    } catch (error) {
      return [];
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.post(
        "https://www.corelineengineering.com/php/nar_l_checks.php",
        {
          USERNAME: username,
          PROJECT: selectedProject,
        }
      );
      if (Array.isArray(response.data)) {
        const fetchedLines = response.data.map((line) => ({
          ...line,
          coordinates: parseCoordinates(line.line_as_text),
        }));

        setProjectLines((prevLines) => ({
          ...prevLines,
          [selectedProject]: fetchedLines,
        }));

        const coordinates = fetchedLines.map((line) => line.coordinates || []);
        setCoordinates(coordinates);
      } else {
        console.error(
          "Fetched data is not in the expected format:",
          response.data
        );
        toast.error("Fetched data is not in the expected format.", {
          toastId: "fetchDataFormatError",
        });
      }
    } catch (error) {
      console.error("Error caught when fetching data:", error);
      toast.error("Error caught when fetching data", {
        toastId: "fetchDataError",
      });
    }
  };

  const handleAddNewLine = useCallback(
    async (newLine) => {
      const currentProject = selectedProject;
      setIsDrawingEnabled(true);
      if (!currentProject) {
        toast.error("No project selected.");
        return;
      }

      const { coordinates } = newLine;
      const TIMESTAMP = new Date().toISOString();

      try {
        const response = await axios.post(
          "https://www.corelineengineering.com/php/add_narline.php",
          {
            user_name: username,
            project: currentProject,
            line_data: coordinates,
            TIMESTAMP,
          }
        );

        if (response.data === "_S") {
          handleFetchData();
          setProjectLines((prevLines) => ({
            ...prevLines,
            [currentProject]: [
              ...(prevLines[currentProject] || []),
              { coordinates, TIMESTAMP, status: "Submitted" },
            ],
          }));
          setCoordinates((prevCoordinates) => [
            ...prevCoordinates,
            coordinates,
          ]);
        }
      } catch (error) {
        toast.error("Error caught when submitting line");
      }
    },
    [username, selectedProject]
  );

  return (
    <main id="narrativemain" className="overflow-hidden h-screen pt-20">
      <MapToolbar
        className="fixed top-0 left-0 right-0 z-50"
        _USERNAME={username}
        onTileLayerChange={setCurrentTileLayer}
      />
      <div className="flex h-full">
        <ProjectMain
          className="w-1/3 h-full p-4"
          setSelectedProject={setSelectedProject}
          selectedProject={selectedProject}
          projectLines={projectLines}
          setCoordinates={setCoordinates}
          handleFetchData={handleFetchData}
        />
        <Narrative
          projectLines={projectLines}
          coordinates={coordinates}
          glowingLineIndex={glowingLineIndex}
          setGlowingLineIndex={setGlowingLineIndex}
          handleAddNewLine={handleAddNewLine}
          isDrawingEnabled={isDrawingEnabled} // Add this prop

        />
      </div>
    </main>
  );
}

export default NarrativeMain;

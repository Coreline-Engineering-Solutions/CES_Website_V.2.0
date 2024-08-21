import React, { useRef, useState, useCallback, useEffect } from "react";
import MapToolbar from "./MapToolbar";
import Narrative from "./Narrative";
import ProjectMain from "./ProjectMain";
import { TILE_LAYERS } from "./map_tile_provider";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { geolocation } from '../hooks';


function NarrativeMain() {
	const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
	const [projectLines, setProjectLines] = useState({});
	const [currentTileLayer, setCurrentTileLayer] = useState(
		TILE_LAYERS.OpenStreetMapUK
	);
	const _ZOOM_LEVEL = 18;
	const mapRef = useRef();
	const [coordinates, setCoordinates] = useState([]); // State to hold coordinates
	const [glowingLineIndex, setGlowingLineIndex] = useState(null); // State to track the glowing line index
	const UserLocation = useLocation();
	const username = UserLocation.state?.username || "";
	const [selectedProject, setSelectedProject] = useState("");
	const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
	const [locateType, setLocateType] = useState(""); // Use an empty string or null if preferred
	const [lineName, setLineName] = useState("");
	const location = geolocation(); // Use the geolocation hook
	const [showPins, setShowPins] = useState(true);

	const locateTypeRef = useRef(locateType);
	const lineNameRef = useRef(lineName);
  
	useEffect(() => {
	  locateTypeRef.current = locateType;
	}, [locateType]);
  
	useEffect(() => {
	  lineNameRef.current = lineName;
	}, [lineName]);
	

	const LocateLine = (lineCoordinates, index) => {
		if (lineCoordinates.length > 0) {
			const map = mapRef.current;
			if (map) {
				const midpoint = lineCoordinates.reduce((acc, coord) => {
					acc.lat += coord.lat;
					acc.lng += coord.lng;
					return acc;
				}, { lat: 0, lng: 0 });

				midpoint.lat /= lineCoordinates.length;
				midpoint.lng /= lineCoordinates.length;

				map.flyTo([midpoint.lat, midpoint.lng], _ZOOM_LEVEL, { animate: true });
				setGlowingLineIndex(index);
			}
		} else {
			toast.error("No line coordinates available.");
		}
	};

	const handleShowLocation = () => {
		const map = mapRef.current;
	
		if (map) {
			if (location.loaded && location.coordinates.lat && location.coordinates.lng) {
				// Remove existing marker if it exists and showPins is false
				if (map.currentLocationMarker && !showPins) {
					map.removeLayer(map.currentLocationMarker);
					map.currentLocationMarker = null;
				}
	
				// Add or keep marker based on showPins state
				if (showPins) {
					if (map.currentLocationMarker) {
						// Update existing marker position if it already exists
						map.currentLocationMarker.setLatLng([location.coordinates.lat, location.coordinates.lng]);
					} else {
						// Add a new marker if it does not exist
						map.currentLocationMarker = L.marker([location.coordinates.lat, location.coordinates.lng]).addTo(map);
					}
					
					map.flyTo([location.coordinates.lat, location.coordinates.lng], 18, { animate: true });
				}
			} else if (!location.loaded || !location.coordinates.lat || !location.coordinates.lng) {
				toast.error(location.error ? location.error.message : "Location not available");
			}
		}
	};
	
	

	useEffect(() => {
		if (selectedProject) {
			setIsDrawingEnabled(true);
		} else {
			setIsDrawingEnabled(false);
		}

	}, [selectedProject]);



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

	const handleAddNewLine = async (newLine) => {
		const { coordinates } = newLine;
		const TIMESTAMP = new Date().toISOString();
		const currentProject = selectedProject;
	
    // Capture latest state values using refs
    const latestLocateType = locateTypeRef.current;
    const latestLineName = lineNameRef.current;

		setIsDrawingEnabled(true);
	
		if (!currentProject) {
			toast.error("No project selected.");
			return;
		}
	
		try {
			const response = await axios.post(
				"https://www.corelineengineering.com/php/add_narline.php",
				{
					user_name: username,
					project: currentProject,
					line_data: coordinates,
					TIMESTAMP: TIMESTAMP,
					LOCATE_TYPE: latestLocateType,
					LINE_NAME: latestLineName,
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
	};
	

	return (
		<main id="narrativemain" className="overflow-hidden h-screen ">
			<MapToolbar
				className="fixed top-0 left-0 right-0 z-50"
				_USERNAME={username}
				onTileLayerChange={setCurrentTileLayer}
				onShowLocation={handleShowLocation}
				setShowPins={setShowPins}  

			/>
			<div className="flex h-full z-10 ">
				<ProjectMain
					className="w-1/3 h-full"
					setSelectedProject={setSelectedProject}
					selectedProject={selectedProject}
					projectLines={projectLines}
					setCoordinates={setCoordinates}
					handleFetchData={handleFetchData}
					setLocateType={setLocateType}
					setLineName={setLineName}
					LocateLine={LocateLine} 
					lineName={lineName}
					locateType={locateType}
					setShowPins={setShowPins}      // Pass setLineName to update state
				/>
				<Narrative className="h-full "
					projectLines={projectLines}
					coordinates={coordinates}
					glowingLineIndex={glowingLineIndex}
					setGlowingLineIndex={setGlowingLineIndex}
					handleAddNewLine={handleAddNewLine}
					isDrawingEnabled={isDrawingEnabled}
					mapRef={mapRef} // Add this prop
					tileLayer={currentTileLayer}  // Pass the current tile layer to Narrative
					showPins={showPins}

				/>
			</div>

		</main>
	);
}

export default NarrativeMain;

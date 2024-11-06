import React, { useRef, useState, useCallback, useEffect } from "react";
import MapToolbar from "./MapToolbar";
import Narrative from "./Narrative";
import ProjectMain from "./ProjectMain";
import { TILE_LAYERS } from "./map_tile_provider";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { geolocation } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { pindrop, pindropRed,markerBlue,markerOrange,markerRed } from '../assets/icons';



function NarrativeMain() {
	const [projectLines, setProjectLines] 			= useState({});
	const [currentTileLayer, setCurrentTileLayer] 	= useState(
		TILE_LAYERS.OpenStreetMapUK
	);
	const [coordinates, setCoordinates] 			= useState([]); // State to hold coordinates
	const [coordinatesPoints, setPointCoordinates] 			= useState([]); // State to hold coordinates
	const [pointCoordinates, setNarrativePoints] 			= useState([]); // State to hold coordinates
	const [glowingLineIndex, setGlowingLineIndex] 	= useState(null); // State to track the glowing line index
	const [selectedProject, setSelectedProject] 	= useState("");
	const [isDrawingEnabled, setIsDrawingEnabled] 	= useState(false);
	const [locateType, setLocateType] 				= useState(""); // Use an empty string or null if preferred
	const [lineName, setLineName] 					= useState("");
	const [showPins, setShowPins] 					= useState(true);
	const [lineLength, setLineLength] 				= useState("");
	const [workPrints, setWorkPrint] 				= useState("");
	const [options, onSelectedOptionChange] 		= useState("");
	const [pointData, setPointData] 				= useState({
		pointName: "",
		workPrintPoint: "",
		radius: "",
		locationDirection: "",
		pointType:"",
		pointNote:"",
	});

	const location 									= geolocation(); // Use the geolocation hook
	const _ZOOM_LEVEL 								= 18;
	const UserLocation 								= useLocation();
	const username 									= UserLocation.state?.username || "";
	const navigate 									= useNavigate();
	const [toggles, onToggleChange] 				= useState({
		Note_intersection_at_start: false,
		Note_intersection_at_end: false,
		Note_address_at_start: false,
		Note_address_at_end: false,
		Include_GPS_at_start: false,
		Include_GPS_at_end: false,
		Include_GPS_at_bearing: false,
	});
	const pointDataRef 								= useRef(pointData)
	const togglesRef 								= useRef(toggles);
	const workPrintsRef								= useRef(workPrints);
	const locateTypeRef 							= useRef(locateType);
	const lineNameRef 								= useRef(lineName);
	const lineLengthRef 							= useRef(lineLength);
	const mapRef 									= useRef();
	const selectedProjectRef 						= useRef(selectedProject);
	const latestShowPinsRef 						= useRef(showPins);
	const latestOption								=useRef(options)


	// Sync selectedProject state with the ref
	useEffect(() => {
		workPrintsRef.current = workPrints;
	}, [workPrints]);

	useEffect(() => {
		togglesRef.current = toggles;
	}, [toggles]);
	useEffect(() => {
		latestShowPinsRef.current = showPins;
	}, [showPins]);

	useEffect(() => {
		if (selectedProject !== "") {
			setIsDrawingEnabled(true);
		} else {
			setIsDrawingEnabled(false);
		}
		selectedProjectRef.current = selectedProject;
		return;
	}, [selectedProject]);

	useEffect(() => {
		locateTypeRef.current = locateType;
	}, [locateType]);
	
	useEffect(() => {
		lineNameRef.current = lineName;
	}, [lineName]);

	useEffect(() => {
		lineLengthRef.current = lineLength;
	}, [lineLength]);
	useEffect(() => {
		pointDataRef.current = pointData; // Sync ref with pointData state
	  }, [pointData]);

	useEffect(() => {
		if (!username) {
			navigate('/Login'); // Redirect to the login page if _USERNAME is empty
		}
		return;
	}, [username]);

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
			toast.error("No line coordinates available.", { toastId: 'locateLineError', containerId: 'narrativeMain-toast-container' });
		}
	};

	const LocatePoint = (pointCoordinates, index) => {
		if (pointCoordinates.length > 0) {
			const map = mapRef.current;
			if (map) {
				const midpoint = pointCoordinates.reduce((acc, coord) => {
					acc.lat += coord.lat;
					acc.lng += coord.lng;
					return acc;
				}, { lat: 0, lng: 0 });

				midpoint.lat /= pointCoordinates.length;
				midpoint.lng /= pointCoordinates.length;

				map.flyTo([midpoint.lat, midpoint.lng], _ZOOM_LEVEL, { animate: true });
				setGlowingLineIndex(index);
			}
		} else {
			toast.error("No line coordinates available.", { toastId: 'locateLineError', containerId: 'narrativeMain-toast-container' });
		}
	};


	const handleShowLocation = () => {
		const map = mapRef.current;
	
		if (map) {
			if (location.loaded && location.coordinates.lat && location.coordinates.lng) {
				// Always move the map to the user's location
				map.flyTo([location.coordinates.lat, location.coordinates.lng], 18, { animate: true });
	
				// Define your custom icon here (you can reuse getCustomIcon or create another one for the location marker)
				const customLocationIcon = L.icon({
					iconUrl: markerRed, // Replace with your custom icon URL
					iconSize: [40, 40], // Adjust the size as needed
					iconAnchor: [17.5, 35], // Anchor to the bottom center
				});
	
				// Create or update the current location marker with the custom icon
				if (!map.currentLocationMarker) {
					map.currentLocationMarker = L.marker([location.coordinates.lat, location.coordinates.lng], {
						icon: customLocationIcon // Use the custom icon here
					}).addTo(map);
				} else {
					map.currentLocationMarker.setLatLng([location.coordinates.lat, location.coordinates.lng]);
					map.currentLocationMarker.setIcon(customLocationIcon); // Ensure the icon is updated
				}
			} else {
				toast.error(location.error ? location.error.message : "Location not available", {
					toastId: 'locateLineNotAvailableError',
					containerId: 'narrativeMain-toast-container'
				});
			}
		}
	};

	const parseCoordinates = (text) => {
		try {
			if (!text) {
				throw new Error("Text is null or undefined");
			}
			let parsed;
			if (typeof text === "string") {
				try {
					parsed = JSON.parse(text);
				} catch (jsonError) {
					throw new Error("Text is not a valid JSON string");
				}
			} else {
				parsed = text;
			}
	
			// Check if it's a single coordinate object (e.g., for a point)
			if (parsed.lat !== undefined && parsed.lng !== undefined) {
				return [{ lat: parsed.lat || parsed.latitude, lng: parsed.lng || parsed.longitude }];
			}
	
			// Check if it's an array of coordinates (e.g., for lines)
			if (Array.isArray(parsed)) {
				return parsed.map((coord) => ({
					lat: coord.lat || coord.latitude,
					lng: coord.lng || coord.longitude,
				}));
			}
	
			throw new Error("Parsed text is neither a single coordinate nor an array");
		} catch (error) {
			toast.error("Error parsing coordinates:", error.message);
			return [];
		}
	};
	
	const handleFetchData = async () => {
		const currentProject = selectedProjectRef.current;  // Use ref to get the latest project
	
		try {
				const response = await axios.post(
				"https://www.corelineengineering.com/php/nar_l_checks.php",
				{
					USERNAME: username,
					PROJECT: currentProject,
				}
			);
	
			if (Array.isArray(response.data)) {
				const fetchedLines = response.data.map((line) => ({
					...line,
					coordinates: parseCoordinates(line.line_as_text),
				}));
	
				setProjectLines((prevLines) => ({
					...prevLines,
					[currentProject]: fetchedLines,
				}));
	
				const coordinates = fetchedLines.map((line) => ({
					type: line.type || 'line',  // Default to 'line', but handle 'point' later
					coordinates: line.coordinates || [],
				}));
				setCoordinates(coordinates);
	
				return fetchedLines;  // Return the fetched lines
			} else {
				toast.error("Fetched data is not in the expected format.", {
					toastId: "fetchDataFormatError",
					containerId: 'narrativeMain-toast-container'
				});
				return [];  // Return an empty array to prevent undefined
			}
		} catch (error) {
			toast.error("Error caught when fetching data", {
				toastId: "fetchDataError",
				containerId: 'narrativeMain-toast-container'
			});
			return [];  // Return an empty array in case of error
		}
	};
	const handleFetchPointData = async () => {
		const currentProject = selectedProjectRef.current;
	
		try {

			const response = await axios.post(
				"https://www.corelineengineering.com/php/nar_p_checks.php",
				{
					USERNAME: username,
					PROJECT: currentProject,
				}
			);
			if (Array.isArray(response.data)) {
				const parsedPoints = response.data
					.filter((point) => point.timestamp && point.timestamp !== "" && point.timestamp !== null)
					.map((point) => ({
						...point,
						coordinates: parseCoordinates(point.point_as_text),
					}));
	
				setNarrativePoints((prevPoints) => ({
					...prevPoints,
					[currentProject]: parsedPoints, // Update state by project
				}));
	
				const coordinates = parsedPoints.map((point) => ({
					type: 'point',
					coordinates: point.coordinates || [],
				}));
	
				setPointCoordinates(coordinates);
	
				return parsedPoints;  // Return the parsed points
			} else {
				toast.error("Fetched data is not in the expected format.", {
					toastId: "fetchDataFormatError",
					containerId: "narrativeMain-toast-container",
				});
				return [];  // Return an empty array to prevent undefined
			}
		} catch (error) {
			toast.error("Error caught when fetching point data", {
				toastId: "fetchDataError",
				containerId: "narrativeMain-toast-container",
			});
			return [];  // Return an empty array in case of error
		}
	};
	

	const handleFetchPointAddress = async (newPoint) => {
		const { coordinates } = newPoint;

		try {
			const [LAT, LON] = coordinates;
			
			const response = await axios.post(
				"https://www.corelineengineering.com/php/addr_list_fetch.php",
				{ LAT, LON }
			);

			if (Array.isArray(response.data)) {
				return response.data; // Return the fetched data instead of setting it in state
			} else {
				toast.error("Fetched data is not in the expected format.", {
					toastId: "fetchDataFormatError",
					containerId: 'narrativeMain-toast-container'
				});
			}
		} catch (error) {
			toast.error("Error caught when fetching address data", {
				toastId: "fetchDataError",
				containerId: 'narrativeMain-toast-container'
			});
		}
	};

	const handleAddNewPoint = async (newPoint, selectedOption) => {
		const { coordinates } = newPoint;
		const TIMESTAMP = new Date().toISOString();
		const currentProject = selectedProjectRef.current;  // Use ref to get the latest project
		const latestPointData = pointDataRef.current;  // Access toggles from the ref
		const address = selectedOption;

		setIsDrawingEnabled(true);

		if (!currentProject) {
			toast.error("No project selected.");
			return;
		}
		try {
			// Assuming coordinates is an array [LAT, LON]

			const response = await axios.post(
				"https://www.corelineengineering.com/php/add_narpoint.php",
				{
					USER_NAME: username,
					JOB_REFERENCE: currentProject, // Use ref here as well
					TIMESTAMP: TIMESTAMP,
					// inputs
					ADDRESS: address,
					POINT_DATA: coordinates,
					POINT_NAME: latestPointData.pointName,
					WORK_PRINTS: latestPointData.workPrintPoint,
					NARRATIVE_RADIUS: latestPointData.radius,
					NARRATIVE_SUFFIX: latestPointData.pointNote,
					POINT_TYPE: latestPointData.pointType,
					BEARING: latestPointData.locationDirection
					


				}
			);

			if (response.data === "_S") {
				handleFetchData();  // Ensure fetching is for the current project
				handleFetchPointData();
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
				toast.success("Point created successfully", {
					containerId: "pointCreateToastContainer",
				});
			}
		} catch (error) {
			toast.error("Error caught when submitting point", { toastId: "submitLineError", containerId: 'narrativeMain-toast-container' });
		}
	};


	const handleAddNewLine = async (newLine) => {
		const { coordinates } = newLine;
		const TIMESTAMP = new Date().toISOString();
		const currentProject = selectedProjectRef.current;  // Use ref to get the latest project

		// Capture latest state values using refs
		const latestLocateType = locateTypeRef.current;
		const latestLineName = lineNameRef.current;
		const latestLineLength = lineLengthRef.current;
		const latestToggles = togglesRef.current;  // Access toggles from the ref
		const latestWorkPrints = workPrintsRef.current; // Access workPrints from the ref

		if (!currentProject) {
			toast.error("No project selected.");
			return;
		}

		try {
			const response = await axios.post(
				"https://www.corelineengineering.com/php/add_narline.php",
				{
					USER_NAME: username,
					PROJECT: currentProject,  // Use ref here as well
					LINE_DATA: coordinates,
					TIMESTAMP: TIMESTAMP,
					LOCATE_TYPE: latestLocateType,
					LINE_NAME: latestLineName,
					LINE_LENGTH: latestLineLength,
					NOTE_DISTANCE_FROM_START_INTERSECTION: latestToggles.Note_distance_from_start_intersection,
					NOTE_DISTANCE_FROM_END_INTERSECTION: latestToggles.Note_distance_from_end_intersection,
					NOTE_ADDRESS_AT_START: latestToggles.Note_address_at_start,
					NOTE_ADDRESS_AT_END: latestToggles.Note_address_at_end,
					INCLUDE_GPS_AT_START: latestToggles.Include_GPS_at_start,
					INCLUDE_GPS_AT_END: latestToggles.Include_GPS_at_end,
					INCLUDE_GPS_AT_BEARING: latestToggles.Include_GPS_at_bearing,
					SPLIT_ON_MAX_LENGTH: latestToggles.Split_on_max_length,
					WORK_PRINTS: latestWorkPrints,
				}
			);

			if (response.data === "_S") {
				handleFetchData();  // Ensure fetching is for the current project
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
			toast.error("Error caught when submitting line", { toastId: "submitLineError", containerId: 'narrativeMain-toast-container' });
		}
	};


	return (
		<main id="NarrativeMain" className="overflow-hidden h-screen ">
			<MapToolbar
				className="fixed top-0 left-0 right-0 z-50"
				_USERNAME=					{username}
				onTileLayerChange=			{setCurrentTileLayer}
				onShowLocation=				{handleShowLocation}
				setShowPins=				{setShowPins}
				showPins=					{showPins}

			/>
			<div className="flex h-full z-10 ">
				<ProjectMain
					className="w-1/3 h-full"
					setSelectedProject=		{setSelectedProject}
					selectedProject=		{selectedProject}
					projectLines=			{projectLines}
					pointCoordinates =		{pointCoordinates}
					setCoordinates=			{setCoordinates}
					setNarrativePoints=     {setNarrativePoints}
					handleFetchData=		{handleFetchData}
					setLocateType=			{setLocateType}
					setLineName=			{setLineName}
					LocateLine=				{LocateLine}
					LocatePoint =			{LocatePoint}
					lineName=				{lineName}
					locateType=				{locateType}
					setLineLength=			{setLineLength}
					lineLength=				{lineLength}
					setShowPins=			{setShowPins}
					onToggleChange=			{onToggleChange}      // Pass setLineName to update state
					onSelectedOptionChange=	{onSelectedOptionChange}
					setWorkPrint=			{setWorkPrint}
					toggles=				{toggles}
					options=				{options}
					workPrints=				{workPrints}
					setPointData=			{setPointData}
					pointData=				{pointData}
					handleFetchPointData = {handleFetchPointData}
				/>
				<Narrative className="h-full "
					projectLines=			{projectLines}
					coordinatesPoints=      {coordinatesPoints}
					coordinates=			{coordinates}
					glowingLineIndex=		{glowingLineIndex}
					setGlowingLineIndex=	{setGlowingLineIndex}
					handleAddNewLine=		{handleAddNewLine}
					isDrawingEnabled=		{isDrawingEnabled}
					mapRef=					{mapRef} // Add this prop
					tileLayer=				{currentTileLayer}  // Pass the current tile layer to Narrative
					showPins=				{showPins}
					lineLength=				{lineLength} // Pass the lineLength to Narrative
					options=				{options}
					LocateLine=				{LocateLine}
					handleAddNewPoint=		{handleAddNewPoint}
					handleFetchPointAddress=   {handleFetchPointAddress}
					pindrops=				{showPins}
					handleFetchPointData = {handleFetchPointData}
					handleFetchData=		{handleFetchData}

				/>
			</div>
			<ToastContainer containerId="narrativeMain-toast-container" autoClose={3000} />
		</main>
	);
}

export default NarrativeMain;

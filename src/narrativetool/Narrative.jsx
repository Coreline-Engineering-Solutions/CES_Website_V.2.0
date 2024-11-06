import { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polyline, Marker, Popup, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search';
import { pindrop, pindropRed, markerBlue, markerOrange, markerRed } from '../assets/icons';

// Utility function to convert degrees to radians
const toRadians = (degrees) => degrees * (Math.PI / 180);

// Utility function to calculate distance between two lat/lng points in meters
const calculateDistanceInMeters = (latlng1, latlng2) => {
	const R = 6371000; // Earth radius in meters
	const dLat = toRadians(latlng2.lat - latlng1.lat);
	const dLng = toRadians(latlng2.lng - latlng1.lng);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(latlng1.lat)) * Math.cos(toRadians(latlng2.lat)) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in meters
	return distance;
};

// Utility function to convert meters to feet
const metersToFeet = (meters) => meters * 3.28084;

const Narrative = ({
	handleAddNewLine,
	coordinates = [], // Default to an empty array
	coordinatesPoints = [],
	glowingLineIndex,
	isDrawingEnabled,
	mapRef,
	tileLayer,
	showPins,
	lineLength,
	options,
	handleAddNewPoint,
	handleFetchPointAddress,
	handleFetchData,
	handleFetchPointData
}) => {
	const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
	const _ZOOM_LEVEL = 18;
	const lineLengthRef = useRef(lineLength);
	const coordinatesRef = useRef(coordinatesPoints);
	const [currentLength, setCurrentLength] = useState(null); // State to track current length in feet
	const [popupData, setPopupData] = useState([]); // State for popup data
	const [selectedPoint, setSelectedPoint] = useState(null);
	const [selectedOption, setSelectedOption] = useState("");
	const [newMarkers, setNewMarkers] = useState([]); // Store newly placed markers

	useEffect(() => {
		lineLengthRef.current = lineLength;
	}, [lineLength]);

	useEffect(() => {
		handleFetchData();
		handleFetchPointData();
	}, []);


	const calculatePolylineLengthInFeet = (latlngs) => {
		let totalLengthInMeters = 0;
		for (let i = 0; i < latlngs.length - 1; i++) {
			totalLengthInMeters += calculateDistanceInMeters(latlngs[i], latlngs[i + 1]);
		}
		return metersToFeet(totalLengthInMeters);
	};

	const handleDropdownSelect = (value, markerToRemove) => {
		setSelectedOption(value);
		if (selectedPoint && value) {
			const newPoint = {
				coordinates: selectedPoint,
				option: value,
			};
			handleAddNewPoint(newPoint, value);

			// Remove the marker from the newMarkers array
			setNewMarkers((prevMarkers) =>
				prevMarkers.filter((marker) => marker.coordinates !== markerToRemove)
			);
		}
	};
	const _created = async (e) => {
		if (e.layerType === 'polyline') {
			const { _latlngs } = e.layer;
			const latestLineLength = lineLengthRef.current;

			const drawnLineLengthInFeet = calculatePolylineLengthInFeet(_latlngs);

			if (latestLineLength && drawnLineLengthInFeet > latestLineLength) {
				toast.error(`Line length exceeds the maximum allowed length of ${latestLineLength} feet.`, { containerId: 'narrative-toast-container' });
				e.layer.remove(); // Remove the line from the map
			} else {
				handleAddNewLine({ coordinates: _latlngs, length: drawnLineLengthInFeet });
			}
		} else if (e.layerType === 'marker') {
			const pointCoordinates = e.layer.getLatLng();
			setSelectedPoint(pointCoordinates);

			// Fetch popup data (address, etc.)
			const data = await handleFetchPointAddress({ coordinates: [pointCoordinates.lat, pointCoordinates.lng] });
			if (data) {
				setPopupData(data);
				setNewMarkers((prevMarkers) => [
					...prevMarkers,
					{ coordinates: pointCoordinates, popupData: data },
				]);
			}

			// Set the marker to use your custom pindrop icon
			e.layer.setIcon(getCustomIcon(false)); // This ensures your custom icon is used
		}
	};

	const _onDrawUpdate = (e) => {
		if (e.layerType === 'polyline') {
			const { _latlngs, _tooltip } = e.layer;
			const drawnLineLengthInFeet = calculatePolylineLengthInFeet(_latlngs);

			setCurrentLength(drawnLineLengthInFeet);

			if (_tooltip) {
				const tooltipContent = `${drawnLineLengthInFeet.toFixed(2)} ft. Click to continue drawing line.`;
				_tooltip.updateContent({ text: tooltipContent });
			}
		}
	};
	;
	const filteredLines = Array.isArray(coordinates) && options === 'lines'
		? coordinates.filter(item => item.type === 'line')
		: [];

	const filteredPoints = Array.isArray(coordinatesPoints) && options === 'points'
		? coordinatesPoints.filter(item => item.type === 'point')
		: [];

	const getCustomIcon = (isGlowing) => {
		const iconUrl = isGlowing ? markerRed : markerBlue; // Use your custom icons

		return L.icon({
			iconUrl: iconUrl, // Use the appropriate icon (glowing or not)
			iconSize: [35, 35], // Adjust the size as needed
			iconAnchor: [17.5, 35], // Anchor to the bottom center
		});
	};

	return (
		<div id="narrative" className="h-screen pt-14">
			<MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="h-full z-10">
				<Search enablePinDrops={showPins} />
				{isDrawingEnabled && (
					<FeatureGroup>
						<EditControl
							position="topleft"
							onCreated={_created}
							onDrawUpdate={_onDrawUpdate}
							draw={{
								rectangle: false,
								circle: false,
								circlemarker: false,
								marker: options === 'points' ? { icon: getCustomIcon(false) } : false, // Enable marker if 'points' option
								polygon: false,
								polyline: options === 'lines' ? { metric: false, feet: true } : false,
							}}
							edit={{
								edit: false,
								remove: false,
							}}
						/>
					</FeatureGroup>
				)}
				<TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />

				{options === 'points' && (
					<LayerGroup>
						{newMarkers.length > 0 ? (
							newMarkers.map((marker, index) => (
								<Marker
									key={`${marker.coordinates.lat}-${marker.coordinates.lng}-${index}`}
									position={marker.coordinates}
									icon={getCustomIcon(false)}  // Use your custom icon here
								>
									<Popup>
										<div>
											<h3>Select an Option</h3>
											<select onChange={(e) => handleDropdownSelect(e.target.value, marker.coordinates)}>
												<option value="">Select option</option>
												{Array.isArray(marker.popupData) && marker.popupData.map((item, idx) => (
													<option key={idx} value={item}>{item}</option>
												))}
											</select>
										</div>
									</Popup>
								</Marker>
							))
						) : (
							filteredPoints.map((point, index) => (
								<Marker
									key={`point-${index}`}
									position={point.coordinates[0]}  // Assuming coordinates is an array with one point
									icon={getCustomIcon(index === glowingLineIndex)}
								/>
							))
						)}
					</LayerGroup>
				)}
				{/* Render points */}
				{options === 'points' && Array.isArray(filteredPoints) && filteredPoints.map((point, index) => (
					<Marker
						key={`point-${index}`}  // Unique key for each point
						position={point.coordinates[0]}  // Assuming coordinates is an array with one point
						icon={getCustomIcon(index === glowingLineIndex)}
					>
					</Marker>
				))}


				{options === 'lines' && Array.isArray(filteredLines) && filteredLines.map((line, index) => {
					const isGlowing = index === glowingLineIndex;
					return (
						<Polyline
							key={`line-${index}-${isGlowing}`}
							positions={line.coordinates.map(coord => [coord.lat, coord.lng])}
							pathOptions={{
								color: isGlowing ? 'red' : 'blue',
								weight: isGlowing ? 5 : 2,
							}}
						/>
					);
				})}

			</MapContainer>
			{/* Toast Container for Notifications */}
			<ToastContainer containerId="narrative-toast-container" />

			{/* Display Current Line Length */}
			{currentLength && (
				<div className="length-display">
					Current Length: {currentLength.toFixed(2)} feet
				</div>
			)}
		</div>
	);
};

export default Narrative;

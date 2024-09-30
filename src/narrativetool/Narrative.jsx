import { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search';
import { pindrop } from '../assets/icons';

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
  glowingLineIndex,
  isDrawingEnabled,
  mapRef,
  tileLayer,
  showPins,
  lineLength,
  options,
  handleAddNewPoint,
  handleFetchPointData,
}) => {
  const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
  const _ZOOM_LEVEL = 18;
  const lineLengthRef = useRef(lineLength);
  const [currentLength, setCurrentLength] = useState(null); // State to track current length in feet
  const [popupData, setPopupData] = useState([]); // State for popup data
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    lineLengthRef.current = lineLength;
  }, [lineLength]);

  const calculatePolylineLengthInFeet = (latlngs) => {
    let totalLengthInMeters = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      totalLengthInMeters += calculateDistanceInMeters(latlngs[i], latlngs[i + 1]);
    }
    return metersToFeet(totalLengthInMeters);
  };

  const handleDropdownSelect = (value) => {
    setSelectedOption(value);
    
    // Automatically submit the selected option along with the selected point
    if (selectedPoint && value) {
      const newPoint = {
        coordinates: selectedPoint,
        option: value,  // Submit the selected option
      };
      handleAddNewPoint(newPoint, value);
    }
  };
  

  const renderPopupContent = (data) => {
    // Create a div to contain the popup content
    const popupDiv = document.createElement("div");
    popupDiv.style.display = 'flex';
    popupDiv.style.flexDirection = 'column'; // Stack items vertically

    // Create a header for the popup
    const header = document.createElement("h3");
    header.innerText = "Select an Option"; // Change this to your desired header text
    popupDiv.appendChild(header); // Add the header to the popup

    // Create a select element
    const select = document.createElement("select");
    select.onchange = (e) => handleDropdownSelect(e.target.value);

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "Select option";
    select.appendChild(defaultOption);

    // Add options from the fetched data
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
      });
    }

    popupDiv.appendChild(select); // Add the select element to the popup
    return popupDiv; // Return the complete popup content
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
      const pointCoordinates = e.layer.getLatLng(); // Get the point's coordinates
      setSelectedPoint(pointCoordinates); // Save point for popup
  
      // Fetch point data from the backend or another function
      const data = await handleFetchPointData({ coordinates: [pointCoordinates.lat, pointCoordinates.lng] });
  
      // Ensure the data is successfully retrieved and set it to popupData
      if (data) {
        setPopupData(data); // Set popup data for dropdown
  
        // Directly open the popup after setting the data
        e.layer.bindPopup(renderPopupContent(data)).openPopup();
      }
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

  // Filter coordinates only if `coordinates` exists and has a valid structure.
  const filteredCoordinates = Array.isArray(coordinates)
    ? options === 'lines'
      ? coordinates.filter(item => item.type === 'line')
      : options === 'points'
        ? coordinates.filter(item => item.type === 'point')
        : []
    : [];

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
                marker: options === 'points', // Show pin drop button if options is 'points'
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

        {selectedPoint && (
          <Marker position={selectedPoint}>
          <Popup>
            <div>
              <h3>Select an Option</h3>
              <select onChange={(e) => handleDropdownSelect(e.target.value)}>
                <option value="">Select option</option>
                {Array.isArray(popupData) && popupData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </Popup>
        </Marker>
        )}

        {/* Render lines */}
        {options === 'lines' && Array.isArray(filteredCoordinates) && filteredCoordinates.map((line, index) => (
          <Polyline
            key={index}
            positions={line.coordinates}
            pathOptions={index === glowingLineIndex ? { color: 'red', weight: 6 } : { color: 'blue', weight: 3 }}
          />
        ))}

        {/* Render points */}
        {options === 'points' && Array.isArray(filteredCoordinates) && filteredCoordinates.map((point, index) => (
          <Marker
            key={index}
            position={point.coordinates}
            icon={L.icon({ iconUrl: 'path_to_pin_icon', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })}
          />
        ))}
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

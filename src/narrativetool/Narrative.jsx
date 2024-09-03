import { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search';

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
  coordinates,
  glowingLineIndex,
  isDrawingEnabled,
  mapRef,
  tileLayer,
  showPins,
  lineLength
}) => {
  const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
  const _ZOOM_LEVEL = 18;
  const lineLengthRef = useRef(lineLength);
  const [currentLength, setCurrentLength] = useState(null); // State to track current length in feet

  useEffect(() => {
    lineLengthRef.current = lineLength;
  }, [lineLength]);

  // Custom function to calculate polyline length in feet
  const calculatePolylineLengthInFeet = (latlngs) => {
    let totalLengthInMeters = 0;

    for (let i = 0; i < latlngs.length - 1; i++) {
      totalLengthInMeters += calculateDistanceInMeters(latlngs[i], latlngs[i + 1]);
    }

    return metersToFeet(totalLengthInMeters);
  };

  const _created = (e) => {
    if (e.layerType === 'polyline') {
      const { _latlngs } = e.layer;
      const latestLineLength = lineLengthRef.current;

      // Calculate the length of the drawn polyline in feet
      const drawnLineLengthInFeet = calculatePolylineLengthInFeet(_latlngs);

      // Check if there's a maximum line length provided
      if (latestLineLength && drawnLineLengthInFeet > latestLineLength) {
        toast.error(`Line length exceeds the maximum allowed length of ${latestLineLength} feet.`, { containerId: 'narrative-toast-container' });
        e.layer.remove(); // Remove the line from the map
      } else {
        handleAddNewLine({ coordinates: _latlngs, length: drawnLineLengthInFeet });
      }
    }
  };

  // Function to update length display in feet during drawing
  const _onDrawUpdate = (e) => {
    if (e.layerType === 'polyline') {
      const { _latlngs, _tooltip } = e.layer;
      const drawnLineLengthInFeet = calculatePolylineLengthInFeet(_latlngs);

      // Update the state with the current length in feet
      setCurrentLength(drawnLineLengthInFeet);

      // Modify the tooltip text to show feet instead of meters
      if (_tooltip) {
        const tooltipContent = `${drawnLineLengthInFeet.toFixed(2)} ft. Click to continue drawing line.`;
        _tooltip.updateContent({ text: tooltipContent });
      }
    }
  };

  return (
    <div id="narrative" className="h-screen pt-20">
      <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="h-full z-10">
        <Search enablePinDrops={showPins} />
        {isDrawingEnabled && (
          <FeatureGroup>
            <EditControl
              position="topleft"
              onCreated={_created}
              onDrawUpdate={_onDrawUpdate} // Attach custom update function
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polygon: false,
                polyline: {
                  metric: false, // Disable metric units
                  feet: true,    // Ensure feet is enabled
                },
              }}
              edit={{
                edit: false,   // Disable the edit option
                remove: false, // Disable the remove option
              }}
            />
          </FeatureGroup>
        )}
        <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
        {coordinates.map((line, index) => (
          <Polyline
            key={index}
            positions={line}
            pathOptions={index === glowingLineIndex ? { color: 'red', weight: 4 } : { color: 'blue', opacity: 0.7 }}
          />
        ))}
      </MapContainer>
      <ToastContainer containerId="narrative-toast-container" />
      {currentLength && (
        <div className="length-display">
          Current Length: {currentLength.toFixed(2)} feet
        </div>
      )}
    </div>
  );
  };
  
  export default Narrative;
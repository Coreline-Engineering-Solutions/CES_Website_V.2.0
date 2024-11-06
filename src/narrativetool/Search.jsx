import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';
import L from 'leaflet';
import { pindrop, pindropRed,markerBlue,markerOrange,markerRed } from '../assets/icons';

const Search = ({ enablePinDrops }) => {
    const map = useMap();
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: false, // Disable default marker
            showPopup: true,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: false,
            searchLabel: 'search'
        });

        map.addControl(searchControl);

        // Define custom icon for search result marker
        const customIcon = L.icon({
            iconUrl: markerOrange,  // Replace with your custom icon path (e.g., pindrop)
            iconSize: [35, 35], // Adjust the size of the custom icon
            iconAnchor: [17.5, 35], // Anchor to the bottom center of the icon
        });

        // Define the event handler function for location results
        function handleLocationShow(result) {
            const { location } = result;
            if (marker) {
                map.removeLayer(marker); // Remove previous marker if it exists
            }

            // Create a new marker with the custom icon and add it to the map
            const newMarker = L.marker([location.y, location.x], { icon: customIcon }).addTo(map);
            setMarker(newMarker); // Set new marker
        }

        // Handle the visibility of the marker
        if (marker) {
            marker.setOpacity(enablePinDrops ? 1 : 0); // Toggle marker visibility based on state
        }

        // Add event listener for showing location
        map.on('geosearch/showlocation', handleLocationShow);

        // Cleanup on component unmount
        return () => {
            map.removeControl(searchControl);
            map.off('geosearch/showlocation', handleLocationShow); // Clean up the event listener
            if (marker) {
                map.removeLayer(marker); // Remove any existing marker on component unmount
            }
        };
    }, [map, marker]);

    // Update marker visibility whenever enablePinDrops changes
    useEffect(() => {
        if (marker) {
            marker.setOpacity(enablePinDrops ? 1 : 0); // Toggle marker visibility
        }
    }, [enablePinDrops, marker]);

    return null;
};

export default Search;

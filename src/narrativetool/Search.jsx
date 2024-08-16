import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';
import L from 'leaflet';

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

        if (enablePinDrops) {
            map.on('geosearch/showlocation', handleLocationShow);
        } else {
            map.off('geosearch/showlocation', handleLocationShow);
        }

        function handleLocationShow(result) {
            const { location } = result;
            if (marker) {
                map.removeLayer(marker); // Remove previous marker
            }
            const newMarker = L.marker([location.y, location.x]).addTo(map);
            setMarker(newMarker); // Set new marker
        }

        return () => {
            map.removeControl(searchControl);
            if (marker) {
                map.removeLayer(marker);
            }
        };
    }, [map, marker, enablePinDrops]);

    return null;
};

export default Search;

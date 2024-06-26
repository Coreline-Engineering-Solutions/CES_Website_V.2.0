import { useRef, useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import streetMap from './map_tile_provider';
import L from 'leaflet';
import { marker_map } from '../assets/icons';
import { geolocation } from '../hooks';
import { EditControl } from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css';
import MapToolbar from '../components/MapToolbar';
import axios from 'axios';  // Make sure to install axios using `npm install axios`

const MapTutorial = () => {

    const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
    const [lines, setLines] = useState([]); // Define lines state and setLines function

    const _ZOOM_LEVEL = 13
    const mapRef = useRef();
    const startCoords = 0;
    const endCoords = 0;

    const _created = (e) => {
        if (e.layerType === 'polyline') {
            const { _latlngs } = e.layer;
            setLines([...lines, _latlngs]);

            // Extract start and end coordinates
            const startCoords = _latlngs[0];
            const endCoords = _latlngs[_latlngs.length - 1];

            // Send coordinates via AJAX
            sendCoordinates(startCoords, endCoords);
        }
    };

    const sendCoordinates = (start, end) => {
        const data = {
            start: { lat: start.lat, lng: start.lng },
            end: { lat: end.lat, lng: end.lng }
        };

        // axios.post('/your-api-endpoint', data)
        //     .then(response => {
        //         console.log('Coordinates sent successfully:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error sending coordinates:', error);
        //     });


        console.log(data)
    };

    const marker = new L.icon({

        iconUrl: marker_map,
        iconSize: [35, 45],
        iconAnchor: [17, 45],
    })

    const location = geolocation();

    const showMyLocation = () => {
        if (location.loaded && !location.error) {
            const map = mapRef.current;
            if (map) {
                map.flyTo(
                    [location.coordinates.lat, location.coordinates.lng],
                    _ZOOM_LEVEL,
                    { animate: true }
                );
            }
        } else {
            alert(location.error.message);
        }
    };

        const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Adjust the time as needed
    }, []);

    return (
        
        <div id='narrative' className="h-[700px] w-full">
            <MapToolbar onShowLocation={showMyLocation} />
            <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="h-[750px] w-full z-10">
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={_created}
                        draw={
                            {
                                /* rectangle: false,
                              circle: false,
                              circlemarker: false,
                              marker: false,
                              polyline: false, */
                            }
                        }
                    />
                </FeatureGroup>
                <TileLayer url={streetMap.maptiler.url} attribution={streetMap.maptiler.attribution} />
                {location.loaded && !location.error && (
                    <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={marker}>
                    </Marker>
                )}
                <Marker position={[-33.9249, 18.4241]} icon={marker}>
                    <Popup>
                        <p>
                            First Marker
                        </p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}


export default MapTutorial
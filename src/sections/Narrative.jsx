import { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { marker_map } from '../assets/icons';
import { geolocation } from '../hooks';
import { EditControl } from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css';
import MapToolbar from '../components/MapToolbar';
import axios from 'axios';
import { MapEventsHandler, Search, ProjectSelector } from '../components';
import { TILE_LAYERS } from './map_tile_provider';
import { useLocation } from 'react-router-dom';

const Narrative = () => {
    const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
    const [lines, setLines] = useState([]);
    const [currentTileLayer, setCurrentTileLayer] = useState(TILE_LAYERS.OpenStreetMapUK);
    const UserLocation = useLocation();
    const username = UserLocation.state?.username || '';
    const _ZOOM_LEVEL = 13;
    const mapRef = useRef();
    const location = geolocation();
    const [selectedProject, setSelectedProject] = useState('');

    const _created = (e) => {
        if (e.layerType === 'polyline') {
            const { _latlngs } = e.layer;
            const newLine = { project: selectedProject, coordinates: _latlngs };
            setLines([...lines, newLine]);
        }
    };

    const marker = new L.icon({
        iconUrl: marker_map,
        iconSize: [35, 45],
        iconAnchor: [17, 45],
    });

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
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div id='narrative' className="h-full w-full">
            <MapToolbar onShowLocation={showMyLocation} onTileLayerChange={setCurrentTileLayer} />
            <div className='flex h-full'>
                <ProjectSelector lines={lines} setSelectedProject={setSelectedProject} />
                <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="z-10">
                    {selectedProject && (
                        <FeatureGroup>
                            <EditControl
                                position="topright"
                                onCreated={_created}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: false,
                                    polyline: true,
                                }}
                            />
                        </FeatureGroup>
                    )}
                    <TileLayer url={currentTileLayer.url} attribution={currentTileLayer.attribution} maxZoom={currentTileLayer.maxZoom} />
                    {location.loaded && !location.error && (
                        <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={marker}>
                        </Marker>
                    )}
                    <MapEventsHandler />
                    <Search />
                </MapContainer>
            </div>
        </div>
    );
};

export default Narrative;

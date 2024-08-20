import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, FeatureGroup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { marker_map } from '../assets/icons';
import { geolocation } from '../hooks';
import { EditControl } from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TILE_LAYERS } from './map_tile_provider';

const Narrative = ({ handleAddNewLine, projectLines, coordinates, glowingLineIndex, setGlowingLineIndex,isDrawingEnabled  }) => {
    const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
    const [currentTileLayer, setCurrentTileLayer] = useState(TILE_LAYERS.OpenStreetMapUK);
    const UserLocation = useLocation();
    const _ZOOM_LEVEL = 18;
    const mapRef = useRef();
    const location = geolocation();
    const [selectedProject, setSelectedProject] = useState('');
    const selectedProjectRef = useRef(selectedProject);
    const [enablePinDrops, setEnablePinDrops] = useState(0); // State to manage pin drops toggle

    useEffect(() => {
        selectedProjectRef.current = selectedProject;
    }, [selectedProject]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 3000);
    // }, [selectedProject]);

    const _created = (e) => {
        if (e.layerType === 'polyline') {
            const { _latlngs } = e.layer;
            const newLine = { project: selectedProject, coordinates: _latlngs };
            handleAddNewLine(newLine);
        }
    };

    const _edited = (e) => {
        const { layers } = e;
        const editedLines = [];

        layers.eachLayer(layer => {
            if (layer instanceof L.Polyline) {
                const { _latlngs } = layer;
                editedLines.push(_latlngs);
            }
        });

        setProjectLines(prevLines => ({
            ...prevLines,
            [selectedProject]: (prevLines[selectedProject] || []).map(line =>
                editedLines.find(editedLine => editedLine === line.coordinates) ?
                    { ...line, coordinates: editedLines.find(editedLine => editedLine === line.coordinates) } :
                    line
            )
        }));
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

    const LocateLine = (lineCoordinates, index) => {
        if (lineCoordinates && lineCoordinates.length > 0) {
            const map = mapRef.current;
            if (map) {
                // Calculate the midpoint of the line
                const totalLat = lineCoordinates.reduce((sum, coord) => sum + coord.lat, 0);
                const totalLng = lineCoordinates.reduce((sum, coord) => sum + coord.lng, 0);
                const midpointLat = totalLat / lineCoordinates.length;
                const midpointLng = totalLng / lineCoordinates.length;

                map.flyTo([midpointLat, midpointLng], _ZOOM_LEVEL, { animate: true });
                setGlowingLineIndex(index); // Set the glowing line index
                console.log('Glowing Line Index Set:', index);
            }
        } else {
            toast.error("No line coordinates available.");
        }
    };

    return (
        <div id='narrative' className="overflow-hidden h-screen ">
            <div className='flex h-full'>
                <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="flex-grow h-full z-0">
                    {selectedProject && isDrawingEnabled && ( // Only show drawing tools if enabled
                        <FeatureGroup>
                            <EditControl
                                position="topleft"
                                onCreated={_created}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: false,
                                    polygon: false,
                                    polyline: {
                                        metric: false, // Use feet instead of kilometers
                                    },
                                }}
                                edit={{
                                    edit: true, // Enable editing of existing layers
                                    remove: false // Disable deleting of existing layers
                                }}
                            />
                        </FeatureGroup>
                    )}
                    <TileLayer url={currentTileLayer.url} attribution={currentTileLayer.attribution} maxZoom={currentTileLayer.maxZoom} />
                    {location.loaded && !location.error && (
                        <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={marker} />
                    )}
                    {coordinates.map((line, index) => (
                        <Polyline
                            key={index}
                            positions={line}
                            pathOptions={index === glowingLineIndex ? { color: 'red', weight: 4 } : { color: 'blue', opacity: 0.7 }}
                        />
                    ))}
                </MapContainer>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Narrative;

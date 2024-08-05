import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, FeatureGroup, Polyline } from 'react-leaflet';
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
import { toast, ToastContainer } from "react-toastify";

const Narrative = () => {
    const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
    const [projectLines, setProjectLines] = useState({});
    const [currentTileLayer, setCurrentTileLayer] = useState(TILE_LAYERS.OpenStreetMapUK);
    const [isLoading, setIsLoading] = useState(true);
    const [coordinates, setCoordinates] = useState([]); // State to hold coordinates
    const UserLocation = useLocation();
    const username = UserLocation.state?.username || '';
    const _ZOOM_LEVEL = 18;
    const mapRef = useRef();
    const location = geolocation();
    const [selectedProject, setSelectedProject] = useState('');
    const selectedProjectRef = useRef(selectedProject);
    const drawControlRef = useRef(null); // Reference for EditControl

    useEffect(() => {
        selectedProjectRef.current = selectedProject;
    }, [selectedProject]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [selectedProject]);

    const handleAddNewLine = useCallback(async (newLine) => {
        const currentProject = selectedProjectRef.current;

        if (!currentProject) {
            toast.error("No project selected.");
            return;
        }

        const { coordinates } = newLine;
        const TIMESTAMP = new Date().toISOString();

        try {
            const response = await axios.post(
                "https://www.corelineengineering.com/php/add_narline.php",
                {
                    user_name: username,
                    project: currentProject,
                    line_data: coordinates,
                    TIMESTAMP,
                    options: ''
                }
            );

            if (response.data === '_S') {
                setProjectLines(prevLines => ({
                    ...prevLines,
                    [currentProject]: [
                        ...(prevLines[currentProject] || []),
                        { coordinates, TIMESTAMP, status: "Submitted" }
                    ]
                }));
            }
        } catch (error) {
            toast.error("Error caught when submitting line");
        }
    }, [username]);

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

    const LocateLine = (lineCoordinates) => {
        if (lineCoordinates && lineCoordinates.length > 0) {
            const map = mapRef.current;

            if (map) {
                const firstCoord = lineCoordinates[0];
                map.flyTo([firstCoord.lat, firstCoord.lng], _ZOOM_LEVEL, { animate: true });
            }
        } else {
            toast.error("No line coordinates available.");
        }
    };  

    // const startDrawingPolyline = () => {
    //     const drawControl = drawControlRef.current;
    //     if (drawControl) {
    //         drawControl._toolbars.draw._modes.polyline.handler.enable();
    //     }
    // };

    return (
        <div id='narrative' className=" overflow-y-auto">
            <MapToolbar _USERNAME= {username} onShowLocation={showMyLocation} onTileLayerChange={setCurrentTileLayer}  />
            <div className='flex h-screen flex-row'>
                <ProjectSelector className="w-1/3 h-full p-4 overflow-y-auto"
                    projectLines={projectLines}
                    setProjectLines={setProjectLines}
                    setSelectedProject={setSelectedProject}
                    selectedProject={selectedProject}
                    setCoordinates={setCoordinates} // Pass down the setter as a prop
                    showLocation={LocateLine}
                   
                />
                <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="z-10 ">
                    {selectedProject && (
                        <FeatureGroup>
                            <EditControl
                                ref={drawControlRef} // Attach the ref to EditControl
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
                                    edit: false, // Disable editing of existing layers
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
                        <Polyline key={index} positions={line} />
                    ))}
                    <MapEventsHandler />
                    <Search />
                </MapContainer>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Narrative;

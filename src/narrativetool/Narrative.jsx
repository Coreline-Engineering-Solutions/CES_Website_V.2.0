import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, FeatureGroup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { marker_map } from '../assets/icons';
import { geolocation } from '../hooks';
import { EditControl } from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css';
import MapToolbar from './MapToolbar';
import axios from 'axios';
import { MapEventsHandler, Search, ProjectSelector, ToggleSwitch } from '../components';
import { TILE_LAYERS } from './map_tile_provider';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProjectMain from './ProjectMain';

const Narrative = () => {
    const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
    const [projectLines, setProjectLines] = useState({});
    const [currentTileLayer, setCurrentTileLayer] = useState(TILE_LAYERS.OpenStreetMapUK);
    const [isLoading, setIsLoading] = useState(true);
    const [coordinates, setCoordinates] = useState([]); // State to hold coordinates
    const [glowingLineIndex, setGlowingLineIndex] = useState(null); // State to track the glowing line index
    const UserLocation = useLocation();
    const username = UserLocation.state?.username || '';
    const _ZOOM_LEVEL = 18;
    const mapRef = useRef();
    const location = geolocation();
    const [selectedProject, setSelectedProject] = useState('');
    const selectedProjectRef = useRef(selectedProject);
    const [LineNames, setLineNames] = useState(''); // Initialize LineNames
    const [LocateTypes, setLocateTypes] = useState(''); // Initialize LocateTypes
    const [enablePinDrops, setEnablePinDrops] = useState(0); // State to manage pin drops toggle

    useEffect(() => {
        selectedProjectRef.current = selectedProject;
    }, [selectedProject]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [selectedProject]);

    const handleFetchData = async () => {
        try {
            const response = await axios.post(
                "https://www.corelineengineering.com/php/nar_l_checks.php",
                {
                    USERNAME: username,
                    PROJECT: selectedProject,
                }
            );
            if (Array.isArray(response.data)) {
                const fetchedLines = response.data.map(line => ({
                    ...line,
                    coordinates: parseCoordinates(line.line_as_text),
                }));

                setProjectLines(prevLines => ({
                    ...prevLines,
                    [selectedProject]: [
                        ...(prevLines[selectedProject] || []),
                        ...fetchedLines,
                    ],
                }));

                const coordinates = fetchedLines.map(line => line.coordinates || []);
                setCoordinates(coordinates);
            } else {
                if (!toast.isActive('fetchDataFormatError')) {
                    toast.error("Fetched data is not in the expected format.", { toastId: 'fetchDataFormatError' });
                }
            }
        } catch (error) {
            if (!toast.isActive('fetchDataError')) {
                toast.error("Error caught when fetching data", { toastId: 'fetchDataError' });
            }
        }
    };


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
                    options: LocateTypes,
                    line_name: LineNames, // Include line name
                }
            );

            if (response.data === '_S') {
                handleFetchData();
                setProjectLines(prevLines => ({
                    ...prevLines,
                    [currentProject]: [
                        ...(prevLines[currentProject] || []),
                        { coordinates, TIMESTAMP, status: "Submitted" }
                    ]
                }));
                setCoordinates(prevCoordinates => [...prevCoordinates, coordinates]);
            }
        } catch (error) {
            toast.error("Error caught when submitting line");
        }
    }, [username, LocateTypes, LineNames]);

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
        <div id='narrative' className="overflow-hidden h-screen pt-20">
            <MapToolbar className="fixed top-0 left-0 right-0 z-50" _USERNAME={username} onShowLocation={showMyLocation} onTileLayerChange={setCurrentTileLayer} />
            <div className='flex h-full'>
                <ProjectMain className="w-1/3 h-full p-4 "
                    projectLines={projectLines}
                    setProjectLines={setProjectLines}
                    setSelectedProject={setSelectedProject}
                    selectedProject={selectedProject}
                    setCoordinates={setCoordinates} // Pass down the setter as a prop
                    LocateLine={LocateLine}
                    setLocateTypes={setLocateTypes} // Pass the state setter to ProjectMain
                    setLineNames={setLineNames} // Pass the state setter to ProjectMain
                    locateType={LocateTypes}  // Pass locateType value
                    lineName={LineNames}  // Pass lineName value
                />
                <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="flex-grow h-full z-0">
                    {selectedProject && (
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
                        <Polyline
                            key={index}
                            positions={line}
                            pathOptions={index === glowingLineIndex ? { color: 'red',weight:4 } : { color: 'blue', opacity:0.7}}
                        />
                    ))}
                    <MapEventsHandler />
                    <Search enablePinDrops={enablePinDrops === 1} />
                </MapContainer>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Narrative;

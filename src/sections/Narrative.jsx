import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { marker_map } from '../assets/icons';
import { geolocation } from '../hooks';
import { EditControl } from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css';
import MapToolbar from '../components/MapToolbar';
import axios from 'axios';
import { MapEventsHandler, Search, ProjectSelector, NarrativeTable } from '../components';
import { TILE_LAYERS } from './map_tile_provider';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";



const Narrative = () => {
    const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
    const [projectLines, setProjectLines] = useState({});
    const [currentTileLayer, setCurrentTileLayer] = useState(TILE_LAYERS.OpenStreetMapUK);
    const UserLocation = useLocation();
    const username = UserLocation.state?.username || '';
    const _ZOOM_LEVEL = 13;
    const mapRef = useRef();
    const location = geolocation();
    var [selectedProject, setSelectedProject] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Debugging useEffect to log the selected project
    useEffect(() => {
        console.log('Selected Project:', selectedProject);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [selectedProject]);

    const handleAddNewLine = useCallback(async (newLine) => {
        
        if (!selectedProject) {
            toast.error("No project selected.");
            return;
        }

        const timestamp = new Date().toISOString();
        const lineWithTimestamp = {
            ...newLine,
            coordinates: newLine.coordinates || [],
            timestamp
        };
        console.log('Current', selectedProject);
        try {
            const response = await axios.post(
                "https://www.corelineengineering.com/php/add_narline.php",
                {
                    user_name: username,
                    PROJECT: selectedProject,
                    line_data: [lineWithTimestamp],
                    options: '' // Replace with your actual option if necessary
                }
            );

            if (response.data === '_S') {
                toast.success("Line submitted successfully!");

                setProjectLines(prevLines => ({
                    ...prevLines,
                    [selectedProject]: [
                        ...(prevLines[selectedProject] || []),
                        { ...lineWithTimestamp, status: "Submitted" }
                    ]
                }));
            }
        } catch (error) {
            toast.error("Error caught when submitting line");
            console.error("Error submitting line:", error);
        }
    }, [selectedProject, username]);

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

    const _deleted = (e) => {
        const { layers } = e;
        const deletedLines = [];

        layers.eachLayer(layer => {
            if (layer instanceof L.Polyline) {
                const { _latlngs } = layer;
                deletedLines.push(_latlngs);
            }
        });

        setProjectLines(prevLines => ({
            ...prevLines,
            [selectedProject]: (prevLines[selectedProject] || []).filter(line =>
                !deletedLines.find(deletedLine => deletedLine === line.coordinates)
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
    return (
        <div id='narrative' className="h-full min-w-max">
            <MapToolbar onShowLocation={showMyLocation} onTileLayerChange={setCurrentTileLayer} />
            <div className='flex h-screen flex-row'>
                <ProjectSelector className="w-1/3 h-full p-4 overflow-y-auto"
                    projectLines={projectLines}
                    setProjectLines={setProjectLines}
                    setSelectedProject={setSelectedProject}
                    selectedProject={selectedProject}
                />
                <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="z-10">
                    {selectedProject && (
                        <FeatureGroup>
                            <EditControl
                                position="topright"
                                onCreated={_created}
                                onEdited={_edited}
                                onDeleted={_deleted}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: false,
                                    polygon: false,
                                    polyline: true,
                                }}
                            />
                        </FeatureGroup>
                    )}
                    <TileLayer url={currentTileLayer.url} attribution={currentTileLayer.attribution} maxZoom={currentTileLayer.maxZoom} />
                    {location.loaded && !location.error && (
                        <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={marker} />
                    )}
                    <MapEventsHandler />
                    <Search />
                </MapContainer>
                {/* <NarrativeTable/> */}
            </div>
        </div>
    );
};

export default Narrative;

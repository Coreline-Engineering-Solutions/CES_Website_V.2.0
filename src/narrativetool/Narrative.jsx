import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, FeatureGroup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { marker_map } from '../assets/icons';
import { EditControl } from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TILE_LAYERS } from './map_tile_provider';
import Search from './Search';

const Narrative = ({ handleAddNewLine, projectLines, coordinates, glowingLineIndex, setGlowingLineIndex, isDrawingEnabled,mapRef,tileLayer,showPins }) => {
  const [center, setCenter] = useState({ lat: -33.9249, lng: 18.4241 });
  const UserLocation = useLocation();
  const _ZOOM_LEVEL = 18;

  const _created = (e) => {
    if (e.layerType === 'polyline') {
        const { _latlngs } = e.layer;
        handleAddNewLine({ coordinates: _latlngs });
    }
};
  return (
    <div id='narrative' className="h-screen pt-20 ">
      <MapContainer center={center} zoom={_ZOOM_LEVEL} ref={mapRef} className="h-full z-10">
        <Search enablePinDrops={showPins}/>
        {isDrawingEnabled && (
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
                  metric: false,
                },
              }}
              edit={{
                edit:false,
                remove: false,
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
      <ToastContainer />
    </div>
  );
};

export default Narrative;


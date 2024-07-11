import { useMapEvents } from 'react-leaflet';

const MapEventsHandler = ({ onRightClick }) => {
  useMapEvents({
    contextmenu(e) {
      onRightClick(e);
    },
  });
  return null;
};

export default MapEventsHandler;
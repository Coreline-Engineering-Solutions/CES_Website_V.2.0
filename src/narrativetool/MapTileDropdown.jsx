import React from 'react';
import { TILE_LAYERS } from './map_tile_provider';

const MapTileDropdown = ({ onChange }) => {
    const handleTileChange = (event) => {
        const selectedTileKey = event.target.value;
        const selectedTile = TILE_LAYERS[selectedTileKey];
        onChange(selectedTile);
    };

    return (
        <div className="relative inline-block px-6">
            <label htmlFor="mapTiles" className="block text-sm font-medium p-4 text-white">Select a Map Tile:</label>
            <select
                id="mapTiles"
                onChange={handleTileChange}
                className="mr-4 mt-1 w-56 px-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                {Object.keys(TILE_LAYERS).map(key => (
                    <option key={key} value={key}>{TILE_LAYERS[key].header}</option>
                ))}
            </select>
        </div>
    );
}

export default MapTileDropdown;
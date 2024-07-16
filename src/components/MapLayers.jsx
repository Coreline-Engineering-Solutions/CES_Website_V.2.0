import React from 'react';
import { layers } from '../constants';
import { FaDownload, FaMap, FaTrashAlt, FaLayerGroup } from 'react-icons/fa';

const MapLayers = () => {
    return (
        <div className="h-full w-1/5 bg-gray-100 p-4  border-2 overflow-y-auto"> 
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border border-gray-300">ID</th>
                        <th className="p-2 border border-gray-300">Hyperlink</th>
                        <th className="p-2 border border-gray-300">Narrative</th>
                        <th className="p-2 border border-gray-300">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {layers.map((layer, index) => (
                        <tr key={index} className="bg-white hover:bg-gray-100">
                            <td className="p-2 border border-gray-300">{index + 1}</td>
                            <td className="p-2 border border-gray-300">
                                <a href="#" className="text-blue-500 hover:underline">Link</a>
                            </td>
                            <td className="p-2 border border-gray-300">Narrative for {layer.name}</td>
                            <td className="p-2 border border-gray-300">{layer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6 w-3/5 flex flex-col space-y-4">
                <button
                    className="flex items-center justify-center p-3 bg-blue-900 hover:bg-[#6d7eff] transition-colors duration-300 text-white rounded-xl"
                    aria-label="Download CSV"
                >
                    <FaDownload className="mr-2" /> Download CSV
                </button>
                <button
                    className="flex items-center justify-center p-3 bg-blue-900 hover:bg-[#6d7eff] transition-colors duration-300 text-white rounded-xl"
                    aria-label="Download Map Batch"
                >
                    <FaMap className="mr-2" /> Download Map Batch
                </button>
                <button
                    className="flex items-center justify-center p-3 bg-red-600 hover:bg-red-800 transition-colors duration-300 text-white rounded-xl"
                    aria-label="Clear Session"
                >
                    <FaTrashAlt className="mr-2" /> Clear Session
                </button>
                <button
                    className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-800 transition-colors duration-300 text-white rounded-xl"
                    aria-label="Submit Layers"
                >
                    <FaLayerGroup className="mr-2" /> Submit Narratives
                </button>
            </div>
        </div>
    );
};

export default MapLayers;
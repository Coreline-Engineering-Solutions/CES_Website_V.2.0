import React, { useState } from 'react';
import { FaDownload, FaMap, FaTrashAlt, FaLayerGroup } from "react-icons/fa";

const NarrativeTable = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="p-4">
      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        {isVisible ? 'Hide Table' : 'Show Table'}
      </button>

      {/* Table Content */}
      {isVisible && (
        <div>
          {/* Buttons Row */}
          <div className="flex justify-between mb-4">
          <button
                className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white rounded-lg w-full max-w-[150px]"
                aria-label="Submit Layers"
              >
                <FaLayerGroup className="mr-2" /> Submit
              </button>
              <button
                className="flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded-lg w-full max-w-[150px]"
                aria-label="Download CSV"
              >
                <FaDownload className="mr-2" /> Download
              </button>
              <button
                className="flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded-lg w-full max-w-[150px]"
                aria-label="Download Map Batch"
              >
                <FaMap className="mr-2" /> Map Batch
              </button>
              <button
                className="flex items-center justify-center p-3 bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white rounded-lg w-full max-w-[150px]"
                aria-label="Clear Session"
              >
                <FaTrashAlt className="mr-2" /> Clear
              </button>
          </div>

          {/* Dropdown */}
          <div className="mb-4">
            <label htmlFor="dropdown" className="block text-gray-700 mb-2">Select a Project</label>
            <select id="dropdown" className="block w-1/5 bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          {/* Table */}
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Column 1</th>
                <th className="py-2 px-4 border-b">Column 2</th>
                <th className="py-2 px-4 border-b">Column 3</th>
                <th className="py-2 px-4 border-b">Column 4</th>
                <th className="py-2 px-4 border-b">Column 5</th>
                <th className="py-2 px-4 border-b">Column 6</th>
                <th className="py-2 px-4 border-b">Column 7</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data */}
              <tr>
                <td className="py-2 px-4 border-b">Data 1</td>
                <td className="py-2 px-4 border-b">Data 2</td>
                <td className="py-2 px-4 border-b">Data 3</td>
                <td className="py-2 px-4 border-b">Data 4</td>
                <td className="py-2 px-4 border-b">Data 5</td>
                <td className="py-2 px-4 border-b">Data 6</td>
                <td className="py-2 px-4 border-b">Data 7</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NarrativeTable;
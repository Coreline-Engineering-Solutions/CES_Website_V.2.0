import React, { useState, useEffect } from "react";
import {
    FaTrashAlt,
    FaSearchLocation,
    FaComment,
    FaLink,
    FaSpinner,
    FaChevronUp,
    FaChevronDown,
    FaGripLines,
    FaMapMarkerAlt,
} from "react-icons/fa";

const LOCATE_TYPE_LABELS = {
    '1': 'Single Sided',
    '2': 'Double Sided',
    '3': 'Double Sided incl Road'
};

const ProjectTable = ({
    narrativeLines = [],
    narrativePoints = [],
    handleDeleteLine,
    handleDeletePoint,
    rowsPerPage,
    handleOpenNarrative,
    LocateLine,
    LocatePoint,
    handleFetchData
}) => {
    const [isLinesTableOpen, setIsLinesTableOpen] = useState(true);
    const [isPointsTableOpen, setIsPointsTableOpen] = useState(true);

    const [currentLinesPage, setCurrentLinesPage] = useState(1);
    const [currentPointsPage, setCurrentPointsPage] = useState(1);

    const totalLinesPages = Math.ceil(narrativeLines.length / rowsPerPage);
    const totalPointsPages = Math.ceil(narrativePoints.length / rowsPerPage);

    useEffect(() => {
        handleFetchData();
    }, [handleFetchData, currentLinesPage, currentPointsPage]);

    const handleLocateClick = (coordinates, isLine) => {
        const index = isLine
            ? narrativeLines.findIndex(line => line.coordinates === coordinates)
            : narrativePoints.findIndex(point => point.coordinates === coordinates);

        isLine ? LocateLine(coordinates, index) : LocatePoint(coordinates, index);
    };

    return (
        <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
             <h2 className="bg-gray-100 p-4 text-xl font-bold mb-4">Narrative Tables</h2>
            {/* Narrative Lines Table */}
            <div className="mb-6">
                <div
                    className="flex justify-between items-center bg-[#00309e] text-white p-4 rounded-t-lg cursor-pointer"
                    onClick={() => setIsLinesTableOpen(!isLinesTableOpen)}
                >
                    <div className="flex items-center space-x-2">
                        <FaGripLines className="text-white" />  {/* Icon for Narrative Lines */}
                        <h3>Narrative Lines</h3>
                    </div>
                    {isLinesTableOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <div
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isLinesTableOpen ? 'max-h-screen' : 'max-h-0'}`}
                >
                    <table className="min-w-full bg-white mb-4">
                        <thead>
                            <tr>
                                <th className="p-2 border border-gray-300">#</th>
                                <th className="p-2 border border-gray-300">Line Name</th>
                                <th className="p-2 border border-gray-300">Locate Type</th>
                                <th className="p-2 border border-gray-300">Hyperlink</th>
                                <th className="p-2 border border-gray-300">Narrative</th>
                                <th className="p-2 border border-gray-300">Delete</th>
                                <th className="p-2 border border-gray-300">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narrativeLines.length > 0 ? (
                                narrativeLines
                                    .slice((currentLinesPage - 1) * rowsPerPage, currentLinesPage * rowsPerPage)
                                    .map((line, index) => (
                                        <tr key={`${line.timestamp}-${index}`}>
                                            <td className="p-2 border border-gray-300">{index + 1}</td>
                                            <td className="p-2 border border-gray-300">{line.line_name || 'No Name'}</td>
                                            <td className="p-2 border border-gray-300">
                                                {LOCATE_TYPE_LABELS[line.options] || 'Single Sided'}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                {line.hyperlink ? (
                                                    <a href={line.hyperlink} target="_blank" rel="noopener noreferrer">
                                                        <FaLink className="text-[#00309e]" />
                                                    </a>
                                                ) : (
                                                    <FaSpinner className="animate-spin text-[#00309e]" />
                                                )}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                <FaComment
                                                    className="text-[#00309e] cursor-pointer"
                                                    onClick={() => handleOpenNarrative(line.narrative)}
                                                />
                                            </td>
                                            <td className="p-2 border-b">
                                                <button
                                                    className="text-red-600 hover:text-red-800 transition duration-200"
                                                    onClick={() => handleDeleteLine(line)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                <FaSearchLocation
                                                    className="text-[#00309e] cursor-pointer"
                                                    onClick={() => handleLocateClick(line.coordinates, true)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-2 text-center text-gray-500">No lines available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4 mb-4">
                        <button
                            className={`px-4 py-2 ${currentLinesPage === 1 ? "bg-gray-300" : "bg-[#00309e] text-white"} rounded-lg`}
                            disabled={currentLinesPage === 1}
                            onClick={() => setCurrentLinesPage(currentLinesPage - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className={`px-4 py-2 ${currentLinesPage === totalLinesPages ? "bg-gray-300" : "bg-[#00309e] text-white"} rounded-lg`}
                            disabled={currentLinesPage === totalLinesPages}
                            onClick={() => setCurrentLinesPage(currentLinesPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Narrative Points Table */}
            <div>
                <div
                    className="flex justify-between items-center bg-[#00309e] text-white p-4 rounded-t-lg cursor-pointer"
                    onClick={() => setIsPointsTableOpen(!isPointsTableOpen)}
                >
                    <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-white" />  {/* Icon for Map Pins */}
                        <h3>Narrative Points</h3>
                    </div>
                    {isPointsTableOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <div
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isPointsTableOpen ? 'max-h-screen' : 'max-h-0'}`}
                >
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="p-2 border border-gray-300">#</th>
                                <th className="p-2 border border-gray-300">Point Name</th>
                                <th className="p-2 border border-gray-300">Work Point</th>
                                <th className="p-2 border border-gray-300">Location</th>
                                <th className="p-2 border border-gray-300">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narrativePoints.length > 0 ? (
                                narrativePoints
                                    .slice((currentPointsPage - 1) * rowsPerPage, currentPointsPage * rowsPerPage)
                                    .map((point, index) => (
                                        <tr key={`${point.timestamp}-${index}`}>
                                            <td className="p-2 border border-gray-300">{index + 1}</td>
                                            <td className="p-2 border border-gray-300">{point.point_name || 'No Name'}</td>
                                            <td className="p-2 border border-gray-300">
                                                {LOCATE_TYPE_LABELS[point.options] || 'Unknown'}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                <FaSearchLocation
                                                    className="text-[#00309e] cursor-pointer"
                                                    onClick={() => handleLocateClick(point.coordinates, false)}
                                                />
                                            </td>
                                            <td className="p-2 border-b">
                                                <button
                                                    className="text-red-600 hover:text-red-800 transition duration-200"
                                                    onClick={() => handleDeletePoint(point)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-2 text-center text-gray-500">No points available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4 mb-4">
                        <button
                            className={`px-4 py-2 ${currentPointsPage === 1 ? "bg-gray-300" : "bg-[#00309e] text-white"} rounded-lg`}
                            disabled={currentPointsPage === 1}
                            onClick={() => setCurrentPointsPage(currentPointsPage - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className={`px-4 py-2 ${currentPointsPage === totalPointsPages ? "bg-gray-300" : "bg-[#00309e] text-white"} rounded-lg`}
                            disabled={currentPointsPage === totalPointsPages}
                            onClick={() => setCurrentPointsPage(currentPointsPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTable;

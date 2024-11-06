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
    FaInfo
} from "react-icons/fa";

const ProjectTable = ({
    narrativeLines = [],
    narrativePoints = [],
    handleDeleteLine,
    handleDeletePoint,
    rowsPerPage,
    handleOpenNarrative,
    LocateLine,
    LocatePoint,
    handleFetchData,
    handleFetchPointData,
    handleOpenInfo,
}) => {
    const [isLinesTableOpen, setIsLinesTableOpen] = useState(true);
    const [isPointsTableOpen, setIsPointsTableOpen] = useState(true);

    const [currentLinesPage, setCurrentLinesPage] = useState(1);
    const [currentPointsPage, setCurrentPointsPage] = useState(1);

    const totalLinesPages = Math.ceil(narrativeLines.length / rowsPerPage);
    const totalPointsPages = Math.ceil(narrativePoints.length / rowsPerPage);

    useEffect(() => {
        handleFetchData();
        handleFetchPointData();
        return;
    }, []);

    const handleLocateClick = (coordinates, isLine) => {
        const index = isLine
            ? narrativeLines.findIndex(line => line.coordinates === coordinates)
            : narrativePoints.findIndex(point => point.coordinates === coordinates);

        isLine ? LocateLine(coordinates, index) : LocatePoint(coordinates, index);
    };

    const buttonClass = "p-4 text-[#00309e] rounded-lg bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-[#00309e]";

    return (
        <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md transition-all duration-300">
            <h2 className="bg-gray-100 p-4 text-xl font-bold mb-4">Narrative Tables</h2>

            {/* Narrative Lines Table */}
            <div className="mb-6">
                <div
                    className={`flex justify-between items-center bg-[#00309e] text-white p-4 rounded-t-lg cursor-pointer transition-all duration-300 ${!isLinesTableOpen ? 'p-2 text-sm' : 'p-4'}`}
                    onClick={() => setIsLinesTableOpen(!isLinesTableOpen)}
                >
                    <div className="flex items-center space-x-2">
                        <FaGripLines className="text-white" />
                        <h3>Narrative Lines</h3>
                    </div>
                    {isLinesTableOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isLinesTableOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <table className="min-w-full bg-white mb-4">
                        <thead>
                            <tr>
                                <th className="p-2 border border-gray-300">#</th>
                                <th className="p-2 border border-gray-300">Line Name</th>
                                <th className="p-2 border border-gray-300">Hyperlink</th>
                                <th className="p-2 border border-gray-300">Narrative</th>
                                <th className="p-2 border border-gray-300">Delete</th>
                                <th className="p-2 border border-gray-300">Location</th>
                                <th className="p-2 border border-gray-300">More Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narrativeLines.length > 0 ? (
                                narrativeLines
                                    .slice((currentLinesPage - 1) * rowsPerPage, currentLinesPage * rowsPerPage)
                                    .map((line, index) => (
                                        <tr key={`${line.timestamp}-${index}`}>
                                            <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                                            <td className="p-2 border border-gray-300 text-center">{line.line_name || 'No Name'}</td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                {line.hyperlink ? (
                                                    <a href={line.hyperlink} target="_blank" rel="noopener noreferrer">
                                                        <button className={buttonClass}>
                                                            <FaLink />
                                                        </button>
                                                    </a>
                                                ) : (
                                                    <FaSpinner className="animate-spin text-[#00309e]" />
                                                )}
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleOpenNarrative(line.narative)}>
                                                    <FaComment />
                                                </button>
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleDeleteLine(line)}>
                                                    <FaTrashAlt className="text-red-600" />
                                                </button>
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleLocateClick(line.coordinates, true)}>
                                                    <FaSearchLocation />
                                                </button>
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleOpenInfo(line.timestamp, true)}>
                                                    <FaInfo />
                                                </button>
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
                    className={`flex justify-between items-center bg-[#00309e] text-white p-4 rounded-t-lg cursor-pointer transition-all duration-300 ${!isPointsTableOpen ? 'p-2 text-sm' : 'p-4'}`}
                    onClick={() => setIsPointsTableOpen(!isPointsTableOpen)}
                >
                    <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-white" />
                        <h3>Narrative Points</h3>
                    </div>
                    {isPointsTableOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isPointsTableOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="p-2 border border-gray-300">#</th>
                                <th className="p-2 border border-gray-300">Time Created</th>
                                <th className="p-2 border border-gray-300">Hyperlink</th>
                                <th className="p-2 border border-gray-300">Narrative</th>
                                <th className="p-2 border border-gray-300">Delete</th>
                                <th className="p-2 border border-gray-300">Location</th>
                                <th className="p-2 border border-gray-300">More Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narrativePoints.length > 0 ? (
                                narrativePoints
                                    .filter(point => point.timestamp !== null) // Filtering points with non-null timestamps
                                    .slice((currentPointsPage - 1) * rowsPerPage, currentPointsPage * rowsPerPage)
                                    .map((point, index) => (
                                        <tr key={`${point.timestamp || index}-${index}`}>
                                            <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                                            <td className="p-2 border border-gray-300 text-center">{point.timestamp || 'No Name'}</td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                {point.hyperlink ? (
                                                    <a href={point.hyperlink} target="_blank" rel="noopener noreferrer">
                                                        <button className={buttonClass}>
                                                            <FaLink />
                                                        </button>
                                                    </a>
                                                ) : (
                                                    <FaSpinner className="animate-spin text-[#00309e]" />
                                                )}
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleOpenNarrative(point.narative)}>
                                                    <FaComment />
                                                </button>
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleDeletePoint(point)}>
                                                    <FaTrashAlt className="text-red-600" />
                                                </button>
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleLocateClick(point.coordinates, false)}>
                                                    <FaSearchLocation />
                                                </button>
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center">
                                                <button className={buttonClass} onClick={() => handleOpenInfo(point.timestamp, false)}>
                                                    <FaInfo />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-2 text-center text-gray-500">No points available</td>
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

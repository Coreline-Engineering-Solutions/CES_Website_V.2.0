import React from "react";
import { FaTrashAlt, FaSearchLocation, FaComment, FaLink, FaSpinner } from "react-icons/fa";

const LOCATE_TYPE_LABELS = {
    '1': 'Single Sided',
    '2': 'Double Sided',
    '3': 'Double Sided incl Road'
};

const ProjectTable = ({ narrativeLines, handleDeleteLine, currentPage, setCurrentPage, rowsPerPage, handleOpenNarrative, LocateLine }) => {
    const totalPages = Math.ceil(narrativeLines.length / rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLocateClick = (lineCoordinates) => {
        // Find the index of the line in the narrativeLines array
        const index = narrativeLines.findIndex(line => line.coordinates === lineCoordinates);

        // Call LocateLine with coordinates and index
        LocateLine(lineCoordinates, index);
    };

    return (
        <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
            <table className="min-w-full bg-white">
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
                    {narrativeLines
                        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                        .map((line, index) => (
                            <tr key={line.timestamp}>
                                <td className="p-2 border border-gray-300">{index + 1}</td>
                                <td className="p-2 border border-gray-300">{line.line_name || 'No Name'}</td>
                                <td className="p-2 border border-gray-300">
                                    {LOCATE_TYPE_LABELS[line.options] || 'Unknown'}
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
                                        onClick={() => handleOpenNarrative(line.narative)}
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
                                        onClick={() => handleLocateClick(line.coordinates)}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    className={`px-4 py-2 ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"} rounded-lg`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <button
                    className={`px-4 py-2 ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"} rounded-lg`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProjectTable;

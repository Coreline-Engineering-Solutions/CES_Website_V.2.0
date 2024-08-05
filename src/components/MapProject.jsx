import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaComment, FaEdit, FaTrash, FaLink, FaSearchLocation, FaDrawPolygon, FaTimes, FaDownload } from "react-icons/fa";
import { radioMap } from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProjectSelector = ({ setProjectLines, setSelectedProject, selectedProject, setCoordinates, showLocation, startDrawingPolyline }) => {
    const [selection, setSelection] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [existingProjects, setExistingProjects] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null);
    const [narrativeLines, setNarrativeLines] = useState([]); // Lines fetched from the database
    const [newLines, setNewLines] = useState([]); // Newly drawn lines
    const location = useLocation();
    const username = location.state?.username || "";
    const [selectedOption, setSelectedOption] = useState("");
    const [activeTab, setActiveTab] = useState("selection");
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        fetchProjects();
    }, [username]);

    useEffect(() => {
        if (selectedProject) {
            const interval = setInterval(handleFetchData, 10000);
            return () => clearInterval(interval);
        }
    }, [selectedProject]);


    const fetchProjects = async () => {
        try {
            const response = await axios.post(
                "https://www.corelineengineering.com/php/fetch_projects.php",
                { _USERNAME: username }
            );
            setExistingProjects(response.data);
        } catch (error) {
            if (!toast.isActive('fetchProjectsError')) {
                toast.error("Error fetching projects", { toastId: 'fetchProjectsError' });
            }
        }
    };

    const handleProjectChange = (event) => {
        const newProject = event.target.value;
        setSelectedProject(newProject);
        setSelection("open");
    };

    const handleSelectionChange = (event) => {
        setSelection(event.target.value);
    };

    const CreateProject = async () => {
        try {
            const submissionData = {
                _PROJECT: projectName,
                _DESCRIPTION: projectDescription,
                _USERNAME: username,
            };
            const response = await axios.post(
                "https://www.corelineengineering.com/php/create_project.php",
                submissionData
            );
            setProjectDetails(submissionData);
            fetchProjects();
            setSelectedProject(submissionData._PROJECT);
            setActiveTab("details");
            if (response.data === '_S') {
                toast.success("Project created successfully");
            } else {
                toast.error("Failed to create project");
            }
        } catch (error) {
            if (!toast.isActive('createProjectError')) {
                toast.error("Error creating project", { toastId: 'createProjectError' });
            }
        }
    };

    const handleOpenProject = () => {
        const project = existingProjects.find(
            (p) => p.job_reference === selectedProject
        );
        if (project) {
            setProjectDetails(project);
            setActiveTab("details");
        }
    };

    const parseCoordinates = (lineAsText) => {
        try {
            if (!lineAsText) {
                throw new Error("Line text is null or undefined");
            }
            let parsed;
            if (typeof lineAsText === 'string') {
                try {
                    parsed = JSON.parse(lineAsText);
                } catch (jsonError) {
                    throw new Error("Line text is not a valid JSON string");
                }
            } else {
                parsed = lineAsText;
            }

            if (!Array.isArray(parsed)) {
                throw new Error("Parsed line text is not an array");
            }

            return parsed.map(coord => ({
                lat: coord.lat || coord.latitude,
                lng: coord.lng || coord.longitude
            }));
        } catch (error) {
            return [];
        }
    };

    const handleOpenNarrative = (narrative) => {
        setModalContent(narrative);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent("");
    };

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

                setNarrativeLines(prevLines => [
                    ...fetchedLines,
                    ...newLines
                ]);

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

    const handleDeleteLine = async (line) => {
        try {
            const response = await axios.post(
                "https://www.corelineengineering.com/php/nar_l_delete.php",
                {
                    USERNAME: username,
                    PROJECT: selectedProject,
                    TIMESTAMP: line.timestamp
                }
            );


            if (response.data === '_S') {
                setNarrativeLines((prevLines) =>
                    prevLines.filter((prevLine) => prevLine.timestamp !== line.timestamp)
                );
                handleFetchData(); // Reload table
            }
        } catch (error) {
            if (!toast.isActive('deleteLineError')) {
                toast.error("Error caught when deleting line", { toastId: 'deleteLineError' });
            }
        }
    };

    const handleClearSession = async () => {
        try {
            const response = await axios.post(
                "https://www.corelineengineering.com/php/clear_l_session.php",
                {
                    USERNAME: username,
                    PROJECT: selectedProject,
                }
            );


            if (response.data === '_S') {
                // toast.error("Session cleared", { toastId: 'clearSessionSuccess' });
                handleFetchData(); // Reload table
            }
        } catch (error) {
            if (!toast.isActive('clearSessionError')) {
                toast.error("Error caught when clearing session", { toastId: 'clearSessionError' });
            }
        }
    };
    const handleDownloadCSV = async () => {
        try {
            const response = await axios.post(
                "https://www.corelineengineering.com/php/csv_downloader.php",
                {
                    USERNAME: username,
                    PROJECT: selectedProject,
                }
            );



            if (response.data === '_S') {
                toast.success("Downloading CSV", { toastId: 'downloadCSVSuccess' });
            } else if (response.data.error === 'No data found') {
                if (!toast.isActive('noDataError')) {
                    toast.error("No data found for the selected project", { toastId: 'noDataError' });
                }
            } else if (Array.isArray(response.data)) {
                const csvContent = convertToCSV(response.data);
                downloadCSV(csvContent, 'project_data.csv');
            }
        } catch (error) {
            if (!toast.isActive('downloadCSVError')) {
                toast.error("Error caught when clearing session", { toastId: 'downloadCSVError' });
            }
        }
    };

    const convertToCSV = (data) => {
        const csvRows = [];

        // Extract headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Extract rows
        for (const row of data) {
            const values = headers.map(header => JSON.stringify(row[header], replacer));
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    // Replacer function to handle null values and other data formatting
    const replacer = (key, value) => value === null ? '' : value;

    // Create a download link and trigger the download
    const downloadCSV = (csvContent, fileName) => {
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleUpdate = (line) => {
    };

    const handleDelete = (line) => {
        handleDeleteLine(line);
    };


    const renderLine = (line, index) => {
        return (
            <tr key={index}>
                <td className="p-2 border border-gray-300">{index + 1}</td>
                <td className="p-2 border border-gray-300">
                    {line.timestamp ? (
                        <a href={line.timestamp} target="_blank" rel="noopener noreferrer">
                            {line.timestamp}
                        </a>
                    ) : ""}
                </td>
                <td className="p-2 border border-gray-300">
                    {line.hyperlink ? (
                        <a href={line.hyperlink} target="_blank" rel="noopener noreferrer">
                            <FaLink className="text-[#00309e]" />
                        </a>
                    ) : ""}
                </td>
                <td className="p-2 border border-gray-300">
                    <FaComment
                        className="text-[#00309e] cursor-pointer"
                        onClick={() => handleOpenNarrative(line.narative)}
                    />
                </td>
                <td className="p-2 border border-gray-300">
                    <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(line)}
                    />
                </td>
                {/* <td className="p-2 border border-gray-300">
                    <FaEdit[]
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleUpdate(line)}
                    />
                </td> */}
                <td className="p-2 border border-gray-300">
                    <FaSearchLocation
                        className="text-[#00309e] cursor-pointer"
                        onClick={() => showLocation(line.coordinates)}
                    />
                </td>
            </tr>
        );
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startRowIndex = (currentPage - 1) * rowsPerPage;
    const endRowIndex = startRowIndex + rowsPerPage;
    const currentLines = narrativeLines.slice(startRowIndex, endRowIndex);

    return (
        <div className="flex flex-col justify-start items-start h-screen overflow-y-auto w-full lg:w-3/5">
            <div className="bg-white p-4 sm:p-8 w-full">
                <ToastContainer />
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-start">Project Selector</h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                    <button
                        onClick={() => setActiveTab("selection")}
                        className={`py-2 px-4 sm:px-6 rounded-lg transition duration-300 ease-in-out ${activeTab === "selection" ? "bg-[#00309e] text-white shadow-lg" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        Project Selection
                    </button>
                    {selectedProject && (
                        <>
                            <button
                                onClick={() => setActiveTab("details")}
                                className={`py-2 px-4 sm:px-6 rounded-lg transition duration-300 ease-in-out ${activeTab === "details" ? "bg-[#00309e] text-white shadow-lg" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                Project Details
                            </button>
                            <button
                                onClick={() => setActiveTab("table")}
                                className={`py-2 px-4 sm:px-6 rounded-lg transition duration-300 ease-in-out ${activeTab === "table" ? "bg-[#00309e] text-white shadow-lg" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                Project Table
                            </button>
                        </>
                    )}
                </div>

                {activeTab === "selection" && (
                    <div className="flex flex-col items-start space-y-4">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-start">Select Project</h3>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="selection"
                                value="new"
                                checked={selection === "new"}
                                onChange={handleSelectionChange}
                                className="mr-2 accent-blue-500"
                            />
                            <label className="mr-4 sm:mr-8 text-lg">Create New Project</label>
                            <input
                                type="radio"
                                name="selection"
                                value="open"
                                checked={selection === "open"}
                                onChange={handleSelectionChange}
                                className="mr-2 accent-blue-500"
                            />
                            <label className="text-lg">Open Existing Project</label>
                        </div>
                        {selection === "new" && (
                            <div className="flex flex-col justify-center items-start space-y-4">
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="Project Name"
                                    className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                <textarea
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    placeholder="Project Description"
                                    className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    rows="4"
                                />
                                <button
                                    onClick={CreateProject}
                                    className="bg-[#00309e] text-white py-2 px-4 sm:py-2 sm:px-4 rounded transition duration-300 ease-in-out hover:bg-blue-600"
                                >
                                    Create Project
                                </button>
                            </div>
                        )}

                        {selection === "open" && (
                            <div className="flex flex-col space-y-4">
                                <select
                                    value={selectedProject}
                                    onChange={handleProjectChange}
                                    className="p-2 border border-gray-300 rounded"
                                >
                                    <option value="">Select a project</option>
                                    {existingProjects.map((project) => (
                                        <option key={project.job_reference} value={project.job_reference}>
                                            {project.job_reference}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleOpenProject}
                                    className="bg-[#00309e] text-white py-2 px-4 rounded"
                                    disabled={!selectedProject}
                                >
                                    Open Project
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "details" && projectDetails && (
                    <div>
                        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                                Project Title: {projectDetails._PROJECT || projectDetails.job_reference}
                            </h3>
                            <p className="text-lg text-gray-600 mb-4 sm:mb-6">
                                Project Description: {projectDetails._DESCRIPTION || projectDetails.job_description}
                            </p>
                            <div className="flex flex-col space-y-4 mb-4 sm:mb-6">
                                <label className="block text-lg font-medium text-gray-700">Locate Type:</label>
                                <select
                                    id="downloadOption"
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                    className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select an option</option>
                                    {radioMap.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* <button
                                className="w-full bg-[#00309e] text-white py-2 sm:py-3 rounded-lg hover:bg-[#6d7eff] transition duration-200 flex items-center justify-center space-x-2"
                                onClick={startDrawingPolyline}
                            >
                                <FaDrawPolygon className="mx-2 text-lg" />
                                <span>Draw PolyLine</span>
                            </button> */}
                                <button
                                    className="w-full bg-red-500 text-white py-2 sm:py-3 rounded-lg hover:bg-red-400 transition duration-200 flex items-center justify-center space-x-2"
                                    onClick={handleClearSession}
                                >
                                    <FaTimes className="mx-2 text-lg" />
                                    <span>Clear Session</span>
                                </button>
                                <button
                                    className="w-full bg-[#00309e] text-white py-2 sm:py-3 rounded-lg hover:bg-[#6d7eff] transition duration-200 flex items-center justify-center space-x-2"
                                    onClick={handleDownloadCSV}
                                >
                                    <FaDownload className="mx-2 text-lg" />
                                    <span>Download CSV</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "table" && (
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-start">Narrative Lines</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="p-2 border border-gray-300">No.</th>
                                        <th className="p-2 border border-gray-300">Timestamp</th>
                                        <th className="p-2 border border-gray-300">Hyperlink</th>
                                        <th className="p-2 border border-gray-300">Narrative</th>
                                        <th className="p-2 border border-gray-300">Delete</th>
                                        <th className="p-2 border border-gray-300">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentLines.map((line, index) => renderLine(line, startRowIndex + index))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePrevPage}
                                className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="text-gray-700">Page {currentPage}</span>
                            <button
                                onClick={handleNextPage}
                                className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                                disabled={endRowIndex >= narrativeLines.length}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-4">Narrative</h3>
                        <p className="mb-4 text-sm break-words">{modalContent}</p>
                        <button
                            onClick={handleCloseModal}
                            className="bg-[#00309e] text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectSelector;
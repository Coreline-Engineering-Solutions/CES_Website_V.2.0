import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaDownload, FaMap, FaLayerGroup, FaLink, FaComment } from "react-icons/fa";
import { radioMap } from "../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectSelector = ({setProjectLines, setSelectedProject, selectedProject }) => {
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
            handleFetchData();
            const interval = setInterval(handleFetchData, 5000);
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
            console.error("Error fetching projects:", error);
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
            console.log("Project created:", response.data);
            setProjectDetails(submissionData);
            fetchProjects();
            setSelectedProject(submissionData._PROJECT);
            setActiveTab("details");
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const handleOpenProject = () => {
        const project = existingProjects.find(
            (p) => p.job_reference === selectedProject
        );
        if (project) {
            setProjectDetails(project);
            setActiveTab("details");

            // Reset the state when a new project is opened
            console.log("Resetting state for new project");

            setProjectLines({});
            setNewLines([]);
            setNarrativeLines([]);
        }
    };

    const parseCoordinates = (lineAsText) => {
        try {
            const parsed = typeof lineAsText === 'string' ? JSON.parse(lineAsText) : lineAsText;
            return parsed.map(coord => ({
                lat: coord.lat || coord.latitude,
                lng: coord.lng || coord.longitude
            }));
        } catch (error) {
            console.error("Error parsing coordinates:", error);
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
                setNarrativeLines(prevLines => [
                    ...response.data.map(line => ({
                        ...line,
                        coordinates: parseCoordinates(line.line_as_text),
                        status: "Submitted"
                    })),
                    ...prevLines.filter(line => line.status === "Unsubmitted"),
                    ...newLines // Include new lines
                ]);
            } else {
                console.error("Fetched data is not an array:", response.data);
                toast.error("Fetched data is not in the expected format.");
            }
        } catch (error) {
            toast.error("Error caught when fetching data");
            console.error("Error fetching data:", error);
        }
    };

    const renderLine = (line, index) => {
        const coordinates = line.coordinates || [];
        const startCoord = coordinates[0];
        const endCoord = coordinates[coordinates.length - 1];

        return (
            <tr key={index}>
                <td className="p-2 border border-gray-300">{index + 1}</td>
                <td className="p-2 border border-gray-300">{startCoord ? startCoord.lat.toFixed(5) : ""}</td>
                <td className="p-2 border border-gray-300">{endCoord ? endCoord.lng.toFixed(5) : ""}</td>
                <td className="p-2 border border-gray-300">
                    {line.hyperlink ? (
                        <a href={line.hyperlink} target="_blank" rel="noopener noreferrer">
                            <FaLink className="text-blue-500" />
                        </a>
                    ) : ""}
                </td>
                <td className="p-2 border border-gray-300">
                    <FaComment
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleOpenNarrative(line.narative)}
                    />
                </td>
                <td className="p-2 border border-gray-300">{endCoord ? endCoord.lng.toFixed(5) : ""}</td>
                <td className="p-2 border border-gray-300">{endCoord ? endCoord.lng.toFixed(5) : ""}</td>
                <td className="p-2 border border-gray-300">{endCoord ? endCoord.lng.toFixed(5) : ""}</td>
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
        <div className="flex flex-col justify-start items-start h-screen">
        <div className="bg-white p-8 w-full ">
            <h2 className="text-3xl font-bold mb-6 text-start">Project Selector</h2>
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab("selection")}
                    className={`py-2 px-4 ${activeTab === "selection" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded-md`}
                >
                    Select/Create Project
                </button>
                {projectDetails && (
                    <button
                        onClick={() => setActiveTab("details")}
                        className={`py-2 px-4 ${activeTab === "details" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded-md`}
                    >
                        Project Details
                    </button>
                )}
            </div>

            {activeTab === "selection" && (
                <div>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="create"
                            name="projectChoice"
                            value="create"
                            checked={selection === "create"}
                            onChange={handleSelectionChange}
                            className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label
                            htmlFor="create"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Create New Project
                        </label>
                    </div>
                    {selection === "create" && (
                        <div className="flex flex-col space-y-4 mb-6">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <textarea
                                placeholder="Project Description"
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={CreateProject}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                            >
                                Create Project
                            </button>
                        </div>
                    )}

                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="open"
                            name="projectChoice"
                            value="open"
                            checked={selection === "open"}
                            onChange={handleSelectionChange}
                            className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                            required
                        />
                        <label
                            htmlFor="open"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Open Existing Project
                        </label>
                    </div>
                    {selection === "open" && (
                        <div className="flex flex-col space-y-4 mb-6">
                            <select
                                value={selectedProject}
                                onChange={handleProjectChange}
                                className="p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select a project</option>
                                {existingProjects.map((project, index) => (
                                    <option key={index} value={project.job_reference}>
                                        {project.job_reference}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleOpenProject}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                            >
                                Open Project
                            </button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "details" && (
                <div>
                    {projectDetails && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">
                                Project Title: {projectDetails._PROJECT || projectDetails.job_reference}
                            </h3>
                            <p className="text-lg mb-6">
                                Project Description: {projectDetails._DESCRIPTION || projectDetails.job_description}
                            </p>
                            <div className="flex flex-col space-y-4 mb-6">
                                <select
                                    id="downloadOption"
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select an option</option>
                                    {radioMap.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="p-2 border border-gray-300">#</th>
                                            <th className="p-2 border border-gray-300">Reference</th>
                                            <th className="p-2 border border-gray-300">Hyperlink</th>
                                            <th className="p-2 border border-gray-300">Narative</th>
                                            <th className="p-2 border border-gray-300">Delete</th>
                                            <th className="p-2 border border-gray-300">Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentLines.map(renderLine)}
                                    </tbody>
                                </table>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={endRowIndex >= narrativeLines.length}
                                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
        {showModal && (
            <div className="fixed inset-0 flex justify-start items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-md shadow-lg w-2/4 max-w-lg">
                    <h3 className="text-xl font-semibold mb-4">Narrative</h3>
                    <p className="text-sm mb-6 mr-3 text-start">{modalContent}</p>
                    <button
                        onClick={handleCloseModal}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
        <ToastContainer />
    </div>
    );
};

export default ProjectSelector;

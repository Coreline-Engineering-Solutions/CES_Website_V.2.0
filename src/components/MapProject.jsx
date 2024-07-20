import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { radioMap } from '../constants';
import { FaDownload, FaMap, FaTrashAlt, FaLayerGroup } from 'react-icons/fa';
import { } from 'react-icons/fa';

const ProjectSelector = ({ lines, setSelectedProject }) => {
    const [selection, setSelection] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [selectedProject, setSelectedProjectState] = useState('');
    const [existingProjects, setExistingProjects] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null);
    const [narrativeLines, setNarrativeLines] = useState(lines);
    const UserLocation = useLocation();
    const username = UserLocation.state?.username || '';
    const [selectedOption, setSelectedOption] = useState('');
 

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        setSelectedProject(selectedProject);
    }, [selectedProject, setSelectedProject]);

    useEffect(() => {
        setNarrativeLines(lines);
    }, [lines]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.post('https://www.corelineengineering.com/php/fetch_projects.php', { _USERNAME: username });
            setExistingProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
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
            const response = await axios.post('https://www.corelineengineering.com/php/create_project.php', submissionData);
            console.log('Project created:', response.data);
            setProjectDetails(submissionData);
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleOpenProject = () => {
        const project = existingProjects.find(p => p.job_reference === selectedProject);
        if (project) {
            setProjectDetails(project);
        }
    };

    const handleEditLine = (lineId, newCoordinates) => {
        setNarrativeLines(prevLines => 
            prevLines.map(line => 
                line.id === lineId ? { ...line, coordinates: newCoordinates } : line
            )
        );
    };

    const handleDeleteLine = (lineId) => {
        setNarrativeLines(prevLines => 
            prevLines.filter(line => line.id !== lineId)
        );
    };

    const renderCoordinates = (coordinates, status) => {
        return coordinates.map((coord, index) => (
            <tr key={index}>
                <td className="p-2 border border-gray-300">{index + 1}</td>
                <td className="p-2 border border-gray-300">{coord.lat}</td>
                <td className="p-2 border border-gray-300">{coord.lng}</td>
                <td className="p-2 border border-gray-300"></td>
                <td className="p-2 border border-gray-300"></td>
                <td className="p-2 border border-gray-300">{status || 'Unsubmitted'}</td>
            </tr>
        ));
    };

    const handleSubmitData = async () => {
        const unsubmittedLines = narrativeLines.filter(line => line.status === 'Unsubmitted');
        try {
            const response = await axios.post('https://www.corelineengineering.com/php/add_narline.php', {
                username,
                project: selectedProject,
                lines: unsubmittedLines,
                selectedOption,
            });
            console.log('Data submitted:', response.data);
            setNarrativeLines(prevLines =>
                prevLines.map(line =>
                    line.status === 'Unsubmitted' ? { ...line, status: 'Submitted' } : line
                )
            );
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-white p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Project Selector</h2>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        id="create"
                        name="projectChoice"
                        value="create"
                        checked={selection === 'create'}
                        onChange={handleSelectionChange}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <label htmlFor="create" className="ml-2 block text-sm text-gray-900">
                        Create New Project
                    </label>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        id="open"
                        name="projectChoice"
                        value="open"
                        checked={selection === 'open'}
                        onChange={handleSelectionChange}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <label htmlFor="open" className="ml-2 block text-sm text-gray-900">
                        Open Existing Project
                    </label>
                </div>
                {selection === 'create' && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold mb-4">Create New Project</h3>
                        <div className="mb-4">
                            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                            <input
                                type="text"
                                id="projectName"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Project Description</label>
                            <textarea
                                id="projectDescription"
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                        </div>
                        <button
                            onClick={CreateProject}
                            className="w-full py-2 px-4 border border-transparent bg-blue-600 rounded-md shadow-sm text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Create Project
                        </button>
                    </div>
                )}
                {selection === 'open' && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold mb-4">Open Existing Project</h3>
                        <div className="mb-4">
                            <label htmlFor="existingProjects" className="block text-sm font-medium text-gray-700">Select Project</label>
                            <select
                                id="existingProjects"
                                value={selectedProject}
                                onChange={(e) => setSelectedProjectState(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                <option value="" disabled>Select a project...</option>
                                {existingProjects.map((project, index) => (
                                    <option key={index} value={project.job_reference}>{project.job_reference}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleOpenProject}
                            className="w-full py-2 px-4 border border-transparent bg-blue-600 rounded-md shadow-sm text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Open Project
                        </button>
                    </div>
                )}
            </div>

            {projectDetails && (
                <div className="h-full bg-gray-100 p-4 border-2 overflow-y-auto mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Title: {projectDetails._PROJECT || projectDetails.job_reference}</h3>
                    <p className="mb-4">Description: {projectDetails._DESCRIPTION || projectDetails.job_description}</p>
                    {radioMap.map((option) => (
                        <div key={option.id} className="flex items-center mb-4">
                            <input
                                type="radio"
                                id={option.id}
                                name="options"
                                value={option.value}
                                checked={selectedOption === option.value}
                                onChange={handleOptionChange}
                                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                            />
                            <label htmlFor={option.id} className="ml-2 block text-sm text-gray-900">
                                {option.label}
                            </label>
                        </div>
                    ))}
                    <h3 className="text-2xl font-semibold mb-4">Narrative Lines</h3>
                    <div className="mt-6 w5/5 flex flex-row space-x-4 mb-2">
                        <button
                            onClick={handleSubmitData}
                            className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-800 transition-colors duration-300 text-white rounded-xl"
                            aria-label="Submit Layers"
                        >
                            <FaLayerGroup className="mr-2" /> Submit
                        </button>
                        <button
                            className="flex items-center justify-center p-3 bg-blue-600 shadow-sm  hover:bg-blue-500  transition-colors duration-300 text-white rounded-xl"
                            aria-label="Download CSV"
                        >
                            <FaDownload className="mr-2" /> Download
                        </button>
                        <button
                            className="flex items-center justify-center p-3 bg-blue-600 shadow-sm  hover:bg-blue-500  transition-colors duration-300 text-white rounded-xl"
                            aria-label="Download Map Batch"
                        >
                            <FaMap className="mr-2" />  Map Batch
                        </button>
                        <button
                            className="flex items-center justify-center p-3 bg-red-600 hover:bg-red-800 transition-colors duration-300 text-white rounded-xl"
                            aria-label="Clear Session"
                        >
                            <FaTrashAlt className="mr-2" /> Clear 
                        </button>
                    </div>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border border-gray-300">ID</th>
                                <th className="p-2 border border-gray-300">Latitude</th>
                                <th className="p-2 border border-gray-300">Longitude</th>
                                <th className="p-2 border border-gray-300">HyperLink</th>
                                <th className="p-2 border border-gray-300">Narrative</th>
                                <th className="p-2 border border-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narrativeLines.filter(line => line.project === selectedProject).map((line, index) => (
                                <React.Fragment key={index}>
                                    {renderCoordinates(line.coordinates, line.status)}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default ProjectSelector;

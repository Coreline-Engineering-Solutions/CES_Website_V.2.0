import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaDownload, FaMap, FaTrashAlt, FaLayerGroup } from "react-icons/fa";
import { radioMap } from "../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectSelector = ({ projectLines, setProjectLines, setSelectedProject, selectedProject }) => {
  const [selection, setSelection] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [existingProjects, setExistingProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [narrativeLines, setNarrativeLines] = useState([]);
  const UserLocation = useLocation();
  const username = UserLocation.state?.username || "";
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("selection");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setNarrativeLines(projectLines[selectedProject] || []);
    }
  }, [selectedProject, projectLines]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
    }
  };

  const renderCoordinates = (coordinates, status) => {
    return coordinates.map((coord, index) => (
      <tr key={`${coord.lat}-${coord.lng}`}>
        <td className="p-2 border border-gray-300">{index + 1}</td>
        <td className="p-2 border border-gray-300">{coord.lat.toFixed(2)}</td>
        <td className="p-2 border border-gray-300">{coord.lng.toFixed(2)}</td>
        <td className="p-2 border border-gray-300"></td>
        <td className="p-2 border border-gray-300"></td>
        <td className="p-2 border border-gray-300">
          {status || "Unsubmitted"}
        </td>
      </tr>
    ));
  };

  const handleSubmitData = async () => {
    const unsubmittedLines = narrativeLines.filter(
      (line) => line.status === "Unsubmitted"
    );

    // Format the data as one long array of coordinates
    const formattedData = unsubmittedLines.reduce((acc, line) => {
      return acc.concat(line.coordinates);
    }, []);

    try {
      const response = await axios.post(
        "https://www.corelineengineering.com/php/add_narline.php",
        {
          user_name: username,
          project: selectedProject,
          line_data: formattedData,
          options: selectedOption,
        }
      );
      console.log("Data submitted:", response.data);

      if (response.data._S) {
        toast.success("Data submitted successfully!");
      }

      setNarrativeLines((prevLines) =>
        prevLines.map((line) =>
          line.status === "Unsubmitted" ? { ...line, status: "Submitted" } : line
        )
      );
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };


  return (
    <div className="flex flex-col justify-start items-start h-screen">
      <div className="bg-white p-8 w-full rounded-md shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-start">Project Selector</h2>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("selection")}
            className={`py-2 px-4 ${
              activeTab === "selection"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded-md`}
          >
            Select/Create Project
          </button>
          {projectDetails && (
            <button
              onClick={() => setActiveTab("details")}
              className={`py-2 px-4 ${
                activeTab === "details"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md`}
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
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="open"
                name="projectChoice"
                value="open"
                checked={selection === "open"}
                onChange={handleSelectionChange}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <label
                htmlFor="open"
                className="ml-2 block text-sm text-gray-900"
              >
                Open Existing Project
              </label>
            </div>
            {selection === "create" && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">
                  Create New Project
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="projectDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Description
                  </label>
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
            {selection === "open" && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">
                  Open Existing Project
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="existingProjects"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Project
                  </label>
                  <select
                    id="existingProjects"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select a project...
                    </option>
                    {existingProjects.map((project, index) => (
                      <option key={index} value={project.job_reference}>
                        {project.job_reference}
                      </option>
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
        )}

        {activeTab === "details" && projectDetails && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Project Details</h3>
            <p className="mb-4">
              <strong>Project Name:</strong>{" "}
              {projectDetails._PROJECT || projectDetails.job_reference}
            </p>
            <p className="mb-4">
              <strong>Project Description:</strong>{" "}
              {projectDetails._DESCRIPTION || projectDetails.description}
            </p>
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
                <label
                  htmlFor={option.id}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {option.label}
                </label>
              </div>
            ))}
            <h4 className="text-xl font-semibold mb-4">Narrative Lines</h4>
            <div className="mt-6 flex flex-wrap gap-4 mb-2">
              <button
                onClick={handleSubmitData}
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

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="p-2 border border-gray-300">#</th>
                    <th className="p-2 border border-gray-300">Latitude</th>
                    <th className="p-2 border border-gray-300">Longitude</th>
                    <th className="p-2 border border-gray-300">Hyperlink</th>
                    <th className="p-2 border border-gray-300">Narrative</th>
                    <th className="p-2 border border-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {narrativeLines.map((line, index) => (
                    <React.Fragment key={index}>
                      {renderCoordinates(line.coordinates, line.status)}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProjectSelector;
